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
/******/ 	__webpack_require__.p = "exports/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
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


var Certificate = __webpack_require__(127);
var Channel = __webpack_require__(128);
var Claim = __webpack_require__(129);
var File = __webpack_require__(130);
var Request = __webpack_require__(131);
var User = __webpack_require__(132);

var Sequelize = __webpack_require__(93);
var logger = __webpack_require__(2);

var _require = __webpack_require__(90),
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

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(65);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(66);

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

var _publish_action_types = __webpack_require__(98);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(64);

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(15);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveStatusBar = __webpack_require__(27);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(28);

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
/* 11 */
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

var _show_action_types = __webpack_require__(23);

var actions = _interopRequireWildcard(_show_action_types);

var _show_request_types = __webpack_require__(103);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(15);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var ua = __webpack_require__(137);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(168);

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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = request;

__webpack_require__(173);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(65);

var _view = __webpack_require__(67);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(8);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(65);

var _view = __webpack_require__(68);

var _view2 = _interopRequireDefault(_view);

var _publish = __webpack_require__(8);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(71);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(11);

var _show2 = __webpack_require__(31);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(80);

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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(135);
var logger = __webpack_require__(2);

var _require = __webpack_require__(136),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(13),
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(63);

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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(11);

var _view = __webpack_require__(69);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(70);

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
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(72);

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(73);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(31);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(74);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(31);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(75);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(11);

var _view = __webpack_require__(76);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(77);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(78);

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
/* 39 */
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

var _PublishTool = __webpack_require__(40);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(79);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(15);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(81);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(82);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publish = __webpack_require__(8);

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(83);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(15);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(84);

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(85);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(15);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(86);

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(8);

var _view = __webpack_require__(87);

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
/* 51 */
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
  var publish = _ref.publish;

  return {
    message: publish.disabledMessage
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_view2.default);

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(5);
var logger = __webpack_require__(2);

var _require = __webpack_require__(147),
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
/* 54 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Path = __webpack_require__(21);

var _require = __webpack_require__(89),
    getSubDirectoryNames = _require.getSubDirectoryNames;

var thisFolder = Path.resolve(__dirname, 'client/pages/');

var modules = {};

getSubDirectoryNames(thisFolder).forEach(function (name) {
  modules[name] = __webpack_require__(190)("./" + name).default;
});

module.exports = modules;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Path = __webpack_require__(21);

var _require = __webpack_require__(89),
    getSubDirectoryNames = _require.getSubDirectoryNames;

var thisFolder = Path.resolve(__dirname, 'client/components/');
var modules = {};

getSubDirectoryNames(thisFolder).forEach(function (name) {
  modules[name] = __webpack_require__(191)("./" + name).default;
});

module.exports = modules;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Path = __webpack_require__(21);

var _require = __webpack_require__(89),
    getSubDirectoryNames = _require.getSubDirectoryNames;

var thisFolder = Path.resolve(__dirname, 'client/containers/');

var modules = {};

getSubDirectoryNames(thisFolder).forEach(function (name) {
  modules[name] = __webpack_require__(192)("./" + name).default;
});

module.exports = modules;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var passport = __webpack_require__(125);
var localLoginStrategy = __webpack_require__(126);
var localSignupStrategy = __webpack_require__(134);

var _require = __webpack_require__(138),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

passport.deserializeUser(deserializeSpeechUser);
passport.serializeUser(serializeSpeechUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

module.exports = passport;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(2);
var db = __webpack_require__(5);
var lbryApi = __webpack_require__(22);
var publishHelpers = __webpack_require__(61);

var _require = __webpack_require__(4),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(93);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var fs = __webpack_require__(94);

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
/* 62 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _SEO = __webpack_require__(9);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelLoginForm = __webpack_require__(17);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(18);

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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(54);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(15);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageTitle = __webpack_require__(170);

var _metaTags = __webpack_require__(171);

var _canonicalLink = __webpack_require__(172);

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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoggedInChannel = updateLoggedInChannel;

var _channel_action_types = __webpack_require__(100);

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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _Logo = __webpack_require__(25);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(26);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(16);

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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(16);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(10);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _request = __webpack_require__(16);

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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ErrorPage = __webpack_require__(12);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _ShowAssetLite = __webpack_require__(30);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(32);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(35);

var _ShowChannel2 = _interopRequireDefault(_ShowChannel);

var _show_request_types = __webpack_require__(103);

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
/* 70 */
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

var _reactRouterDom = __webpack_require__(6);

var _AssetDisplay = __webpack_require__(19);

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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(10);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _asset_display_states = __webpack_require__(101);

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
/* 72 */
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

var _ErrorPage = __webpack_require__(12);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(33);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(19);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(34);

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
/* 73 */
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
/* 74 */
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
/* 75 */
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

var _ErrorPage = __webpack_require__(12);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(7);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(36);

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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(37);

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
/* 77 */
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
/* 78 */
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

var _reactHelmet = __webpack_require__(54);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Dropzone = __webpack_require__(20);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishDetails = __webpack_require__(42);

var _PublishDetails2 = _interopRequireDefault(_PublishDetails);

var _PublishStatus = __webpack_require__(50);

var _PublishStatus2 = _interopRequireDefault(_PublishStatus);

var _PublishDisabledMessage = __webpack_require__(51);

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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _file = __webpack_require__(174);

var _PublishPreview = __webpack_require__(41);

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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _Dropzone = __webpack_require__(20);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishTitleInput = __webpack_require__(43);

var _PublishTitleInput2 = _interopRequireDefault(_PublishTitleInput);

var _PublishUrlInput = __webpack_require__(44);

var _PublishUrlInput2 = _interopRequireDefault(_PublishUrlInput);

var _PublishThumbnailInput = __webpack_require__(46);

var _PublishThumbnailInput2 = _interopRequireDefault(_PublishThumbnailInput);

var _PublishMetadataInputs = __webpack_require__(47);

var _PublishMetadataInputs2 = _interopRequireDefault(_PublishMetadataInputs);

var _ChannelSelect = __webpack_require__(49);

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
/* 82 */
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(16);

var _request2 = _interopRequireDefault(_request);

var _PublishUrlMiddleDisplay = __webpack_require__(45);

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
/* 84 */
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ExpandingTextArea = __webpack_require__(48);

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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ChannelLoginForm = __webpack_require__(17);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(18);

var _ChannelCreateForm2 = _interopRequireDefault(_ChannelCreateForm);

var _publish_channel_select_states = __webpack_require__(99);

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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(10);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _publish_claim_states = __webpack_require__(175);

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
/* 88 */
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = __webpack_require__(94),
    lstatSync = _require.lstatSync,
    readdirSync = _require.readdirSync;

var _require2 = __webpack_require__(21),
    join = _require2.join;

var getSubDirectoryNames = exports.getSubDirectoryNames = function getSubDirectoryNames(root) {
  return readdirSync(root).filter(function (name) {
    var fullPath = join(root, name);
    return lstatSync(fullPath).isDirectory();
  });
};

/***/ }),
/* 90 */
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
/* 91 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 92 */
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
/* 93 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(96);

var _redux = __webpack_require__(62);

var _reducers = __webpack_require__(97);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _GAListener = __webpack_require__(14);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _app = __webpack_require__(102);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(104);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(54);

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
/* 96 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(62);

var _publish = __webpack_require__(164);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(165);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(166);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(167);

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  channel: _channel2.default,
  publish: _publish2.default,
  show: _show2.default,
  site: _site2.default
});

/***/ }),
/* 98 */
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL_UPDATE = exports.CHANNEL_UPDATE = 'CHANNEL_UPDATE';

/***/ }),
/* 101 */
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _dynamicImport = __webpack_require__(169);

var _LoginPage = __webpack_require__(24);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(29);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(38);

var _FourOhFourPage2 = _interopRequireDefault(_FourOhFourPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomePage = (0, _dynamicImport.dynamicImport)('pages/HomePage') || __webpack_require__(39).default;
// import HomePage from 'pages/HomePage';
// import AboutPage from 'pages/AboutPage';

var AboutPage = (0, _dynamicImport.dynamicImport)('pages/AboutPage') || __webpack_require__(52).default;

var App = function App() {
  return _react2.default.createElement(
    _reactRouterDom.Switch,
    null,
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: HomePage }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/about', component: AboutPage }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: _LoginPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:identifier/:claim', component: _ShowPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:claim', component: _ShowPage2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { component: _FourOhFourPage2.default })
  );
};

exports.default = App;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = exports.CHANNEL = 'CHANNEL';
var ASSET_LITE = exports.ASSET_LITE = 'ASSET_LITE';
var ASSET_DETAILS = exports.ASSET_DETAILS = 'ASSET_DETAILS';

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/static/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/static/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/static/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/static/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(53),
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
/* 106 */
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(96);

var _redux = __webpack_require__(62);

var _index = __webpack_require__(97);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(6);

var _index3 = __webpack_require__(14);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(102);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(104);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(180);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(55);

var _show_uri = __webpack_require__(181);

var _show = __webpack_require__(11);

var _reactHelmet = __webpack_require__(54);

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
/* 108 */
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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
__webpack_require__(111);
module.exports = __webpack_require__(112);


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Server = __webpack_require__(113);
var Pages = __webpack_require__(56);
var Components = __webpack_require__(57);
var Containers = __webpack_require__(58);

var _exports = {
  Server: Server,
  Pages: Pages,
  Components: Components,
  Containers: Containers
};

module.exports = _exports;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(114);
var bodyParser = __webpack_require__(115);
var expressHandlebars = __webpack_require__(116);
var Handlebars = __webpack_require__(117);
var helmet = __webpack_require__(118);
var cookieSession = __webpack_require__(119);
var http = __webpack_require__(120);
var logger = __webpack_require__(2);
var requestLogger = __webpack_require__(121);
var Path = __webpack_require__(21);
var loggerConfig = __webpack_require__(122);
var mysqlConfig = __webpack_require__(90);
var siteConfig = __webpack_require__(4);
var slackConfig = __webpack_require__(123);

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
    var speechPassport = __webpack_require__(59);
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
    __webpack_require__(139)(app);
    __webpack_require__(144)(app);
    __webpack_require__(162)(app);
    __webpack_require__(178)(app);
    __webpack_require__(188)(app);

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
/* 114 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 121 */
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
/* 122 */
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(124).SlackWebHook;
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
/* 124 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(91).Strategy;
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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(92),
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
/* 128 */
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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(92),
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
/* 130 */
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
/* 131 */
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
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(133);
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
/* 133 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(91).Strategy;
var lbryApi = __webpack_require__(22);
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
/* 135 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 136 */
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
/* 137 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 138 */
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
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(59);
var handleSignupRequest = __webpack_require__(140);
var handleLoginRequest = __webpack_require__(141);
var handleLogoutRequest = __webpack_require__(142);
var handleUserRequest = __webpack_require__(143);

module.exports = function (app) {
  app.post('/signup', speechPassport.authenticate('local-signup'), handleSignupRequest);
  app.post('/login', handleLoginRequest);
  app.get('/logout', handleLogoutRequest);
  app.get('/user', handleUserRequest);
};

/***/ }),
/* 140 */
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
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var speechPassport = __webpack_require__(59);

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
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logout = function logout(req, res) {
  req.logout();
  res.status(200).json({ success: true, message: 'you successfully logged out' });
};

module.exports = logout;

/***/ }),
/* 143 */
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var channelAvailability = __webpack_require__(145);
var channelClaims = __webpack_require__(146);
var channelData = __webpack_require__(148);
var channelShortId = __webpack_require__(149);
var claimAvailability = __webpack_require__(150);
var claimData = __webpack_require__(151);
var claimGet = __webpack_require__(152);
var claimLongId = __webpack_require__(153);
var claimPublish = __webpack_require__(154);
var claimResolve = __webpack_require__(156);
var claimShortId = __webpack_require__(157);
var claimList = __webpack_require__(158);
var fileAvailability = __webpack_require__(159);

var multipartMiddleware = __webpack_require__(160);

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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(60),
    checkChannelAvailability = _require.checkChannelAvailability;

var _require2 = __webpack_require__(13),
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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(53),
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
/* 147 */
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
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(53),
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
/* 149 */
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
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(60),
    claimNameIsAvailable = _require.claimNameIsAvailable;

var _require2 = __webpack_require__(13),
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
/* 151 */
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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(22),
    getClaim = _require.getClaim;

var _require2 = __webpack_require__(61),
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
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(53),
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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(61),
    createBasicPublishParams = _require.createBasicPublishParams,
    createThumbnailPublishParams = _require.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require.parsePublishApiRequestFiles;

var _require2 = __webpack_require__(60),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    publish = _require2.publish;

var _require3 = __webpack_require__(155),
    authenticateUser = _require3.authenticateUser;

var _require4 = __webpack_require__(13),
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
/* 155 */
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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(22),
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
/* 157 */
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
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(22),
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
/* 159 */
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
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var multipart = __webpack_require__(161);

var _require = __webpack_require__(4),
    uploadDirectory = _require.publishing.uploadDirectory;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });

module.exports = multipartMiddleware;

/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(163);
var handleEmbedRequest = __webpack_require__(176);
var redirect = __webpack_require__(177);

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
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(95);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ }),
/* 164 */
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

var _publish_action_types = __webpack_require__(98);

var actions = _interopRequireWildcard(_publish_action_types);

var _publish_channel_select_states = __webpack_require__(99);

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
/* 165 */
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

var _channel_action_types = __webpack_require__(100);

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
/* 166 */
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

var _show_action_types = __webpack_require__(23);

var actions = _interopRequireWildcard(_show_action_types);

var _asset_display_states = __webpack_require__(101);

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
/* 167 */
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
/* 168 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(4),
    customComponents = _require.customComponents;

function getDeepestChildValue(parent, childrenKeys) {
  if (!parent[childrenKeys[0]]) {
    return null;
  }
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
  if (!customComponents) {
    console.log('No customComponents found in siteConfig.js');
    return null;
  }
  // split out the file folders  // filter out any empty or white-space-only strings
  var folders = filePath.split('/').filter(function (folderName) {
    return folderName.replace(/\s/g, '').length;
  });
  // check for the component corresponding to file path in the site config object
  // i.e. customComponents[folders[0]][folders[2][...][folders[n]]
  var component = getDeepestChildValue(customComponents, folders);
  if (component) {
    console.log('Found custom component:', component);
    return component;
  } else {
    console.log('Found custom component:', component);
    return null;
  }
};

/***/ }),
/* 170 */
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
/* 171 */
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
/* 172 */
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
/* 173 */
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

/***/ }),
/* 174 */
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
/* 175 */
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
/* 176 */
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
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var redirect = function redirect(route) {
  return function (req, res) {
    res.status(301).redirect(route);
  };
};

module.exports = redirect;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var serveAssetByClaim = __webpack_require__(179);
var serveAssetByIdentifierAndClaim = __webpack_require__(187);

module.exports = function (app, db) {
  app.get('/:identifier/:claim', serveAssetByIdentifierAndClaim);
  app.get('/:claim', serveAssetByClaim);
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(13),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(105),
    determineResponseType = _require2.determineResponseType,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(106);
var handleShowRender = __webpack_require__(107);
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
/* 180 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(55);

var _show_action_types = __webpack_require__(23);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(11);

var _show_asset = __webpack_require__(182);

var _show_channel = __webpack_require__(184);

var _lbryUri = __webpack_require__(186);

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
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(55);

var _show_action_types = __webpack_require__(23);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(11);

var _assetApi = __webpack_require__(183);

var _show2 = __webpack_require__(31);

var _site = __webpack_require__(108);

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
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;

var _request = __webpack_require__(16);

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
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(55);

var _show_action_types = __webpack_require__(23);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(11);

var _channelApi = __webpack_require__(185);

var _show2 = __webpack_require__(31);

var _site = __webpack_require__(108);

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
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;

var _request = __webpack_require__(16);

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
/* 186 */
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
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(13),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(105),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(106);
var handleShowRender = __webpack_require__(107);

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
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRequest = __webpack_require__(189);

module.exports = function (app) {
  app.get('*', handlePageRequest);
};

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(95);

var sendReactApp = function sendReactApp(req, res) {
  handlePageRender(req, res);
};

module.exports = sendReactApp;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 56,
	"./AboutPage": 52,
	"./AboutPage/": 52,
	"./AboutPage/index": 52,
	"./AboutPage/index.jsx": 52,
	"./ErrorPage": 12,
	"./ErrorPage/": 12,
	"./ErrorPage/index": 12,
	"./ErrorPage/index.jsx": 12,
	"./HomePage": 39,
	"./HomePage/": 39,
	"./HomePage/index": 39,
	"./HomePage/index.jsx": 39,
	"./LoginPage": 24,
	"./LoginPage/": 24,
	"./LoginPage/index": 24,
	"./LoginPage/index.js": 24,
	"./LoginPage/view": 63,
	"./LoginPage/view.jsx": 63,
	"./ShowPage": 29,
	"./ShowPage/": 29,
	"./ShowPage/index": 29,
	"./ShowPage/index.js": 29,
	"./ShowPage/view": 69,
	"./ShowPage/view.jsx": 69,
	"./index": 56,
	"./index.js": 56
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
webpackContext.id = 190;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 57,
	"./ActiveStatusBar": 27,
	"./ActiveStatusBar/": 27,
	"./ActiveStatusBar/index": 27,
	"./ActiveStatusBar/index.jsx": 27,
	"./AssetPreview": 37,
	"./AssetPreview/": 37,
	"./AssetPreview/index": 37,
	"./AssetPreview/index.js": 37,
	"./AssetPreview/view": 77,
	"./AssetPreview/view.jsx": 77,
	"./ExpandingTextArea": 48,
	"./ExpandingTextArea/": 48,
	"./ExpandingTextArea/index": 48,
	"./ExpandingTextArea/index.jsx": 48,
	"./GAListener": 14,
	"./GAListener/": 14,
	"./GAListener/index": 14,
	"./GAListener/index.jsx": 14,
	"./InactiveStatusBar": 28,
	"./InactiveStatusBar/": 28,
	"./InactiveStatusBar/index": 28,
	"./InactiveStatusBar/index.jsx": 28,
	"./Logo": 25,
	"./Logo/": 25,
	"./Logo/index": 25,
	"./Logo/index.jsx": 25,
	"./NavBarChannelOptionsDropdown": 26,
	"./NavBarChannelOptionsDropdown/": 26,
	"./NavBarChannelOptionsDropdown/index": 26,
	"./NavBarChannelOptionsDropdown/index.jsx": 26,
	"./ProgressBar": 10,
	"./ProgressBar/": 10,
	"./ProgressBar/index": 10,
	"./ProgressBar/index.jsx": 10,
	"./PublishPreview": 41,
	"./PublishPreview/": 41,
	"./PublishPreview/index": 41,
	"./PublishPreview/index.jsx": 41,
	"./PublishUrlMiddleDisplay": 45,
	"./PublishUrlMiddleDisplay/": 45,
	"./PublishUrlMiddleDisplay/index": 45,
	"./PublishUrlMiddleDisplay/index.jsx": 45,
	"./SEO": 9,
	"./SEO/": 9,
	"./SEO/index": 9,
	"./SEO/index.js": 9,
	"./SEO/view": 64,
	"./SEO/view.jsx": 64,
	"./index": 57,
	"./index.js": 57
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
webpackContext.id = 191;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 58,
	"./AssetDisplay": 19,
	"./AssetDisplay/": 19,
	"./AssetDisplay/index": 19,
	"./AssetDisplay/index.js": 19,
	"./AssetDisplay/view": 71,
	"./AssetDisplay/view.jsx": 71,
	"./AssetInfo": 34,
	"./AssetInfo/": 34,
	"./AssetInfo/index": 34,
	"./AssetInfo/index.js": 34,
	"./AssetInfo/view": 74,
	"./AssetInfo/view.jsx": 74,
	"./AssetTitle": 33,
	"./AssetTitle/": 33,
	"./AssetTitle/index": 33,
	"./AssetTitle/index.js": 33,
	"./AssetTitle/view": 73,
	"./AssetTitle/view.jsx": 73,
	"./ChannelClaimsDisplay": 36,
	"./ChannelClaimsDisplay/": 36,
	"./ChannelClaimsDisplay/index": 36,
	"./ChannelClaimsDisplay/index.js": 36,
	"./ChannelClaimsDisplay/view": 76,
	"./ChannelClaimsDisplay/view.jsx": 76,
	"./ChannelCreateForm": 18,
	"./ChannelCreateForm/": 18,
	"./ChannelCreateForm/index": 18,
	"./ChannelCreateForm/index.js": 18,
	"./ChannelCreateForm/view": 68,
	"./ChannelCreateForm/view.jsx": 68,
	"./ChannelLoginForm": 17,
	"./ChannelLoginForm/": 17,
	"./ChannelLoginForm/index": 17,
	"./ChannelLoginForm/index.js": 17,
	"./ChannelLoginForm/view": 67,
	"./ChannelLoginForm/view.jsx": 67,
	"./ChannelSelect": 49,
	"./ChannelSelect/": 49,
	"./ChannelSelect/index": 49,
	"./ChannelSelect/index.js": 49,
	"./ChannelSelect/view": 86,
	"./ChannelSelect/view.jsx": 86,
	"./Dropzone": 20,
	"./Dropzone/": 20,
	"./Dropzone/index": 20,
	"./Dropzone/index.js": 20,
	"./Dropzone/view": 80,
	"./Dropzone/view.jsx": 80,
	"./FourOhFourPage": 38,
	"./FourOhFourPage/": 38,
	"./FourOhFourPage/index": 38,
	"./FourOhFourPage/index.jsx": 38,
	"./FourOhFourPage/view": 78,
	"./FourOhFourPage/view.jsx": 78,
	"./NavBar": 7,
	"./NavBar/": 7,
	"./NavBar/index": 7,
	"./NavBar/index.js": 7,
	"./NavBar/view": 66,
	"./NavBar/view.jsx": 66,
	"./PublishDetails": 42,
	"./PublishDetails/": 42,
	"./PublishDetails/index": 42,
	"./PublishDetails/index.js": 42,
	"./PublishDetails/view": 81,
	"./PublishDetails/view.jsx": 81,
	"./PublishDisabledMessage": 51,
	"./PublishDisabledMessage/": 51,
	"./PublishDisabledMessage/index": 51,
	"./PublishDisabledMessage/index.js": 51,
	"./PublishDisabledMessage/view": 88,
	"./PublishDisabledMessage/view.jsx": 88,
	"./PublishMetadataInputs": 47,
	"./PublishMetadataInputs/": 47,
	"./PublishMetadataInputs/index": 47,
	"./PublishMetadataInputs/index.js": 47,
	"./PublishMetadataInputs/view": 85,
	"./PublishMetadataInputs/view.jsx": 85,
	"./PublishStatus": 50,
	"./PublishStatus/": 50,
	"./PublishStatus/index": 50,
	"./PublishStatus/index.js": 50,
	"./PublishStatus/view": 87,
	"./PublishStatus/view.jsx": 87,
	"./PublishThumbnailInput": 46,
	"./PublishThumbnailInput/": 46,
	"./PublishThumbnailInput/index": 46,
	"./PublishThumbnailInput/index.js": 46,
	"./PublishThumbnailInput/view": 84,
	"./PublishThumbnailInput/view.jsx": 84,
	"./PublishTitleInput": 43,
	"./PublishTitleInput/": 43,
	"./PublishTitleInput/index": 43,
	"./PublishTitleInput/index.js": 43,
	"./PublishTitleInput/view": 82,
	"./PublishTitleInput/view.jsx": 82,
	"./PublishTool": 40,
	"./PublishTool/": 40,
	"./PublishTool/index": 40,
	"./PublishTool/index.js": 40,
	"./PublishTool/view": 79,
	"./PublishTool/view.jsx": 79,
	"./PublishUrlInput": 44,
	"./PublishUrlInput/": 44,
	"./PublishUrlInput/index": 44,
	"./PublishUrlInput/index.js": 44,
	"./PublishUrlInput/view": 83,
	"./PublishUrlInput/view.jsx": 83,
	"./ShowAssetDetails": 32,
	"./ShowAssetDetails/": 32,
	"./ShowAssetDetails/index": 32,
	"./ShowAssetDetails/index.js": 32,
	"./ShowAssetDetails/view": 72,
	"./ShowAssetDetails/view.jsx": 72,
	"./ShowAssetLite": 30,
	"./ShowAssetLite/": 30,
	"./ShowAssetLite/index": 30,
	"./ShowAssetLite/index.js": 30,
	"./ShowAssetLite/view": 70,
	"./ShowAssetLite/view.jsx": 70,
	"./ShowChannel": 35,
	"./ShowChannel/": 35,
	"./ShowChannel/index": 35,
	"./ShowChannel/index.js": 35,
	"./ShowChannel/view": 75,
	"./ShowChannel/view.jsx": 75,
	"./index": 58,
	"./index.js": 58
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
webpackContext.id = 192;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQ3ODhjNjgxMjRmNGRjZmUxYmUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYWN0aW9ucy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvRXJyb3JQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Mb2dvL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Ib21lUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRvb2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2Uvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvU0VPL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUb29sL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFN0YXR1cy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2J1aWxkL2dldEZvbGRlck5hbWVzLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9teXNxbENvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aGF0d2ctZmV0Y2hcIiIsIndlYnBhY2s6Ly8vLi9zcGVlY2hQYWNrYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzLWhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXNlc3Npb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5zdG9uLXNsYWNrLXdlYmhvb2tcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1sb2dpbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL2NsYWltLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy91c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJjcnlwdFwiIiwid2VicGFjazovLy8uL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvYXV0aEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2hhbm5lbEF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQ2xhaW1zLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxEYXRhLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxTaG9ydElkLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltQXZhaWxhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUdldC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxvbmdJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2F1dGgvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltU2hvcnRJZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9tdWx0aXBhcnRNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kUmVhY3RBcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3JlZHVjZXJzL3NpdGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZ2FcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvZHluYW1pY0ltcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvY2Fub25pY2FsTGluay5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9maWxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9wYWdlcy9zZW5kRW1iZWRQYWdlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvcGFnZXMvcmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hc3NldHMvc2VydmVBc3NldEJ5Q2xhaW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2FnYXMvc2hvd19hc3NldC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2FwaS9jaGFubmVsQXBpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXNzZXRzL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvZmFsbGJhY2svc2VuZFJlYWN0QXBwLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9wYWdlcyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMgXlxcLlxcLy4qJCJdLCJuYW1lcyI6WyJsb2dnZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsImhhbmRsZUVycm9yUmVzcG9uc2UiLCJvcmlnaW5hbFVybCIsImlwIiwiZXJyb3IiLCJyZXMiLCJ1c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMiLCJyZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXMiLCJzdGF0dXMiLCJtZXNzYWdlIiwianNvbiIsImNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIiwiY29kZSIsImVyciIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJuZXdFcnJvck9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJmb3JFYWNoIiwia2V5Iiwic3VjY2VzcyIsIlNpdGVDb25maWciLCJhbmFseXRpY3MiLCJnb29nbGVJZCIsImFzc2V0RGVmYXVsdHMiLCJkZXNjcmlwdGlvbiIsInRodW1ibmFpbCIsInRpdGxlIiwiYXV0aCIsInNlc3Npb25LZXkiLCJjdXN0b21Db21wb25lbnRzIiwiY29tcG9uZW50cyIsImNvbnRhaW5lcnMiLCJwYWdlcyIsImRldGFpbHMiLCJob3N0IiwicG9ydCIsInR3aXR0ZXIiLCJwdWJsaXNoaW5nIiwiYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIiwiZGlzYWJsZWQiLCJkaXNhYmxlZE1lc3NhZ2UiLCJwcmltYXJ5Q2xhaW1BZGRyZXNzIiwidGh1bWJuYWlsQ2hhbm5lbCIsInRodW1ibmFpbENoYW5uZWxJZCIsInVwbG9hZERpcmVjdG9yeSIsInJvdXRlcyIsInVwZGF0ZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJDZXJ0aWZpY2F0ZSIsIkNoYW5uZWwiLCJDbGFpbSIsIkZpbGUiLCJSZXF1ZXN0IiwiVXNlciIsIlNlcXVlbGl6ZSIsImRhdGFiYXNlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInNlcXVlbGl6ZSIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsInRoZW4iLCJpbmZvIiwiY2F0Y2giLCJkYiIsImltcG9ydCIsIm1vZGVsTmFtZSIsImFzc29jaWF0ZSIsInVwc2VydCIsIk1vZGVsIiwidmFsdWVzIiwiY29uZGl0aW9uIiwidGFibGVOYW1lIiwiZmluZE9uZSIsIndoZXJlIiwib2JqIiwiZGVidWciLCJjcmVhdGUiLCJtYXBTdGF0ZVRvUHJvcHMiLCJjaGFubmVsIiwic2l0ZSIsImNoYW5uZWxOYW1lIiwibG9nZ2VkSW5DaGFubmVsIiwibmFtZSIsImNoYW5uZWxTaG9ydElkIiwic2hvcnRJZCIsImNoYW5uZWxMb25nSWQiLCJsb25nSWQiLCJzaXRlRGVzY3JpcHRpb24iLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJvbkNoYW5uZWxMb2dpbiIsImRpc3BhdGNoIiwib25DaGFubmVsTG9nb3V0Iiwic2VsZWN0RmlsZSIsImNsZWFyRmlsZSIsInVwZGF0ZU1ldGFkYXRhIiwidXBkYXRlQ2xhaW0iLCJzZXRQdWJsaXNoSW5DaGFubmVsIiwidXBkYXRlUHVibGlzaFN0YXR1cyIsInVwZGF0ZUVycm9yIiwidXBkYXRlU2VsZWN0ZWRDaGFubmVsIiwidG9nZ2xlTWV0YWRhdGFJbnB1dHMiLCJvbk5ld1RodW1ibmFpbCIsInN0YXJ0UHVibGlzaCIsImFjdGlvbnMiLCJmaWxlIiwidHlwZSIsIkZJTEVfU0VMRUNURUQiLCJkYXRhIiwiRklMRV9DTEVBUiIsInZhbHVlIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCIsIlBVQkxJU0hfU1RBVFVTX1VQREFURSIsIkVSUk9SX1VQREFURSIsIlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFIiwic2hvd01ldGFkYXRhSW5wdXRzIiwiVE9HR0xFX01FVEFEQVRBX0lOUFVUUyIsIlRIVU1CTkFJTF9ORVciLCJoaXN0b3J5IiwiUFVCTElTSF9TVEFSVCIsImRlZmF1bHREZXNjcmlwdGlvbiIsImRlZmF1bHRUaHVtYm5haWwiLCJzaXRlSG9zdCIsInNpdGVUaXRsZSIsInNpdGVUd2l0dGVyIiwiUHJvZ3Jlc3NCYXIiLCJwcm9wcyIsInN0YXRlIiwiYmFycyIsImluZGV4IiwiaW5jcmVtZW50ZXIiLCJjcmVhdGVCYXJzIiwiYmluZCIsInN0YXJ0UHJvZ3Jlc3NCYXIiLCJ1cGRhdGVQcm9ncmVzc0JhciIsInN0b3BQcm9ncmVzc0JhciIsImkiLCJzaXplIiwicHVzaCIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJ1cGRhdGVJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1hcCIsImJhciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJvbkhhbmRsZVNob3dQYWdlVXJpIiwib25SZXF1ZXN0RXJyb3IiLCJvbk5ld0NoYW5uZWxSZXF1ZXN0Iiwib25OZXdBc3NldFJlcXVlc3QiLCJvblJlcXVlc3RVcGRhdGUiLCJhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCIsImFkZEFzc2V0VG9Bc3NldExpc3QiLCJhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCIsIm9uVXBkYXRlQ2hhbm5lbENsYWltcyIsInVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJmaWxlUmVxdWVzdGVkIiwidXBkYXRlRmlsZUF2YWlsYWJpbGl0eSIsInVwZGF0ZURpc3BsYXlBc3NldEVycm9yIiwicGFyYW1zIiwiSEFORExFX1NIT1dfVVJJIiwiUkVRVUVTVF9FUlJPUiIsImNoYW5uZWxJZCIsInJlcXVlc3RUeXBlIiwicmVxdWVzdElkIiwiQ0hBTk5FTF9SRVFVRVNUX05FVyIsImlkIiwiZXh0ZW5zaW9uIiwiQVNTRVRfUkVRVUVTVF9ORVciLCJtb2RpZmllciIsIlJFUVVFU1RfVVBEQVRFIiwiUkVRVUVTVF9MSVNUX0FERCIsImNsYWltSWQiLCJjbGFpbURhdGEiLCJBU1NFVF9BREQiLCJjbGFpbXNEYXRhIiwiQ0hBTk5FTF9BREQiLCJjaGFubmVsS2V5IiwicGFnZSIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyIsImNoYW5uZWxMaXN0SWQiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyIsIkZJTEVfUkVRVUVTVEVEIiwiRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFIiwiRElTUExBWV9BU1NFVF9FUlJPUiIsIkVycm9yUGFnZSIsInN0cmluZyIsInVhIiwiY3JlYXRlU2VydmVFdmVudFBhcmFtcyIsImhlYWRlcnMiLCJldmVudENhdGVnb3J5IiwiZXZlbnRBY3Rpb24iLCJldmVudExhYmVsIiwiaXBPdmVycmlkZSIsInVzZXJBZ2VudE92ZXJyaWRlIiwiY3JlYXRlUHVibGlzaFRpbWluZ0V2ZW50UGFyYW1zIiwiY2F0ZWdvcnkiLCJ2YXJpYWJsZSIsImxhYmVsIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImR1cmF0aW9uIiwidXNlclRpbWluZ0NhdGVnb3J5IiwidXNlclRpbWluZ1ZhcmlhYmxlTmFtZSIsInVzZXJUaW1pbmdUaW1lIiwidXNlclRpbWluZ0xhYmVsIiwic2VuZEdvb2dsZUFuYWx5dGljc0V2ZW50IiwidmlzaXRvcklkIiwicmVwbGFjZSIsInZpc2l0b3IiLCJzdHJpY3RDaWRGb3JtYXQiLCJodHRwcyIsImV2ZW50Iiwic2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyIsInRpbWluZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJzZW5kR0FUaW1pbmdFdmVudCIsImNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCIsImNoYW5uZWxfbmFtZSIsImNoYW5uZWxfaWQiLCJpbml0aWFsaXplIiwiR0FMaXN0ZW5lciIsInNlbmRQYWdlVmlldyIsImxvY2F0aW9uIiwibGlzdGVuIiwic2V0IiwicGF0aG5hbWUiLCJwYWdldmlldyIsImNoaWxkcmVuIiwicmVxdWVzdCIsInBhcnNlSlNPTiIsInJlc3BvbnNlIiwiY2hlY2tTdGF0dXMiLCJqc29uUmVzcG9uc2UiLCJFcnJvciIsInVybCIsIm9wdGlvbnMiLCJmZXRjaCIsIlByb21pc2UiLCJhbGwiLCJzaG93IiwiZGlzcGxheUFzc2V0IiwiYXNzZXQiLCJvbkZpbGVSZXF1ZXN0IiwicHVibGlzaCIsImZpbGVFcnJvciIsInNldEZpbGVFcnJvciIsImF4aW9zIiwiYXBpIiwiYXBpSG9zdCIsImFwaVBvcnQiLCJsYnJ5QXBpVXJpIiwiaGFuZGxlTGJyeW5ldFJlc3BvbnNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJhbW91bnQiLCJsb2dnZWRJbkNoYW5uZWxOYW1lIiwiTG9nbyIsIk5hdkJhckNoYW5uZWxEcm9wZG93biIsImhhbmRsZVNlbGVjdGlvbiIsImRlZmF1bHRTZWxlY3Rpb24iLCJWSUVXIiwiTE9HT1VUIiwiQWN0aXZlU3RhdHVzQmFyIiwiSW5hY3RpdmVTdGF0dXNCYXIiLCJyZXF1ZXN0TGlzdCIsImFzc2V0TGlzdCIsImFzc2V0S2V5Iiwic2VsZWN0QXNzZXQiLCJzZWxlY3RTaG93U3RhdGUiLCJwcmV2aW91c1JlcXVlc3QiLCJjaGFubmVsTGlzdCIsImRlZmF1bHRzIiwiSG9tZVBhZ2UiLCJQdWJsaXNoUHJldmlldyIsImltZ1NvdXJjZSIsInNldFByZXZpZXdJbWFnZVNvdXJjZSIsIm5ld1Byb3BzIiwic2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUiLCJwcmV2aWV3UmVhZGVyIiwiRmlsZVJlYWRlciIsInJlYWRBc0RhdGFVUkwiLCJvbmxvYWRlbmQiLCJkaW1QcmV2aWV3IiwiYm9vbCIsIm9iamVjdCIsIm1ldGFkYXRhIiwib25NZXRhZGF0YUNoYW5nZSIsImxvZ2dlZEluQ2hhbm5lbFNob3J0SWQiLCJmaWxlTmFtZSIsInB1Ymxpc2hJbkNoYW5uZWwiLCJzZWxlY3RlZENoYW5uZWwiLCJjbGFpbSIsInVybEVycm9yIiwib25DbGFpbUNoYW5nZSIsIm9uVXJsRXJyb3IiLCJVcmxNaWRkbGUiLCJsaWNlbnNlIiwibnNmdyIsIm9uVG9nZ2xlTWV0YWRhdGFJbnB1dHMiLCJFeHBhbmRpbmdUZXh0YXJlYSIsIl9oYW5kbGVDaGFuZ2UiLCJhZGp1c3RUZXh0YXJlYSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwiZWwiLCJzdHlsZSIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsInJlc3QiLCJ4IiwiZnVuYyIsImNoYW5uZWxFcnJvciIsIm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZSIsIm9uQ2hhbm5lbFNlbGVjdCIsIkFib3V0UGFnZSIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImNoYW5uZWxDbGFpbUlkIiwiZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCIsImdldENsYWltSWRCeUNsYWltIiwiZ2V0TG9uZ0NsYWltSWQiLCJsb25nQ2xhaW1JZCIsImdldExvbmdDaGFubmVsSWQiLCJsb25nQ2hhbm5lbElkIiwiZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZCIsImdldENoYW5uZWxEYXRhIiwibG9uZ0NoYW5uZWxDbGFpbUlkIiwiZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCIsInNob3J0Q2hhbm5lbENsYWltSWQiLCJnZXRDaGFubmVsQ2xhaW1zIiwiZ2V0QWxsQ2hhbm5lbENsYWltcyIsImNoYW5uZWxDbGFpbXNBcnJheSIsInBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSIsImdldExvY2FsRmlsZVJlY29yZCIsImRhdGFWYWx1ZXMiLCJQYXRoIiwiZ2V0U3ViRGlyZWN0b3J5TmFtZXMiLCJ0aGlzRm9sZGVyIiwiX19kaXJuYW1lIiwibW9kdWxlcyIsImRlZmF1bHQiLCJwYXNzcG9ydCIsImxvY2FsTG9naW5TdHJhdGVneSIsImxvY2FsU2lnbnVwU3RyYXRlZ3kiLCJzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVTcGVlY2hVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwic2VyaWFsaXplVXNlciIsInVzZSIsImxicnlBcGkiLCJwdWJsaXNoSGVscGVycyIsIk9wIiwiZmlsZVR5cGUiLCJwdWJsaXNoUmVzdWx0cyIsImNlcnRpZmljYXRlSWQiLCJ0eCIsImZpbGVSZWNvcmQiLCJjbGFpbV9pZCIsImFkZHJlc3MiLCJjbGFpbV9hZGRyZXNzIiwib3V0cG9pbnQiLCJ0eGlkIiwibm91dCIsImZpbGVQYXRoIiwiZmlsZV9wYXRoIiwiY2xhaW1SZWNvcmQiLCJjb250ZW50VHlwZSIsImJpZCIsInVwc2VydENyaXRlcmlhIiwic2V0Q2xhaW0iLCJzZXRGaWxlIiwiZGVsZXRlVGVtcG9yYXJ5RmlsZSIsImNsYWltTmFtZUlzQXZhaWxhYmxlIiwiY2xhaW1BZGRyZXNzZXMiLCJmaW5kQWxsIiwiYXR0cmlidXRlcyIsIm9yIiwiY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IiwiZnMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSIsImludmFsaWROYW1lQ2hhcmFjdGVycyIsImV4ZWMiLCJwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMiLCJwYXRoIiwidGVzdCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwidGh1bWJuYWlsRmlsZU5hbWUiLCJ0aHVtYm5haWxGaWxlUGF0aCIsInRodW1ibmFpbEZpbGVUeXBlIiwiY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIiwidHJpbSIsImF1dGhvciIsImxhbmd1YWdlIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsInVubGluayIsImFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhIiwiZmlsZUluZm8iLCJnZXRSZXN1bHQiLCJmaWxlX25hbWUiLCJkb3dubG9hZF9wYXRoIiwiY3JlYXRlRmlsZURhdGEiLCJMb2dpblBhZ2UiLCJTRU8iLCJwYWdlVXJpIiwicGFnZVRpdGxlIiwibWV0YVRhZ3MiLCJjYW5vbmljYWxMaW5rIiwicmVsIiwiaHJlZiIsInVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCIsIkNIQU5ORUxfVVBEQVRFIiwiTmF2QmFyIiwiY2hlY2tGb3JMb2dnZWRJblVzZXIiLCJsb2dvdXRVc2VyIiwiY3JlZGVudGlhbHMiLCJzaG9ydENoYW5uZWxJZCIsInNlbGVjdGVkT3B0aW9ucyIsIkNoYW5uZWxMb2dpbkZvcm0iLCJoYW5kbGVJbnB1dCIsImxvZ2luVG9DaGFubmVsIiwicHJldmVudERlZmF1bHQiLCJib2R5IiwiSGVhZGVycyIsImNoYW5uZWxQYXNzd29yZCIsIkNoYW5uZWxDcmVhdGVGb3JtIiwiaGFuZGxlQ2hhbm5lbElucHV0IiwiaW5wdXQiLCJjbGVhbnNlQ2hhbm5lbElucHV0IiwidXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIiwiY2hhbm5lbFdpdGhBdFN5bWJvbCIsImNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIiwiY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUiLCJtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0IiwiU2hvd1BhZ2UiLCJtYXRjaCIsIm5leHRQcm9wcyIsIlNob3dMaXRlIiwiQXNzZXREaXNwbGF5IiwiZmlsZUV4dCIsIlNob3dBc3NldERldGFpbHMiLCJBc3NldFRpdGxlIiwiQXNzZXRJbmZvIiwiY29weVRvQ2xpcGJvYXJkIiwiZWxlbWVudFRvQ29weSIsImRhdGFzZXQiLCJlbGVtZW50dG9jb3B5IiwiZWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3QiLCJleGVjQ29tbWFuZCIsIlNob3dDaGFubmVsIiwiQ2hhbm5lbENsYWltc0Rpc3BsYXkiLCJzaG93TmV4dFJlc3VsdHNQYWdlIiwic2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UiLCJjdXJyZW50UGFnZSIsInByZXZpb3VzUGFnZSIsInBhcnNlSW50Iiwic2hvd05ld1BhZ2UiLCJuZXh0UGFnZSIsImNsYWltcyIsInRvdGFsUGFnZXMiLCJBc3NldFByZXZpZXciLCJkaXJlY3RTb3VyY2VMaW5rIiwic2hvd1VybExpbmsiLCJGb3VyT2hGb3JQYWdlIiwiUHVibGlzaFRvb2wiLCJEcm9wem9uZSIsImRyYWdPdmVyIiwibW91c2VPdmVyIiwiaGFuZGxlRHJvcCIsImhhbmRsZURyYWdPdmVyIiwiaGFuZGxlRHJhZ0VuZCIsImhhbmRsZURyYWdFbnRlciIsImhhbmRsZURyYWdMZWF2ZSIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVGaWxlSW5wdXQiLCJjaG9vc2VGaWxlIiwiZHQiLCJkYXRhVHJhbnNmZXIiLCJpdGVtcyIsImtpbmQiLCJkcm9wcGVkRmlsZSIsImdldEFzRmlsZSIsInJlbW92ZSIsImNsZWFyRGF0YSIsImNsaWNrIiwiZmlsZUxpc3QiLCJmaWxlcyIsIlB1Ymxpc2hEZXRhaWxzIiwib25QdWJsaXNoU3VibWl0IiwiUHVibGlzaFRpdGxlSW5wdXQiLCJlIiwiUHVibGlzaFVybElucHV0Iiwic2V0Q2xhaW1OYW1lIiwidmFsaWRhdGVDbGFpbSIsImNsZWFuc2VJbnB1dCIsImZpbGVOYW1lV2l0aG91dEVuZGluZyIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwiY2xlYW5DbGFpbU5hbWUiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJtaW1lU3RyaW5nIiwiaWEiLCJVaW50OEFycmF5IiwiY2hhckNvZGVBdCIsIkJsb2IiLCJQdWJsaXNoVGh1bWJuYWlsSW5wdXQiLCJ2aWRlb1NvdXJjZSIsInNsaWRlck1pblJhbmdlIiwic2xpZGVyTWF4UmFuZ2UiLCJzbGlkZXJWYWx1ZSIsImhhbmRsZVZpZGVvTG9hZGVkRGF0YSIsImhhbmRsZVNsaWRlckNoYW5nZSIsImNyZWF0ZVRodW1ibmFpbCIsInNldFZpZGVvU291cmNlIiwiZGF0YVVyaSIsImJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ0b3RhbE1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJ0b3RhbFNlY29uZHMiLCJ2aWRlbyIsImN1cnJlbnRUaW1lIiwiY2FudmFzIiwiY3JlYXRlRWxlbWVudCIsIndpZHRoIiwidmlkZW9XaWR0aCIsInZpZGVvSGVpZ2h0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImRhdGFVcmwiLCJ0b0RhdGFVUkwiLCJzbmFwc2hvdCIsImRpc3BsYXkiLCJQdWJsaXNoTWV0YWRhdGFJbnB1dHMiLCJ0b2dnbGVTaG93SW5wdXRzIiwiaGFuZGxlU2VsZWN0IiwiY2hlY2tlZCIsInNlbGVjdGVkT3B0aW9uIiwibWF4SGVpZ2h0Iiwic3RhdGVzIiwiQ2hhbm5lbFNlbGVjdCIsInRvZ2dsZUFub255bW91c1B1Ymxpc2giLCJMT0dJTiIsIkNSRUFURSIsInB1Ymxpc2hTdGF0ZXMiLCJQdWJsaXNoU3RhdHVzIiwiTE9BRF9TVEFSVCIsIkxPQURJTkciLCJQVUJMSVNISU5HIiwiU1VDQ0VTUyIsIkZBSUxFRCIsIlB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UiLCJsc3RhdFN5bmMiLCJyZWFkZGlyU3luYyIsImpvaW4iLCJyb290IiwiZmlsdGVyIiwiZnVsbFBhdGgiLCJpc0RpcmVjdG9yeSIsIm15c3FsIiwid2FybiIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImNsYWltSW5kZXgiLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJyZXEiLCJjb250ZXh0Iiwic3RvcmUiLCJodG1sIiwiaGVsbWV0IiwicmVuZGVyU3RhdGljIiwicmVkaXJlY3QiLCJwcmVsb2FkZWRTdGF0ZSIsImdldFN0YXRlIiwic2VuZCIsIkxPQ0FMX0NIRUNLIiwiVU5BVkFJTEFCTEUiLCJFUlJPUiIsIkFWQUlMQUJMRSIsIkFwcCIsIkNIQU5ORUwiLCJBU1NFVF9MSVRFIiwiQVNTRVRfREVUQUlMUyIsInRvU3RyaW5nIiwibWV0YSIsImxpbmsiLCJTRVJWRSIsIlNIT1ciLCJjbGllbnRBY2NlcHRzSHRtbCIsImFjY2VwdCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJzZXJ2ZUFzc2V0VG9DbGllbnQiLCJ2ZXJib3NlIiwic2VuZEZpbGVPcHRpb25zIiwic2VuZEZpbGUiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImZ1bGxDbGFpbUlkIiwiZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIiwiaGFzRmlsZUV4dGVuc2lvbiIsInJlc3BvbnNlVHlwZSIsImZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkiLCJpZGVudGlmaWVyIiwidGVtcE5hbWUiLCJsb2dSZXF1ZXN0RGF0YSIsIlJFR0VYUF9JTlZBTElEX0NMQUlNIiwiUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCIsIlJFR0VYUF9BRERSRVNTIiwiQ0hBTk5FTF9DSEFSIiwicGFyc2VJZGVudGlmaWVyIiwiY29tcG9uZW50c1JlZ2V4IiwiUmVnRXhwIiwicHJvdG8iLCJtb2RpZmllclNlcGVyYXRvciIsImlzQ2hhbm5lbCIsInN0YXJ0c1dpdGgiLCJuYW1lQmFkQ2hhcnMiLCJwYXJzZUNsYWltIiwicGFyc2VNb2RpZmllciIsInJldHVyblNhZ2FXaXRoUGFyYW1zIiwic2FnYSIsInNhZ2FNaWRkbGV3YXJlIiwibWlkZGxld2FyZSIsImFjdGlvbiIsInJ1biIsImRvbmUiLCJzZWxlY3RTaXRlU3RhdGUiLCJzZWxlY3RTaXRlSG9zdCIsIlNlcnZlciIsIlBhZ2VzIiwiQ29tcG9uZW50cyIsIkNvbnRhaW5lcnMiLCJleHByZXNzIiwiYm9keVBhcnNlciIsImV4cHJlc3NIYW5kbGViYXJzIiwiSGFuZGxlYmFycyIsImNvb2tpZVNlc3Npb24iLCJodHRwIiwicmVxdWVzdExvZ2dlciIsImxvZ2dlckNvbmZpZyIsIm15c3FsQ29uZmlnIiwic2l0ZUNvbmZpZyIsInNsYWNrQ29uZmlnIiwiY29uZmlndXJlTG9nZ2VyIiwidXNlckNvbmZpZyIsImNvbmZpZ3VyZU15c3FsIiwiY29uZmlndXJlU2l0ZURldGFpbHMiLCJjb25maWd1cmVTbGFjayIsImNvbmZpZ3VyZUNsaWVudEJ1bmRsZSIsImNvbmZpZ3VyZU1vZGVscyIsImNvbmZpZ3VyZVJvdXRlcyIsImNyZWF0ZUFwcCIsImFwcCIsImVuYWJsZSIsInB1YmxpY0ZvbGRlciIsInByb2Nlc3MiLCJjd2QiLCJzdGF0aWMiLCJwdWJsaWNQYXRoIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwic3BlZWNoUGFzc3BvcnQiLCJtYXhBZ2UiLCJzZXNzaW9uIiwiaGJzIiwiZGVmYXVsdExheW91dCIsImhhbmRsZWJhcnMiLCJlbmdpbmUiLCJzZXJ2ZXIiLCJzdGFydCIsIlBPUlQiLCJzeW5jIiwibmV4dCIsIkxvZ2dlckNvbmZpZyIsImxvZ0xldmVsIiwiY29uZmlndXJlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJsZXZlbCIsInRpbWVzdGFtcCIsImNvbG9yaXplIiwicHJldHR5UHJpbnQiLCJoYW5kbGVFeGNlcHRpb25zIiwiaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbiIsInNpbGx5Iiwid2luc3RvblNsYWNrV2ViSG9vayIsIlNsYWNrV2ViSG9vayIsIndpbnN0b24iLCJTbGFja0NvbmZpZyIsInNsYWNrV2ViSG9vayIsInNsYWNrRXJyb3JDaGFubmVsIiwic2xhY2tJbmZvQ2hhbm5lbCIsImFkZCIsIndlYmhvb2tVcmwiLCJpY29uRW1vamkiLCJQYXNzcG9ydExvY2FsU3RyYXRlZ3kiLCJTdHJhdGVneSIsInJldHVyblVzZXJBbmRDaGFubmVsSW5mbyIsInVzZXJJbnN0YW5jZSIsInVzZXJJbmZvIiwidXNlck5hbWUiLCJnZXRDaGFubmVsIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VyIiwiY29tcGFyZVBhc3N3b3JkIiwiaXNNYXRjaCIsIlNUUklORyIsIkJPT0xFQU4iLCJJTlRFR0VSIiwiVEVYVCIsIkRFQ0lNQUwiLCJkZWZpbmUiLCJjbGFpbVNlcXVlbmNlIiwiZGVjb2RlZENsYWltIiwiZGVwdGgiLCJlZmZlY3RpdmVBbW91bnQiLCJoYXNTaWduYXR1cmUiLCJoZXgiLCJ2YWxpZEF0SGVpZ2h0IiwidmFsdWVWZXJzaW9uIiwiY2xhaW1UeXBlIiwiY2VydGlmaWNhdGVWZXJzaW9uIiwia2V5VHlwZSIsInB1YmxpY0tleSIsImZyZWV6ZVRhYmxlTmFtZSIsImJlbG9uZ3NUbyIsImZvcmVpZ25LZXkiLCJhbGxvd051bGwiLCJvcmRlciIsImdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQiLCIkbGlrZSIsImdldExvbmdDaGFubmVsSWRGcm9tQ2hhbm5lbE5hbWUiLCJ2YWxpZGF0ZUxvbmdDaGFubmVsSWQiLCJoYXNPbmUiLCJkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlIiwiZGV0ZXJtaW5lVGh1bWJuYWlsIiwic3RvcmVkVGh1bWJuYWlsIiwicHJlcGFyZUNsYWltRGF0YSIsImxpY2Vuc2VVcmwiLCJwcmV2aWV3IiwibWV0YWRhdGFWZXJzaW9uIiwic291cmNlIiwic291cmNlVHlwZSIsInNvdXJjZVZlcnNpb24iLCJzdHJlYW1WZXJzaW9uIiwiZ2V0U2hvcnRDbGFpbUlkRnJvbUxvbmdDbGFpbUlkIiwicmF3IiwiZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkIiwiZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSIsInZhbGlkYXRlTG9uZ0NsYWltSWQiLCJyZXNvbHZlQ2xhaW0iLCJjbGFpbUFycmF5IiwiZGVmYXVsdFZhbHVlIiwidHJlbmRpbmdFbGlnaWJsZSIsImhhc01hbnkiLCJnZXRSZWNlbnRDbGFpbXMiLCJsaW1pdCIsImlwQWRkcmVzcyIsImJjcnlwdCIsInByb3RvdHlwZSIsImNvbXBhcmUiLCJjaGFuZ2VQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwiZ2VuU2FsdCIsInNhbHRFcnJvciIsInNhbHQiLCJoYXNoIiwiaGFzaEVycm9yIiwiaG9vayIsInVzZXJEYXRhIiwiY2hhbm5lbERhdGEiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiaGFuZGxlU2lnbnVwUmVxdWVzdCIsImhhbmRsZUxvZ2luUmVxdWVzdCIsImhhbmRsZUxvZ291dFJlcXVlc3QiLCJoYW5kbGVVc2VyUmVxdWVzdCIsImdldCIsInNpZ251cCIsImxvZ2luIiwibG9nSW4iLCJsb2dvdXQiLCJjaGFubmVsQXZhaWxhYmlsaXR5IiwiY2hhbm5lbENsYWltcyIsImNsYWltQXZhaWxhYmlsaXR5IiwiY2xhaW1HZXQiLCJjbGFpbUxvbmdJZCIsImNsYWltUHVibGlzaCIsImNsYWltUmVzb2x2ZSIsImNsYWltU2hvcnRJZCIsImNsYWltTGlzdCIsImZpbGVBdmFpbGFiaWxpdHkiLCJtdWx0aXBhcnRNaWRkbGV3YXJlIiwiYXZhaWxhYmxlTmFtZSIsIkNMQUlNU19QRVJfUEFHRSIsImRldGVybWluZVRvdGFsUGFnZXMiLCJwYWdpbmF0aW9uUGFnZSIsImdldFBhZ2VGcm9tUXVlcnkiLCJ2aWV3RGF0YSIsImV4dHJhY3RQYWdlRnJvbUNsYWltcyIsImRldGVybWluZVByZXZpb3VzUGFnZSIsImRldGVybWluZU5leHRQYWdlIiwidG90YWxSZXN1bHRzIiwiZGV0ZXJtaW5lVG90YWxDbGFpbXMiLCJwYWdlTnVtYmVyIiwiY2xhaW1TdGFydEluZGV4IiwiY2xhaW1FbmRJbmRleCIsInBhZ2VPZkNsYWltcyIsInRvdGFsQ2xhaW1zIiwiZnVsbFBhZ2VzIiwicmVtYWluZGVyIiwiY2hhbm5lbFNob3J0SWRSb3V0ZSIsImNsYWltSW5mbyIsInJlc29sdmVSZXN1bHQiLCJmaWxlRGF0YSIsImNvbXBsZXRlZCIsImF1dGhlbnRpY2F0ZVVzZXIiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJyZXNvbHZlZFVyaSIsImNsYWltc0xpc3QiLCJtdWx0aXBhcnQiLCJ1cGxvYWREaXIiLCJoYW5kbGVQYWdlUmVxdWVzdCIsImhhbmRsZUVtYmVkUmVxdWVzdCIsImhhbmRsZVBhZ2VSZW5kZXIiLCJzZW5kUmVhY3RBcHAiLCJpbml0aWFsU3RhdGUiLCJhc3NpZ24iLCJwdWJsaXNoU3VibWl0IiwiZ29vZ2xlQW5hbHl0aWNzSWQiLCJnZXREZWVwZXN0Q2hpbGRWYWx1ZSIsInBhcmVudCIsImNoaWxkcmVuS2V5cyIsImNoaWxkS2V5Iiwic2hpZnQiLCJjaGlsZCIsImR5bmFtaWNJbXBvcnQiLCJmb2xkZXJzIiwiZm9sZGVyTmFtZSIsImNvbXBvbmVudCIsImNyZWF0ZVBhZ2VUaXRsZSIsImRldGVybWluZU9nVGh1bWJuYWlsQ29udGVudFR5cGUiLCJjcmVhdGVCYXNpY01ldGFUYWdzIiwicHJvcGVydHkiLCJjb250ZW50IiwiY3JlYXRlQ2hhbm5lbE1ldGFUYWdzIiwiY3JlYXRlQXNzZXRNZXRhVGFncyIsImVtYmVkVXJsIiwic2hvd1VybCIsIm9nVGl0bGUiLCJvZ0Rlc2NyaXB0aW9uIiwib2dUaHVtYm5haWxDb250ZW50VHlwZSIsIm9nVGh1bWJuYWlsIiwiY3JlYXRlTWV0YVRhZ3MiLCJjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsiLCJjcmVhdGVBc3NldENhbm9uaWNhbExpbmsiLCJjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayIsImNyZWF0ZUNhbm9uaWNhbExpbmsiLCJ2YWxpZGF0ZUZpbGUiLCJzZW5kRW1iZWRQYWdlIiwicmVuZGVyIiwibGF5b3V0Iiwicm91dGUiLCJzZXJ2ZUFzc2V0QnlDbGFpbSIsInNlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwic2VydmVyQXNzZXRCeUNsYWltIiwiaGFuZGxlU2hvd1BhZ2VVcmkiLCJ3YXRjaEhhbmRsZVNob3dQYWdlVXJpIiwicGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0iLCJwYXJzZUFuZFVwZGF0ZUNsYWltT25seSIsIm5ld0Fzc2V0UmVxdWVzdCIsIndhdGNoTmV3QXNzZXRSZXF1ZXN0IiwiZ2V0U2hvcnRJZCIsImdldENsYWltRGF0YSIsIm5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hOZXdDaGFubmVsUmVxdWVzdCIsIndhdGNoVXBkYXRlQ2hhbm5lbENsYWltcyIsImdldE5ld0NsYWltc0FuZFVwZGF0ZUNoYW5uZWwiLCJleHRlbnNpb25TZXBlcmF0b3IiLCJzZXJ2ZXJBc3NldEJ5SWRlbnRpZmllckFuZENsYWltIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLGtDOzs7Ozs7QUNBQSx3Qzs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsSUFBTUEsU0FBUyxtQkFBQUMsQ0FBUSxD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCIiwiZmlsZSI6Im5vZGVCdW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJleHBvcnRzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEwOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODQ3ODhjNjgxMjRmNGRjZmUxYmUiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcykge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igb24gJHtvcmlnaW5hbFVybH1gLCBtb2R1bGUuZXhwb3J0cy51c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMoZXJyb3IpKTtcbiAgICBjb25zdCBbc3RhdHVzLCBtZXNzYWdlXSA9IG1vZHVsZS5leHBvcnRzLnJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyhlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKHN0YXR1cylcbiAgICAgIC5qc29uKG1vZHVsZS5leHBvcnRzLmNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkKHN0YXR1cywgbWVzc2FnZSkpO1xuICB9LFxuICByZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGxldCBzdGF0dXMsIG1lc3NhZ2U7XG4gICAgLy8gY2hlY2sgZm9yIGRhZW1vbiBiZWluZyB0dXJuZWQgb2ZmXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBzdGF0dXMgPSA1MDM7XG4gICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gcmVmdXNlZC4gIFRoZSBkYWVtb24gbWF5IG5vdCBiZSBydW5uaW5nLic7XG4gICAgICAvLyBmYWxsYmFjayBmb3IgZXZlcnl0aGluZyBlbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IDQwMDtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBbc3RhdHVzLCBtZXNzYWdlXTtcbiAgfSxcbiAgdXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID09PSAwKSB7XG4gICAgICBsZXQgbmV3RXJyb3JPYmplY3QgPSB7fTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIG5ld0Vycm9yT2JqZWN0W2tleV0gPSBlcnJba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0Vycm9yT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9LFxuICBjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJmdW5jdGlvbiBTaXRlQ29uZmlnICgpIHtcbiAgdGhpcy5hbmFseXRpY3MgPSB7XG4gICAgZ29vZ2xlSWQ6ICdkZWZhdWx0JyxcbiAgfTtcbiAgdGhpcy5hc3NldERlZmF1bHRzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnQW4gYXNzZXQgcHVibGlzaGVkIG9uIFNwZWUuY2gnLFxuICAgIHRodW1ibmFpbCAgOiAnaHR0cHM6Ly9zcGVlLmNoL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gIH07XG4gIHRoaXMuYXV0aCA9IHtcbiAgICBzZXNzaW9uS2V5OiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IHtcbiAgICBjb21wb25lbnRzOiB7fSxcbiAgICBjb250YWluZXJzOiB7fSxcbiAgICBwYWdlcyAgICAgOiB7fSxcbiAgfTtcbiAgdGhpcy5kZXRhaWxzID0ge1xuICAgIGRlc2NyaXB0aW9uOiAnT3Blbi1zb3VyY2UsIGRlY2VudHJhbGl6ZWQgaW1hZ2UgYW5kIHZpZGVvIHNoYXJpbmcuJyxcbiAgICBob3N0ICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHBvcnQgICAgICAgOiAzMDAwLFxuICAgIHRpdGxlICAgICAgOiAnU3BlZS5jaCcsXG4gICAgdHdpdHRlciAgICA6ICdAc3BlZV9jaCcsXG4gIH07XG4gIHRoaXMucHVibGlzaGluZyA9IHtcbiAgICBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXM6IFtdLFxuICAgIGRpc2FibGVkICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgZGlzYWJsZWRNZXNzYWdlICAgICAgICAgOiAnUGxlYXNlIGNoZWNrIGJhY2sgc29vbi4nLFxuICAgIHByaW1hcnlDbGFpbUFkZHJlc3MgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWwgICAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHRodW1ibmFpbENoYW5uZWxJZCAgICAgIDogJ2RlZmF1bHQnLFxuICAgIHVwbG9hZERpcmVjdG9yeSAgICAgICAgIDogJy9ob21lL2xicnkvVXBsb2FkcycsXG4gIH07XG4gIHRoaXMucm91dGVzID0ge307XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNpdGUgY29uZmlnIHJlY2VpdmVkLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFuYWx5dGljcywgYXNzZXREZWZhdWx0cywgYXV0aCwgY3VzdG9tQ29tcG9uZW50cywgZGV0YWlscywgcHVibGlzaGluZywgcm91dGVzIH0gPSBjb25maWc7XG4gICAgY29uc29sZS5sb2coJ0NvbmZpZ3VyaW5nIHNpdGUgZGV0YWlscy4uLicpO1xuICAgIHRoaXMuYW5hbHl0aWNzID0gYW5hbHl0aWNzO1xuICAgIHRoaXMuYXNzZXREZWZhdWx0cyA9IGFzc2V0RGVmYXVsdHM7XG4gICAgdGhpcy5hdXRoID0gYXV0aDtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIHRoaXMucHVibGlzaGluZyA9IHB1Ymxpc2hpbmc7XG4gICAgdGhpcy5jdXN0b21Db21wb25lbnRzID0gY3VzdG9tQ29tcG9uZW50cztcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFNpdGVDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zaXRlQ29uZmlnLmpzIiwiY29uc3QgQ2VydGlmaWNhdGUgPSByZXF1aXJlKCdtb2RlbHMvY2VydGlmaWNhdGUuanMnKTtcbmNvbnN0IENoYW5uZWwgPSByZXF1aXJlKCdtb2RlbHMvY2hhbm5lbC5qcycpO1xuY29uc3QgQ2xhaW0gPSByZXF1aXJlKCdtb2RlbHMvY2xhaW0uanMnKTtcbmNvbnN0IEZpbGUgPSByZXF1aXJlKCdtb2RlbHMvZmlsZS5qcycpO1xuY29uc3QgUmVxdWVzdCA9IHJlcXVpcmUoJ21vZGVscy9yZXF1ZXN0LmpzJyk7XG5jb25zdCBVc2VyID0gcmVxdWlyZSgnbW9kZWxzL3VzZXIuanMnKTtcblxuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IHJlcXVpcmUoJ215c3FsQ29uZmlnLmpzJyk7XG5cbi8vIHNldCBzZXF1ZWxpemUgb3B0aW9uc1xuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkLCB7XG4gIGhvc3QgICAgICAgICAgOiAnbG9jYWxob3N0JyxcbiAgZGlhbGVjdCAgICAgICA6ICdteXNxbCcsXG4gIGRpYWxlY3RPcHRpb25zOiB7ZGVjaW1hbE51bWJlcnM6IHRydWV9LFxuICBsb2dnaW5nICAgICAgIDogZmFsc2UsXG4gIHBvb2wgICAgICAgICAgOiB7XG4gICAgbWF4ICAgIDogNSxcbiAgICBtaW4gICAgOiAwLFxuICAgIGlkbGUgICA6IDEwMDAwLFxuICAgIGFjcXVpcmU6IDEwMDAwLFxuICB9LFxufSk7XG5cbi8vIGVzdGFibGlzaCBteXNxbCBjb25uZWN0aW9uXG5zZXF1ZWxpemVcbiAgLmF1dGhlbnRpY2F0ZSgpXG4gIC50aGVuKCgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VxdWVsaXplIGhhcyBlc3RhYmxpc2hlZCBteXNxbCBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseS4nKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKCdTZXF1ZWxpemUgd2FzIHVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBkYXRhYmFzZTonLCBlcnIpO1xuICB9KTtcblxuLy8gbWFudWFsbHkgYWRkIGVhY2ggbW9kZWwgdG8gdGhlIGRiIG9iamVjdCAobm90ZTogbWFrZSB0aGlzIGR5bmFtaWMpXG5jb25zdCBkYiA9IHt9O1xuZGJbJ0NlcnRpZmljYXRlJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDZXJ0aWZpY2F0ZScsIENlcnRpZmljYXRlKTtcbmRiWydDaGFubmVsJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdDaGFubmVsJywgQ2hhbm5lbCk7XG5kYlsnQ2xhaW0nXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NsYWltJywgQ2xhaW0pO1xuZGJbJ0ZpbGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0ZpbGUnLCBGaWxlKTtcbmRiWydSZXF1ZXN0J10gPSBzZXF1ZWxpemUuaW1wb3J0KCdSZXF1ZXN0JywgUmVxdWVzdCk7XG5kYlsnVXNlciddID0gc2VxdWVsaXplLmltcG9ydCgnVXNlcicsIFVzZXIpO1xuXG4vLyBydW4gbW9kZWwuYXNzb2NpYXRpb24gZm9yIGVhY2ggbW9kZWwgaW4gdGhlIGRiIG9iamVjdCB0aGF0IGhhcyBhbiBhc3NvY2lhdGlvblxubG9nZ2VyLmluZm8oJ2Fzc29jaWF0aW5nIGRiIG1vZGVscy4uLicpO1xuT2JqZWN0LmtleXMoZGIpLmZvckVhY2gobW9kZWxOYW1lID0+IHtcbiAgaWYgKGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKSB7XG4gICAgbG9nZ2VyLmluZm8oJ0Fzc29jaWF0aW5nIG1vZGVsOicsIG1vZGVsTmFtZSk7XG4gICAgZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUoZGIpO1xuICB9XG59KTtcblxuLy8gYWRkIHNlcXVlbGl6ZS9TZXF1ZWxpemUgdG8gZGJcbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcbi8vIGFkZCBhbiAndXBzZXJ0JyBtZXRob2QgdG8gdGhlIGRiIG9iamVjdFxuZGIudXBzZXJ0ID0gKE1vZGVsLCB2YWx1ZXMsIGNvbmRpdGlvbiwgdGFibGVOYW1lKSA9PiB7XG4gIHJldHVybiBNb2RlbFxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiBjb25kaXRpb24sXG4gICAgfSlcbiAgICAudGhlbihvYmogPT4ge1xuICAgICAgaWYgKG9iaikgeyAgLy8gdXBkYXRlXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgdXBkYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gb2JqLnVwZGF0ZSh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHsgIC8vIGluc2VydFxuICAgICAgICBsb2dnZXIuZGVidWcoYGNyZWF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmNyZWF0ZSh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAke3RhYmxlTmFtZX0udXBzZXJ0IGVycm9yYCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHNpdGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGNoYW5uZWxMb25nSWQgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5sb25nSWQsXG4gICAgc2l0ZURlc2NyaXB0aW9uOiBzaXRlLmRlc2NyaXB0aW9uLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsTG9nb3V0OiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobnVsbCwgbnVsbCwgbnVsbCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfU0VMRUNURUQsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckZpbGUgKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9DTEVBUixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLk1FVEFEQVRBX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFpbSAodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNMQUlNX1VQREFURSxcbiAgICBkYXRhOiB2YWx1ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaXNoSW5DaGFubmVsIChjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMLFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHVibGlzaFN0YXR1cyAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVycm9yIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRVJST1JfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCAoY2hhbm5lbE5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IGNoYW5uZWxOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1ldGFkYXRhSW5wdXRzIChzaG93TWV0YWRhdGFJbnB1dHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFMsXG4gICAgZGF0YTogc2hvd01ldGFkYXRhSW5wdXRzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3VGh1bWJuYWlsIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5USFVNQk5BSUxfTkVXLFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQdWJsaXNoIChoaXN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVJULFxuICAgIGRhdGE6IHsgaGlzdG9yeSB9LFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvcHVibGlzaC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaXRlIH0pID0+IHtcbiAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIGRlc2NyaXB0aW9uOiBzaXRlRGVzY3JpcHRpb24sIGhvc3Q6IHNpdGVIb3N0LCB0aXRsZTogc2l0ZVRpdGxlLCB0d2l0dGVyOiBzaXRlVHdpdHRlciB9ID0gc2l0ZTtcbiAgcmV0dXJuIHtcbiAgICBkZWZhdWx0RGVzY3JpcHRpb24sXG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgICBzaXRlRGVzY3JpcHRpb24sXG4gICAgc2l0ZUhvc3QsXG4gICAgc2l0ZVRpdGxlLFxuICAgIHNpdGVUd2l0dGVyLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvU0VPL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQWN0aXZlU3RhdHVzQmFyIGZyb20gJ2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyJztcbmltcG9ydCBJbmFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyJztcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGJhcnMgICAgICAgOiBbXSxcbiAgICAgIGluZGV4ICAgICAgOiAwLFxuICAgICAgaW5jcmVtZW50ZXI6IDEsXG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZUJhcnMgPSB0aGlzLmNyZWF0ZUJhcnMuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIgPSB0aGlzLnN0YXJ0UHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyID0gdGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyID0gdGhpcy5zdG9wUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5jcmVhdGVCYXJzKCk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMuc3RvcFByb2dyZXNzQmFyKCk7XG4gIH1cbiAgY3JlYXRlQmFycyAoKSB7XG4gICAgY29uc3QgYmFycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMucHJvcHMuc2l6ZTsgaSsrKSB7XG4gICAgICBiYXJzLnB1c2goe2lzQWN0aXZlOiBmYWxzZX0pO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgYmFycyB9KTtcbiAgfVxuICBzdGFydFByb2dyZXNzQmFyICgpIHtcbiAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQcm9ncmVzc0Jhci5iaW5kKHRoaXMpLCAzMDApO1xuICB9O1xuICB1cGRhdGVQcm9ncmVzc0JhciAoKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5zdGF0ZS5pbmRleDtcbiAgICBsZXQgaW5jcmVtZW50ZXIgPSB0aGlzLnN0YXRlLmluY3JlbWVudGVyO1xuICAgIGxldCBiYXJzID0gdGhpcy5zdGF0ZS5iYXJzO1xuICAgIC8vIGZsaXAgaW5jcmVtZW50ZXIgaWYgbmVjZXNzYXJ5LCB0byBzdGF5IGluIGJvdW5kc1xuICAgIGlmICgoaW5kZXggPCAwKSB8fCAoaW5kZXggPiB0aGlzLnByb3BzLnNpemUpKSB7XG4gICAgICBpbmNyZW1lbnRlciA9IGluY3JlbWVudGVyICogLTE7XG4gICAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICB9XG4gICAgLy8gdXBkYXRlIHRoZSBpbmRleGVkIGJhclxuICAgIGlmIChpbmNyZW1lbnRlciA+IDApIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFyc1tpbmRleF0uaXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuICAgIC8vIGluY3JlbWVudCBpbmRleFxuICAgIGluZGV4ICs9IGluY3JlbWVudGVyO1xuICAgIC8vIHVwZGF0ZSBzdGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYmFycyxcbiAgICAgIGluY3JlbWVudGVyLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH07XG4gIHN0b3BQcm9ncmVzc0JhciAoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnVwZGF0ZUludGVydmFsKTtcbiAgfTtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge3RoaXMuc3RhdGUuYmFycy5tYXAoKGJhciwgaW5kZXgpID0+IGJhci5pc0FjdGl2ZSA/IDxBY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0gLz4gOiA8SW5hY3RpdmVTdGF0dXNCYXIga2V5PXtpbmRleH0vPil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5Qcm9ncmVzc0Jhci5wcm9wVHlwZXMgPSB7XG4gIHNpemU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4IiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuXG5pbXBvcnQgeyBDSEFOTkVMLCBBU1NFVF9MSVRFLCBBU1NFVF9ERVRBSUxTIH0gZnJvbSAnY29uc3RhbnRzL3Nob3dfcmVxdWVzdF90eXBlcyc7XG5cbi8vIGJhc2ljIHJlcXVlc3QgcGFyc2luZ1xuZXhwb3J0IGZ1bmN0aW9uIG9uSGFuZGxlU2hvd1BhZ2VVcmkgKHBhcmFtcykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuSEFORExFX1NIT1dfVVJJLFxuICAgIGRhdGE6IHBhcmFtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlcXVlc3RFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdDaGFubmVsUmVxdWVzdCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IENIQU5ORUw7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IGBjciMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9SRVFVRVNUX05FVyxcbiAgICBkYXRhOiB7IHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk5ld0Fzc2V0UmVxdWVzdCAobmFtZSwgaWQsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGV4dGVuc2lvbikge1xuICBjb25zdCByZXF1ZXN0VHlwZSA9IGV4dGVuc2lvbiA/IEFTU0VUX0xJVEUgOiBBU1NFVF9ERVRBSUxTO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgYXIjJHtuYW1lfSMke2lkfSMke2NoYW5uZWxOYW1lfSMke2NoYW5uZWxJZH1gO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgICBuYW1lLFxuICAgICAgbW9kaWZpZXI6IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGNoYW5uZWw6IHtcbiAgICAgICAgICBuYW1lOiBjaGFubmVsTmFtZSxcbiAgICAgICAgICBpZCAgOiBjaGFubmVsSWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0VXBkYXRlIChyZXF1ZXN0VHlwZSwgcmVxdWVzdElkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICByZXF1ZXN0VHlwZSxcbiAgICAgIHJlcXVlc3RJZCxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0IChpZCwgZXJyb3IsIGtleSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwga2V5IH0sXG4gIH07XG59O1xuXG4vLyBhc3NldCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBc3NldFRvQXNzZXRMaXN0IChpZCwgZXJyb3IsIG5hbWUsIGNsYWltSWQsIHNob3J0SWQsIGNsYWltRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQVNTRVRfQURELFxuICAgIGRhdGE6IHsgaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEgfSxcbiAgfTtcbn1cblxuLy8gY2hhbm5lbCBhY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCAoaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9BREQsXG4gICAgZGF0YTogeyBpZCwgbmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25VcGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsS2V5LCBuYW1lLCBsb25nSWQsIHBhZ2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyxcbiAgICBkYXRhOiB7Y2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDaGFubmVsQ2xhaW1zIChjaGFubmVsTGlzdElkLCBjbGFpbXNEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyxcbiAgICBkYXRhOiB7Y2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YX0sXG4gIH07XG59O1xuXG4vLyBkaXNwbGF5IGEgZmlsZVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsZVJlcXVlc3RlZCAobmFtZSwgY2xhaW1JZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9SRVFVRVNURUQsXG4gICAgZGF0YTogeyBuYW1lLCBjbGFpbUlkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRmlsZUF2YWlsYWJpbGl0eSAoc3RhdHVzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEUsXG4gICAgZGF0YTogc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlBc3NldEVycm9yIChlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRElTUExBWV9BU1NFVF9FUlJPUixcbiAgICBkYXRhOiBlcnJvcixcbiAgfTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYWN0aW9ucy9zaG93LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcblxuY2xhc3MgRXJyb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxwPntlcnJvcn08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuRXJyb3JQYWdlLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9FcnJvclBhZ2UvaW5kZXguanN4IiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgdWEgPSByZXF1aXJlKCd1bml2ZXJzYWwtYW5hbHl0aWNzJyk7XG5jb25zdCB7IGFuYWx5dGljcyA6IHsgZ29vZ2xlSWQgfSwgZGV0YWlsczogeyB0aXRsZSB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICBldmVudENhdGVnb3J5ICAgIDogJ2NsaWVudCByZXF1ZXN0cycsXG4gICAgZXZlbnRBY3Rpb24gICAgICA6ICdzZXJ2ZSByZXF1ZXN0JyxcbiAgICBldmVudExhYmVsICAgICAgIDogb3JpZ2luYWxVcmwsXG4gICAgaXBPdmVycmlkZSAgICAgICA6IGlwLFxuICAgIHVzZXJBZ2VudE92ZXJyaWRlOiBoZWFkZXJzWyd1c2VyLWFnZW50J10sXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiB7XG4gICAgdXNlclRpbWluZ0NhdGVnb3J5ICAgIDogY2F0ZWdvcnksXG4gICAgdXNlclRpbWluZ1ZhcmlhYmxlTmFtZTogdmFyaWFibGUsXG4gICAgdXNlclRpbWluZ1RpbWUgICAgICAgIDogZHVyYXRpb24sXG4gICAgdXNlclRpbWluZ0xhYmVsICAgICAgIDogbGFiZWwsXG4gIH07XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQgKGlwLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvcklkID0gaXAucmVwbGFjZSgvXFwuL2csICctJyk7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLmV2ZW50KHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcgKHZpc2l0b3JJZCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLnRpbWluZyhwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYFRpbWluZyBldmVudCBzdWNjZXNzZnVsbHkgc2VudCB0byBnb29nbGUgYW5hbHl0aWNzYCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlbmRHQVNlcnZlRXZlbnQgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQoaXAsIHBhcmFtcyk7XG4gIH0sXG4gIHNlbmRHQVRpbWluZ0V2ZW50IChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nKHRpdGxlLCBwYXJhbXMpO1xuICB9LFxuICBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwgKHsgY2hhbm5lbF9uYW1lOiBjaGFubmVsTmFtZSwgY2hhbm5lbF9pZDogY2hhbm5lbElkIH0pIHtcbiAgICByZXR1cm4gKGNoYW5uZWxOYW1lIHx8IGNoYW5uZWxJZCA/ICdQVUJMSVNIX0lOX0NIQU5ORUxfQ0xBSU0nIDogJ1BVQkxJU0hfQU5PTllNT1VTX0NMQUlNJyk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBHb29nbGVBbmFseXRpY3MgZnJvbSAncmVhY3QtZ2EnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuY29uc3QgeyBhbmFseXRpY3M6IHsgZ29vZ2xlSWQgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5Hb29nbGVBbmFseXRpY3MuaW5pdGlhbGl6ZShnb29nbGVJZCk7XG5cbmNsYXNzIEdBTGlzdGVuZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZW5kUGFnZVZpZXcodGhpcy5wcm9wcy5oaXN0b3J5LmxvY2F0aW9uKTtcbiAgICB0aGlzLnByb3BzLmhpc3RvcnkubGlzdGVuKHRoaXMuc2VuZFBhZ2VWaWV3KTtcbiAgfVxuXG4gIHNlbmRQYWdlVmlldyAobG9jYXRpb24pIHtcbiAgICBHb29nbGVBbmFseXRpY3Muc2V0KHsgcGFnZTogbG9jYXRpb24ucGF0aG5hbWUgfSk7XG4gICAgR29vZ2xlQW5hbHl0aWNzLnBhZ2V2aWV3KGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihHQUxpc3RlbmVyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXguanN4IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInByb3AtdHlwZXNcIlxuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICdjcm9zcy1mZXRjaC9wb2x5ZmlsbCc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBKU09OIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSlNPTiAocmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0IHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA1KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIHN0YXR1cyByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0IHwgdW5kZWZpbmVkfSBSZXR1cm5zIG9iamVjdCB3aXRoIHN0YXR1cyBhbmQgc3RhdHVzVGV4dCwgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzIChyZXNwb25zZSwganNvblJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XG4gIH1cbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoanNvblJlc3BvbnNlLm1lc3NhZ2UpO1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0cyBhIFVSTCwgcmV0dXJuaW5nIGEgcHJvbWlzZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsICAgICAgIFRoZSBVUkwgd2Ugd2FudCB0byByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyB3ZSB3YW50IHRvIHBhc3MgdG8gXCJmZXRjaFwiXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICAgVGhlIHJlc3BvbnNlIGRhdGFcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0ICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3Jlc3BvbnNlLCBwYXJzZUpTT04ocmVzcG9uc2UpXSk7XG4gICAgfSlcbiAgICAudGhlbigoW3Jlc3BvbnNlLCBqc29uUmVzcG9uc2VdKSA9PiB7XG4gICAgICByZXR1cm4gY2hlY2tTdGF0dXMocmVzcG9uc2UsIGpzb25SZXNwb25zZSk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB1cGRhdGVMb2dnZWRJbkNoYW5uZWwgfSBmcm9tICdhY3Rpb25zL2NoYW5uZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7dXBkYXRlU2VsZWN0ZWRDaGFubmVsfSBmcm9tICcuLi8uLi9hY3Rpb25zL3B1Ymxpc2gnO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25DaGFubmVsTG9naW46IChuYW1lLCBzaG9ydElkLCBsb25nSWQpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbChuYW1lLCBzaG9ydElkLCBsb25nSWQpKTtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbChuYW1lKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgZmlsZVJlcXVlc3RlZCB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBlcnJvciBhbmQgc3RhdHVzXG4gIGNvbnN0IGVycm9yICA9IHNob3cuZGlzcGxheUFzc2V0LmVycm9yO1xuICBjb25zdCBzdGF0dXMgPSBzaG93LmRpc3BsYXlBc3NldC5zdGF0dXM7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgZXJyb3IsXG4gICAgc3RhdHVzLFxuICAgIGFzc2V0LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uRmlsZVJlcXVlc3Q6IChuYW1lLCBjbGFpbUlkKSA9PiB7XG4gICAgICBkaXNwYXRjaChmaWxlUmVxdWVzdGVkKG5hbWUsIGNsYWltSWQpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgc2VsZWN0RmlsZSwgdXBkYXRlRXJyb3IsIGNsZWFyRmlsZSB9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlICAgICA6IHB1Ymxpc2guZmlsZSxcbiAgICB0aHVtYm5haWw6IHB1Ymxpc2gudGh1bWJuYWlsLFxuICAgIGZpbGVFcnJvcjogcHVibGlzaC5lcnJvci5maWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIHNlbGVjdEZpbGU6IChmaWxlKSA9PiB7XG4gICAgICBkaXNwYXRjaChzZWxlY3RGaWxlKGZpbGUpKTtcbiAgICB9LFxuICAgIHNldEZpbGVFcnJvcjogKHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaChjbGVhckZpbGUoKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcignZmlsZScsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGFwaTogeyBhcGlIb3N0LCBhcGlQb3J0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzJyk7XG5jb25zdCBsYnJ5QXBpVXJpID0gJ2h0dHA6Ly8nICsgYXBpSG9zdCArICc6JyArIGFwaVBvcnQ7XG5jb25zdCB7IGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCwgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4vZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5cbmNvbnN0IGhhbmRsZUxicnluZXRSZXNwb25zZSA9ICh7IGRhdGEgfSwgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGxvZ2dlci5kZWJ1ZygnbGJyeSBhcGkgZGF0YTonLCBkYXRhKTtcbiAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgLy8gY2hlY2sgZm9yIGFuIGVycm9yXG4gICAgaWYgKGRhdGEucmVzdWx0LmVycm9yKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0xicnluZXQgYXBpIGVycm9yOicsIGRhdGEucmVzdWx0LmVycm9yKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoZGF0YS5yZXN1bHQuZXJyb3IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBmYWxsYmFjayBpbiBjYXNlIGl0IGp1c3QgdGltZWQgb3V0XG4gIHJlamVjdChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaENsYWltIChwdWJsaXNoUGFyYW1zKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFB1Ymxpc2hpbmcgY2xhaW0gdG8gXCIke3B1Ymxpc2hQYXJhbXMubmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3B1Ymxpc2gnLFxuICAgICAgICAgIHBhcmFtczogcHVibGlzaFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3B1Ymxpc2gnLCBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwocHVibGlzaFBhcmFtcyksIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBDbGFpbSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSwgdGltZW91dDogMjAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltJywgJ0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltTGlzdCAoY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgY2xhaW1fbGlzdCBmb3IgXCIke2NsYWltTmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NsYWltX2xpc3QnLFxuICAgICAgICAgIHBhcmFtczogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltTGlzdCcsICdDTEFJTV9MSVNUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVzb2x2ZVVyaSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFJlc29sdmluZyBVUkkgZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdyZXNvbHZlJyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3Jlc29sdmVVcmknLCAnUkVTT0xWRScsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcikgeyAgLy8gY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7ICAvLyBpZiBubyBlcnJvcnMsIHJlc29sdmVcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHRbdXJpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXREb3dubG9hZERpcmVjdG9yeSAoKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdsYnJ5QXBpID4+IFJldHJpZXZpbmcgdGhlIGRvd25sb2FkIGRpcmVjdG9yeSBwYXRoIGZyb20gbGJyeSBkYWVtb24uLi4nKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdzZXR0aW5nc19nZXQnLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXREb3dubG9hZERpcmVjdG9yeScsICdTRVRUSU5HU19HRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0LmRvd25sb2FkX2RpcmVjdG9yeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbGJyeSBkYWVtb24sIGJ1dCB1bmFibGUgdG8gcmV0cmlldmUgdGhlIGRvd25sb2FkIGRpcmVjdG9yeS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdMYnJ5bmV0IEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKCcvaG9tZS9sYnJ5L0Rvd25sb2Fkcy8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZUNoYW5uZWwgKG5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gQ3JlYXRpbmcgY2hhbm5lbCBmb3IgJHtuYW1lfS4uLmApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NoYW5uZWxfbmV3JyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGNoYW5uZWxfbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGFtb3VudCAgICAgIDogMC4xLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdjcmVhdGVDaGFubmVsJywgJ0NIQU5ORUxfTkVXJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwiLy8gcmVxdWVzdCBhY3Rpb25zXG5leHBvcnQgY29uc3QgSEFORExFX1NIT1dfVVJJID0gJ0hBTkRMRV9TSE9XX1VSSSc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9FUlJPUiA9ICdSRVFVRVNUX0VSUk9SJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX1VQREFURSA9ICdSRVFVRVNUX1VQREFURSc7XG5leHBvcnQgY29uc3QgQVNTRVRfUkVRVUVTVF9ORVcgPSAnQVNTRVRfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfUkVRVUVTVF9ORVcgPSAnQ0hBTk5FTF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9MSVNUX0FERCA9ICdSRVFVRVNUX0xJU1RfQUREJztcblxuLy8gYXNzZXQgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEFTU0VUX0FERCA9IGBBU1NFVF9BRERgO1xuXG4vLyBjaGFubmVsIGFjdGlvbnNcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0FERCA9ICdDSEFOTkVMX0FERCc7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyc7XG5cbi8vIGFzc2V0L2ZpbGUgZGlzcGxheSBhY3Rpb25zXG5leHBvcnQgY29uc3QgRklMRV9SRVFVRVNURUQgPSAnRklMRV9SRVFVRVNURUQnO1xuZXhwb3J0IGNvbnN0IEZJTEVfQVZBSUxBQklMSVRZX1VQREFURSA9ICdGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQVNTRVRfRVJST1IgPSAnRElTUExBWV9BU1NFVF9FUlJPUic7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmZ1bmN0aW9uIExvZ28gKCkge1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmVyc2lvbj0nMS4xJyBpZD0nTGF5ZXJfMScgeD0nMHB4JyB5PScwcHgnIGhlaWdodD0nMjRweCcgdmlld0JveD0nMCAwIDgwIDMxJyBlbmFibGVCYWNrZ3JvdW5kPSduZXcgMCAwIDgwIDMxJyBjbGFzc05hbWU9J25hdi1iYXItbG9nbyc+XG4gICAgICA8TGluayB0bz0nLyc+XG4gICAgICAgIDx0aXRsZT5Mb2dvPC90aXRsZT5cbiAgICAgICAgPGRlc2M+U3BlZS5jaCBsb2dvPC9kZXNjPlxuICAgICAgICA8ZyBpZD0nQWJvdXQnPlxuICAgICAgICAgIDxnIGlkPSdQdWJsaXNoLUZvcm0tVjItX3gyOF9maWxsZWRfeDI5XycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTQyLjAwMDAwMCwgLTIzLjAwMDAwMCknPlxuICAgICAgICAgICAgPGcgaWQ9J0dyb3VwLTE3JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg0Mi4wMDAwMDAsIDIyLjAwMDAwMCknPlxuICAgICAgICAgICAgICA8dGV4dCB0cmFuc2Zvcm09J21hdHJpeCgxIDAgMCAxIDAgMjApJyBmb250U2l6ZT0nMjUnIGZvbnRGYW1pbHk9J1JvYm90byc+U3BlZSZsdDtoPC90ZXh0PlxuICAgICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTYnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAzMC4wMDAwMDApJz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04JyBmaWxsPSdub25lJyBzdHJva2U9JyMwOUY5MTEnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00wLjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weScgZmlsbD0nbm9uZScgc3Ryb2tlPScjMDI5RDc0JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMTYuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTInIGZpbGw9J25vbmUnIHN0cm9rZT0nI0UzNUJEOCcgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTMyLjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS0zJyBmaWxsPSdub25lJyBzdHJva2U9JyM0MTU2QzUnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J000OC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktNCcgZmlsbD0nbm9uZScgc3Ryb2tlPScjNjM1Njg4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNNjQuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvTGluaz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ287XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Mb2dvL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIE5hdkJhckNoYW5uZWxEcm9wZG93biAoeyBjaGFubmVsTmFtZSwgaGFuZGxlU2VsZWN0aW9uLCBkZWZhdWx0U2VsZWN0aW9uLCBWSUVXLCBMT0dPVVQgfSkge1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgdHlwZT0ndGV4dCcgaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tYXJyb3cgbGluay0tbmF2JyBvbkNoYW5nZT17aGFuZGxlU2VsZWN0aW9ufSB2YWx1ZT17ZGVmYXVsdFNlbGVjdGlvbn0+XG4gICAgICA8b3B0aW9uIGlkPSduYXYtYmFyLWNoYW5uZWwtc2VsZWN0LWNoYW5uZWwtb3B0aW9uJz57Y2hhbm5lbE5hbWV9PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtWSUVXfT5WaWV3PC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPXtMT0dPVVR9PkxvZ291dDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2QmFyQ2hhbm5lbERyb3Bkb3duO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBY3RpdmVTdGF0dXNCYXIgPSAoKSA9PiB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItLWFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEluYWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1pbmFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5hY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvciAgICAgIDogc2hvdy5yZXF1ZXN0LmVycm9yLFxuICAgIHJlcXVlc3RUeXBlOiBzaG93LnJlcXVlc3QudHlwZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25IYW5kbGVTaG93UGFnZVVyaSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCBhc3NldCBpbmZvXG4gIGxldCBhc3NldDtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICBjb25zdCBhc3NldExpc3QgPSBzaG93LmFzc2V0TGlzdDtcbiAgaWYgKHJlcXVlc3QgJiYgYXNzZXRMaXN0KSB7XG4gICAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTsgIC8vIG5vdGU6IGp1c3Qgc3RvcmUgdGhpcyBpbiB0aGUgcmVxdWVzdFxuICAgIGFzc2V0ID0gYXNzZXRMaXN0W2Fzc2V0S2V5XSB8fCBudWxsO1xuICB9O1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGE6IHsgdGl0bGUgfSB9ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgcmVxdWVzdFxuICBjb25zdCBwcmV2aW91c1JlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgLy8gc2VsZWN0IGNoYW5uZWxcbiAgbGV0IGNoYW5uZWw7XG4gIGlmIChwcmV2aW91c1JlcXVlc3QpIHtcbiAgICBjb25zdCBjaGFubmVsS2V5ID0gcHJldmlvdXNSZXF1ZXN0LmtleTtcbiAgICBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uVXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGNoYW5uZWwga2V5XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSByZXF1ZXN0LmtleTtcbiAgLy8gc2VsZWN0IGNoYW5uZWwgY2xhaW1zXG4gIGNvbnN0IGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxLZXksXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25VcGRhdGVDaGFubmVsQ2xhaW1zLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoe3NpdGU6IHtkZWZhdWx0czogeyBkZWZhdWx0VGh1bWJuYWlsIH19fSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBob3N0LCB0aXRsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgUHVibGlzaFRvb2wgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVG9vbCc7XG5cbmNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nfT5cbiAgICAgICAgPFNFTyAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCBmbGV4LWNvbnRhaW5lci0tY29sdW1uJ30+XG4gICAgICAgICAgPFB1Ymxpc2hUb29sIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZVBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvSG9tZVBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkaXNhYmxlZDogcHVibGlzaC5kaXNhYmxlZCxcbiAgICBmaWxlICAgIDogcHVibGlzaC5maWxlLFxuICAgIHN0YXR1cyAgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBQdWJsaXNoUHJldmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW1nU291cmNlICAgICAgIDogJycsXG4gICAgICBkZWZhdWx0VGh1bWJuYWlsOiAnL2Fzc2V0cy9pbWcvdmlkZW9fdGh1bWJfZGVmYXVsdC5wbmcnLFxuICAgIH07XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKHRoaXMucHJvcHMuZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICBpZiAobmV3UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZShuZXdQcm9wcy5maWxlKTtcbiAgICB9XG4gICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCAhPT0gdGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgIGlmIChuZXdQcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShuZXdQcm9wcy50aHVtYm5haWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUgKGZpbGUpIHtcbiAgICBjb25zdCBwcmV2aWV3UmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBwcmV2aWV3UmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgcHJldmlld1JlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHByZXZpZXdSZWFkZXIucmVzdWx0fSk7XG4gICAgfTtcbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2UgKGZpbGUpIHtcbiAgICBpZiAoZmlsZS50eXBlICE9PSAndmlkZW8vbXA0Jykge1xuICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZShmaWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJvcHMudGh1bWJuYWlsKSB7XG4gICAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlRnJvbUZpbGUodGhpcy5wcm9wcy50aHVtYm5haWwpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7aW1nU291cmNlOiB0aGlzLnN0YXRlLmRlZmF1bHRUaHVtYm5haWx9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGltZ1xuICAgICAgICBpZD0nZHJvcHpvbmUtcHJldmlldydcbiAgICAgICAgc3JjPXt0aGlzLnN0YXRlLmltZ1NvdXJjZX1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmRpbVByZXZpZXcgPyAnZGltJyA6ICcnfVxuICAgICAgICBhbHQ9J3B1Ymxpc2ggcHJldmlldydcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufTtcblxuUHVibGlzaFByZXZpZXcucHJvcFR5cGVzID0ge1xuICBkaW1QcmV2aWV3OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBmaWxlICAgICAgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHRodW1ibmFpbCA6IFByb3BUeXBlcy5vYmplY3QsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoUHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3L2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGUsIHN0YXJ0UHVibGlzaH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGU6IHB1Ymxpc2guZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxuICBzdGFydFB1Ymxpc2gsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHB1Ymxpc2gubWV0YWRhdGEudGl0bGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25NZXRhZGF0YUNoYW5nZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVNZXRhZGF0YShuYW1lLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4LmpzIiwiaW1wb3J0IHt1cGRhdGVDbGFpbSwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBmaWxlTmFtZSAgICAgICAgICAgICAgOiBwdWJsaXNoLmZpbGUubmFtZSxcbiAgICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBwdWJsaXNoLnB1Ymxpc2hJbkNoYW5uZWwsXG4gICAgc2VsZWN0ZWRDaGFubmVsICAgICAgIDogcHVibGlzaC5zZWxlY3RlZENoYW5uZWwsXG4gICAgY2xhaW0gICAgICAgICAgICAgICAgIDogcHVibGlzaC5jbGFpbSxcbiAgICB1cmxFcnJvciAgICAgICAgICAgICAgOiBwdWJsaXNoLmVycm9yLnVybCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNsYWltQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUNsYWltKHZhbHVlKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigncHVibGlzaFN1Ym1pdCcsIG51bGwpKTtcbiAgICB9LFxuICAgIG9uVXJsRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ3VybCcsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmZ1bmN0aW9uIFVybE1pZGRsZSAoe3B1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0pIHtcbiAgaWYgKHB1Ymxpc2hJbkNoYW5uZWwpIHtcbiAgICBpZiAoc2VsZWN0ZWRDaGFubmVsID09PSBsb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPntsb2dnZWRJbkNoYW5uZWxOYW1lfTp7bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0gLzwvc3Bhbj47XG4gICAgfVxuICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz5AY2hhbm5lbDxzcGFuXG4gICAgICBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+U2VsZWN0IGEgY2hhbm5lbCBiZWxvdzwvc3Bhbj4gLzwvc3Bhbj47XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8c3BhbiBpZD0ndXJsLW5vLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz54eXo8c3BhbiBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+VGhpcyB3aWxsIGJlIGEgcmFuZG9tIGlkPC9zcGFuPiAvPC9zcGFuPlxuICApO1xufVxuXG5VcmxNaWRkbGUucHJvcFR5cGVzID0ge1xuICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBsb2dnZWRJbkNoYW5uZWxOYW1lICAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXJsTWlkZGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4IiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uTmV3VGh1bWJuYWlsIH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2g6IHsgZmlsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbk5ld1RodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhLCB0b2dnbGVNZXRhZGF0YUlucHV0c30gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNob3dNZXRhZGF0YUlucHV0czogcHVibGlzaC5zaG93TWV0YWRhdGFJbnB1dHMsXG4gICAgZGVzY3JpcHRpb24gICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgIGxpY2Vuc2UgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5saWNlbnNlLFxuICAgIG5zZncgICAgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5uc2Z3LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uTWV0YWRhdGFDaGFuZ2U6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTWV0YWRhdGEobmFtZSwgdmFsdWUpKTtcbiAgICB9LFxuICAgIG9uVG9nZ2xlTWV0YWRhdGFJbnB1dHM6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godG9nZ2xlTWV0YWRhdGFJbnB1dHModmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRXhwYW5kaW5nVGV4dGFyZWEgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5faGFuZGxlQ2hhbmdlID0gdGhpcy5faGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuYWRqdXN0VGV4dGFyZWEoe30pO1xuICB9XG4gIF9oYW5kbGVDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKGV2ZW50KTtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhKGV2ZW50KTtcbiAgfVxuICBhZGp1c3RUZXh0YXJlYSAoeyB0YXJnZXQgPSB0aGlzLmVsIH0pIHtcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LnNjcm9sbEhlaWdodH1weGA7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IC4uLnJlc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDx0ZXh0YXJlYVxuICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgcmVmPXt4ID0+IHRoaXMuZWwgPSB4fVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5faGFuZGxlQ2hhbmdlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG59XG5cbkV4cGFuZGluZ1RleHRhcmVhLnByb3BUeXBlcyA9IHtcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kaW5nVGV4dGFyZWE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3giLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7c2V0UHVibGlzaEluQ2hhbm5lbCwgdXBkYXRlU2VsZWN0ZWRDaGFubmVsLCB1cGRhdGVFcnJvcn0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgcHVibGlzaEluQ2hhbm5lbCAgIDogcHVibGlzaC5wdWJsaXNoSW5DaGFubmVsLFxuICAgIHNlbGVjdGVkQ2hhbm5lbCAgICA6IHB1Ymxpc2guc2VsZWN0ZWRDaGFubmVsLFxuICAgIGNoYW5uZWxFcnJvciAgICAgICA6IHB1Ymxpc2guZXJyb3IuY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaChzZXRQdWJsaXNoSW5DaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgICBvbkNoYW5uZWxTZWxlY3Q6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2NoYW5uZWwnLCBudWxsKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwodmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsU2VsZWN0L2luZGV4LmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge2NsZWFyRmlsZX0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHN0YXR1cyA6IHB1Ymxpc2guc3RhdHVzLnN0YXR1cyxcbiAgICBtZXNzYWdlOiBwdWJsaXNoLnN0YXR1cy5tZXNzYWdlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBjbGVhckZpbGUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvaW5kZXguanMiLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2U6IHB1Ymxpc2guZGlzYWJsZWRNZXNzYWdlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuXG5jbGFzcyBBYm91dFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U0VPIHBhZ2VUaXRsZT17J0Fib3V0J30gcGFnZVVyaT17J2Fib3V0J30gLz5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0ncHVsbC1xdW90ZSc+U3BlZS5jaCBpcyBhbiBvcGVuLXNvdXJjZSBwcm9qZWN0LiAgUGxlYXNlIGNvbnRyaWJ1dGUgdG8gdGhlIGV4aXN0aW5nIHNpdGUsIG9yIGZvcmsgaXQgYW5kIG1ha2UgeW91ciBvd24uPC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3R3aXR0ZXIuY29tL3NwZWVfY2gnPlRXSVRURVI8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gnPkdJVEhVQjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5ESVNDT1JEIENIQU5ORUw8L2E+PC9wPlxuICAgICAgICAgICAgICA8cD48YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvYmxvYi9tYXN0ZXIvUkVBRE1FLm1kJz5ET0NVTUVOVEFUSU9OPC9hPjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIG1lZGlhLWhvc3Rpbmcgc2l0ZSB0aGF0IHJlYWRzIGZyb20gYW5kIHB1Ymxpc2hlcyBjb250ZW50IHRvIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vbGJyeS5pbyc+TEJSWTwvYT4gYmxvY2tjaGFpbi48L3A+XG4gICAgICAgICAgICAgIDxwPlNwZWUuY2ggaXMgYSBob3N0aW5nIHNlcnZpY2UsIGJ1dCB3aXRoIHRoZSBhZGRlZCBiZW5lZml0IHRoYXQgaXQgc3RvcmVzIHlvdXIgY29udGVudCBvbiBhIGRlY2VudHJhbGl6ZWQgbmV0d29yayBvZiBjb21wdXRlcnMgLS0gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2dldCc+TEJSWTwvYT4gbmV0d29yay4gIFRoaXMgbWVhbnMgdGhhdCB5b3VyIGltYWdlcyBhcmUgc3RvcmVkIGluIG11bHRpcGxlIGxvY2F0aW9ucyB3aXRob3V0IGEgc2luZ2xlIHBvaW50IG9mIGZhaWx1cmUuPC9wPlxuICAgICAgICAgICAgICA8aDM+Q29udHJpYnV0ZTwvaDM+XG4gICAgICAgICAgICAgIDxwPklmIHlvdSBoYXZlIGFuIGlkZWEgZm9yIHlvdXIgb3duIHNwZWUuY2gtbGlrZSBzaXRlIG9uIHRvcCBvZiBMQlJZLCBmb3JrIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+Z2l0aHViIHJlcG88L2E+IGFuZCBnbyB0byB0b3duITwvcD5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IHdhbnQgdG8gaW1wcm92ZSBzcGVlLmNoLCBqb2luIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJz5kaXNjb3JkIGNoYW5uZWw8L2E+IG9yIHNvbHZlIG9uZSBvZiBvdXIgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vbGJyeWlvL3NwZWUuY2gvaXNzdWVzJz5naXRodWIgaXNzdWVzPC9hPi48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBYm91dFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvQWJvdXRQYWdlL2luZGV4LmpzeCIsImNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUsIGNsYWltSWQpIHtcbiAgICBpZiAoY2hhbm5lbE5hbWUpIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDaGFubmVsKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5nZXRDbGFpbUlkQnlDbGFpbShuYW1lLCBjbGFpbUlkKTtcbiAgICB9XG4gIH0sXG4gIGdldENsYWltSWRCeUNsYWltIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNsYWltKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2xhaW0uZ2V0TG9uZ0NsYWltSWQoY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDbGFpbUlkQnlDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCgke2NoYW5uZWxOYW1lfSwgJHtjaGFubmVsQ2xhaW1JZH0sICR7Y2xhaW1OYW1lfSlgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIGlkXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbElkLCBkYi5DbGFpbS5nZXRDbGFpbUlkQnlMb25nQ2hhbm5lbElkKGxvbmdDaGFubmVsSWQsIGNsYWltTmFtZSldKTsgIC8vIDIuIGdldCB0aGUgbG9uZyBjbGFpbSBpZFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsSWQsIGxvbmdDbGFpbUlkXSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NMQUlNKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShsb25nQ2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxEYXRhIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gMS4gZ2V0IHRoZSBsb25nIGNoYW5uZWwgSWQgKG1ha2Ugc3VyZSBjaGFubmVsIGV4aXN0cylcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKVxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbENsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gW251bGwsIG51bGwsIG51bGxdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAyLiBnZXQgdGhlIHNob3J0IElEIGFuZCBhbGwgY2xhaW1zIGZvciB0aGF0IGNoYW5uZWxcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2xvbmdDaGFubmVsQ2xhaW1JZCwgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgc2hvcnRDaGFubmVsQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgICAgbG9uZ0NoYW5uZWxDbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2hhbm5lbENsYWltcyAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNsYWltLmdldEFsbENoYW5uZWxDbGFpbXMobG9uZ0NoYW5uZWxDbGFpbUlkKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2xvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5XSkgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DSEFOTkVMKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMy4gZm9ybWF0IHRoZSBkYXRhIGZvciB0aGUgdmlldywgaW5jbHVkaW5nIHBhZ2luYXRpb25cbiAgICAgICAgICBsZXQgcGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhID0gcmV0dXJuUGFnaW5hdGVkQ2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsQ2xhaW1zQXJyYXksIHBhZ2UpO1xuICAgICAgICAgIC8vIDQuIHJldHVybiBhbGwgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb24gYW5kIGNvbnRlbnRzXG4gICAgICAgICAgcmVzb2x2ZShwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRMb2NhbEZpbGVSZWNvcmQgKGNsYWltSWQsIG5hbWUpIHtcbiAgICByZXR1cm4gZGIuRmlsZS5maW5kT25lKHt3aGVyZToge2NsYWltSWQsIG5hbWV9fSlcbiAgICAgIC50aGVuKGZpbGUgPT4ge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gTk9fRklMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZS5kYXRhVmFsdWVzO1xuICAgICAgfSk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHsgZ2V0U3ViRGlyZWN0b3J5TmFtZXMgfSA9IHJlcXVpcmUoJ2J1aWxkL2dldEZvbGRlck5hbWVzLmpzJyk7XG5jb25zdCB0aGlzRm9sZGVyID0gUGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2NsaWVudC9wYWdlcy8nKTtcblxubGV0IG1vZHVsZXMgPSB7fTtcblxuZ2V0U3ViRGlyZWN0b3J5TmFtZXModGhpc0ZvbGRlcilcbiAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBtb2R1bGVzW25hbWVdID0gcmVxdWlyZShgLi8ke25hbWV9YCkuZGVmYXVsdDtcbiAgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9pbmRleC5qcyIsImNvbnN0IFBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7IGdldFN1YkRpcmVjdG9yeU5hbWVzIH0gPSByZXF1aXJlKCdidWlsZC9nZXRGb2xkZXJOYW1lcy5qcycpO1xuXG5jb25zdCB0aGlzRm9sZGVyID0gUGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2NsaWVudC9jb21wb25lbnRzLycpO1xubGV0IG1vZHVsZXMgPSB7fTtcblxuZ2V0U3ViRGlyZWN0b3J5TmFtZXModGhpc0ZvbGRlcilcbiAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBtb2R1bGVzW25hbWVdID0gcmVxdWlyZShgLi8ke25hbWV9YCkuZGVmYXVsdDtcbiAgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL2luZGV4LmpzIiwiY29uc3QgUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHsgZ2V0U3ViRGlyZWN0b3J5TmFtZXMgfSA9IHJlcXVpcmUoJ2J1aWxkL2dldEZvbGRlck5hbWVzLmpzJyk7XG5jb25zdCB0aGlzRm9sZGVyID0gUGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2NsaWVudC9jb250YWluZXJzLycpO1xuXG5sZXQgbW9kdWxlcyA9IHt9O1xuXG5nZXRTdWJEaXJlY3RvcnlOYW1lcyh0aGlzRm9sZGVyKVxuICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgIG1vZHVsZXNbbmFtZV0gPSByZXF1aXJlKGAuLyR7bmFtZX1gKS5kZWZhdWx0O1xuICB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvaW5kZXguanMiLCJjb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5jb25zdCBsb2NhbExvZ2luU3RyYXRlZ3kgPSByZXF1aXJlKCcuL2xvY2FsLWxvZ2luLmpzJyk7XG5jb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9sb2NhbC1zaWdudXAuanMnKTtcbmNvbnN0IHsgc2VyaWFsaXplU3BlZWNoVXNlciwgZGVzZXJpYWxpemVTcGVlY2hVc2VyIH0gPSByZXF1aXJlKCdoZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XG5cbnBhc3Nwb3J0LmRlc2VyaWFsaXplVXNlcihkZXNlcmlhbGl6ZVNwZWVjaFVzZXIpO1xucGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcbnBhc3Nwb3J0LnVzZSgnbG9jYWwtbG9naW4nLCBsb2NhbExvZ2luU3RyYXRlZ3kpO1xucGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXNzcG9ydDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9pbmRleC5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBwdWJsaXNoSGVscGVycyA9IHJlcXVpcmUoJ2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgcHVibGlzaGluZzogeyBwcmltYXJ5Q2xhaW1BZGRyZXNzLCBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfSB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgU2VxdWVsaXplID0gcmVxdWlyZSgnc2VxdWVsaXplJyk7XG5jb25zdCBPcCA9IFNlcXVlbGl6ZS5PcDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1Ymxpc2ggKHB1Ymxpc2hQYXJhbXMsIGZpbGVOYW1lLCBmaWxlVHlwZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgcHVibGlzaFJlc3VsdHMsIGNlcnRpZmljYXRlSWQsIGNoYW5uZWxOYW1lO1xuICAgICAgLy8gcHVibGlzaCB0aGUgZmlsZVxuICAgICAgcmV0dXJuIGxicnlBcGkucHVibGlzaENsYWltKHB1Ymxpc2hQYXJhbXMpXG4gICAgICAgIC50aGVuKHR4ID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU3VjY2Vzc2Z1bGx5IHB1Ymxpc2hlZCAke3B1Ymxpc2hQYXJhbXMubmFtZX0gJHtmaWxlTmFtZX1gLCB0eCk7XG4gICAgICAgICAgcHVibGlzaFJlc3VsdHMgPSB0eDtcbiAgICAgICAgICAvLyBnZXQgdGhlIGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBpZiAocHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgdGhpcyBjbGFpbSB3YXMgcHVibGlzaGVkIGluIGNoYW5uZWw6ICR7cHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gZGIuQ2hhbm5lbC5maW5kT25lKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgICBjaGFubmVsTmFtZTogcHVibGlzaFBhcmFtcy5jaGFubmVsX25hbWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCd0aGlzIGNsYWltIHdhcyBub3QgcHVibGlzaGVkIGluIGEgY2hhbm5lbCcpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsID0+IHtcbiAgICAgICAgLy8gc2V0IGNoYW5uZWwgaW5mb3JtYXRpb25cbiAgICAgICAgICBjZXJ0aWZpY2F0ZUlkID0gbnVsbDtcbiAgICAgICAgICBjaGFubmVsTmFtZSA9IG51bGw7XG4gICAgICAgICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBjaGFubmVsLmNoYW5uZWxDbGFpbUlkO1xuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPSBjaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2dnZXIuZGVidWcoYGNlcnRpZmljYXRlSWQ6ICR7Y2VydGlmaWNhdGVJZH1gKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIEZpbGUgcmVjb3JkXG4gICAgICAgICAgY29uc3QgZmlsZVJlY29yZCA9IHtcbiAgICAgICAgICAgIG5hbWUgICAgICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkICAgIDogcHVibGlzaFJlc3VsdHMuY2xhaW1faWQsXG4gICAgICAgICAgICB0aXRsZSAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYWRkcmVzcyAgICA6IHB1Ymxpc2hQYXJhbXMuY2xhaW1fYWRkcmVzcyxcbiAgICAgICAgICAgIG91dHBvaW50ICAgOiBgJHtwdWJsaXNoUmVzdWx0cy50eGlkfToke3B1Ymxpc2hSZXN1bHRzLm5vdXR9YCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgOiAwLFxuICAgICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgICBmaWxlUGF0aCAgIDogcHVibGlzaFBhcmFtcy5maWxlX3BhdGgsXG4gICAgICAgICAgICBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyBjcmVhdGUgdGhlIENsYWltIHJlY29yZFxuICAgICAgICAgIGNvbnN0IGNsYWltUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgdGh1bWJuYWlsICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGh1bWJuYWlsLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmlsZVR5cGUsXG4gICAgICAgICAgICBuc2Z3ICAgICAgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5uc2Z3LFxuICAgICAgICAgICAgYW1vdW50ICAgICA6IHB1Ymxpc2hQYXJhbXMuYmlkLFxuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCxcbiAgICAgICAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IGNyaXRlcmlhXG4gICAgICAgICAgY29uc3QgdXBzZXJ0Q3JpdGVyaWEgPSB7XG4gICAgICAgICAgICBuYW1lICAgOiBwdWJsaXNoUGFyYW1zLm5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIHVwc2VydCB0aGUgcmVjb3Jkc1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVSZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnRmlsZScpLCBkYi51cHNlcnQoZGIuQ2xhaW0sIGNsYWltUmVjb3JkLCB1cHNlcnRDcml0ZXJpYSwgJ0NsYWltJyldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtmaWxlLCBjbGFpbV0pID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2ZpbGUuc2V0Q2xhaW0oY2xhaW0pLCBjbGFpbS5zZXRGaWxlKGZpbGUpXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZpbGUgYW5kIENsYWltIHJlY29yZHMgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgICByZXNvbHZlKHB1Ymxpc2hSZXN1bHRzKTsgLy8gcmVzb2x2ZSB0aGUgcHJvbWlzZSB3aXRoIHRoZSByZXN1bHQgZnJvbSBsYnJ5QXBpLnB1Ymxpc2hDbGFpbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1BVQkxJU0ggRVJST1InLCBlcnJvcik7XG4gICAgICAgICAgcHVibGlzaEhlbHBlcnMuZGVsZXRlVGVtcG9yYXJ5RmlsZShwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCk7IC8vIGRlbGV0ZSB0aGUgbG9jYWwgZmlsZVxuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBjbGFpbU5hbWVJc0F2YWlsYWJsZSAobmFtZSkge1xuICAgIGNvbnN0IGNsYWltQWRkcmVzc2VzID0gYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIHx8IFtdO1xuICAgIGNsYWltQWRkcmVzc2VzLnB1c2gocHJpbWFyeUNsYWltQWRkcmVzcyk7XG4gICAgLy8gZmluZCBhbnkgcmVjb3JkcyB3aGVyZSB0aGUgbmFtZSBpcyB1c2VkXG4gICAgcmV0dXJuIGRiLkNsYWltXG4gICAgICAuZmluZEFsbCh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFsnYWRkcmVzcyddLFxuICAgICAgICB3aGVyZSAgICAgOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICBbT3Aub3JdOiBjbGFpbUFkZHJlc3NlcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2xhaW0gaXMgYWxyZWFkeSBpbiB1c2UnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbiAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5IChuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkNoYW5uZWxcbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgd2hlcmU6IHsgY2hhbm5lbE5hbWU6IG5hbWUgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGF0IGNoYW5uZWwgaGFzIGFscmVhZHkgYmVlbiBjbGFpbWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHsgZGV0YWlscywgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5ICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9KSB7XG4gICAgLy8gdmFsaWRhdGUgbmFtZVxuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBuYW1lIGZpZWxkIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgY29uc3QgaW52YWxpZE5hbWVDaGFyYWN0ZXJzID0gL1teQS1aYS16MC05LC1dLy5leGVjKG5hbWUpO1xuICAgIGlmIChpbnZhbGlkTmFtZUNoYXJhY3RlcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNsYWltIG5hbWUgeW91IHByb3ZpZGVkIGlzIG5vdCBhbGxvd2VkLiAgT25seSB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnMgYXJlIGFsbG93ZWQ6IEEtWiwgYS16LCAwLTksIGFuZCBcIi1cIicpO1xuICAgIH1cbiAgICAvLyBvcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAgbnNmdyA9IChuc2Z3ID09PSAndHJ1ZScpO1xuICAgIGxpY2Vuc2UgPSBsaWNlbnNlIHx8IG51bGw7XG4gICAgdGl0bGUgPSB0aXRsZSB8fCBudWxsO1xuICAgIGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gfHwgbnVsbDtcbiAgICB0aHVtYm5haWwgPSB0aHVtYm5haWwgfHwgbnVsbDtcbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgbnNmdyxcbiAgICAgIGxpY2Vuc2UsXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgdGh1bWJuYWlsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyAoe2ZpbGUsIHRodW1ibmFpbH0pIHtcbiAgICAvLyBtYWtlIHN1cmUgYSBmaWxlIHdhcyBwcm92aWRlZFxuICAgIGlmICghZmlsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHdpdGgga2V5IG9mIFtmaWxlXSBmb3VuZCBpbiByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGlmICghZmlsZS5wYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcGF0aCBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSB0eXBlIGZvdW5kJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlIG5hbWVcbiAgICBpZiAoLycvLnRlc3QoZmlsZS5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcG9zdHJvcGhlcyBhcmUgbm90IGFsbG93ZWQgaW4gdGhlIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICAvLyB2YWxpZGF0ZSB0aGUgZmlsZVxuICAgIG1vZHVsZS5leHBvcnRzLnZhbGlkYXRlRmlsZVR5cGVBbmRTaXplKGZpbGUpO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lICAgICAgICAgOiBmaWxlLm5hbWUsXG4gICAgICBmaWxlUGF0aCAgICAgICAgIDogZmlsZS5wYXRoLFxuICAgICAgZmlsZVR5cGUgICAgICAgICA6IGZpbGUudHlwZSxcbiAgICAgIHRodW1ibmFpbEZpbGVOYW1lOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLm5hbWUgOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVQYXRoOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnBhdGggOiBudWxsKSxcbiAgICAgIHRodW1ibmFpbEZpbGVUeXBlOiAodGh1bWJuYWlsID8gdGh1bWJuYWlsLnR5cGUgOiBudWxsKSxcbiAgICB9O1xuICB9LFxuICB2YWxpZGF0ZUZpbGVUeXBlQW5kU2l6ZSAoZmlsZSkge1xuICAgIC8vIGNoZWNrIGZpbGUgdHlwZSBhbmQgc2l6ZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuanBlZy8uanBnLy5wbmcgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLmdpZiB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIC5naWZzIGFyZSBsaW1pdGVkIHRvIDUwIG1lZ2FieXRlcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZpZGVvL21wNCc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiA1MDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5tcDQgd2FzIHRvbyBiaWcnKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gdW5yZWNvZ25pemVkIGZpbGUgdHlwZScpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSAnICsgZmlsZS50eXBlICsgJyBjb250ZW50IHR5cGUgaXMgbm90IHN1cHBvcnRlZC4gIE9ubHksIC5qcGVnLCAucG5nLCAuZ2lmLCBhbmQgLm1wNCBmaWxlcyBhcmUgY3VycmVudGx5IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGU7XG4gIH0sXG4gIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyAoZmlsZVBhdGgsIG5hbWUsIHRpdGxlLCBkZXNjcmlwdGlvbiwgbGljZW5zZSwgbnNmdywgdGh1bWJuYWlsKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBQdWJsaXNoIFBhcmFtZXRlcnNgKTtcbiAgICAvLyBwcm92aWRlIGRlZmF1bHRzIGZvciB0aXRsZVxuICAgIGlmICh0aXRsZSA9PT0gbnVsbCB8fCB0aXRsZS50cmltKCkgPT09ICcnKSB7XG4gICAgICB0aXRsZSA9IG5hbWU7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgZGVmYXVsdCBmb3IgZGVzY3JpcHRpb25cbiAgICBpZiAoZGVzY3JpcHRpb24gPT09IG51bGwgfHwgZGVzY3JpcHRpb24udHJpbSgpID09PSAnJykge1xuICAgICAgZGVzY3JpcHRpb24gPSAnJztcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBsaWNlbnNlXG4gICAgaWYgKGxpY2Vuc2UgPT09IG51bGwgfHwgbGljZW5zZS50cmltKCkgPT09ICcnKSB7XG4gICAgICBsaWNlbnNlID0gJyAnOyAgLy8gZGVmYXVsdCB0byBlbXB0eSBzdHJpbmdcbiAgICB9XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIGNvbnN0IHB1Ymxpc2hQYXJhbXMgPSB7XG4gICAgICBuYW1lLFxuICAgICAgZmlsZV9wYXRoOiBmaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGF1dGhvciAgOiBkZXRhaWxzLnRpdGxlLFxuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgbGljZW5zZSxcbiAgICAgICAgbnNmdyxcbiAgICAgIH0sXG4gICAgICBjbGFpbV9hZGRyZXNzOiBwdWJsaXNoaW5nLnByaW1hcnlDbGFpbUFkZHJlc3MsXG4gICAgfTtcbiAgICAvLyBhZGQgdGh1bWJuYWlsIHRvIGNoYW5uZWwgaWYgdmlkZW9cbiAgICBpZiAodGh1bWJuYWlsKSB7XG4gICAgICBwdWJsaXNoUGFyYW1zWydtZXRhZGF0YSddWyd0aHVtYm5haWwnXSA9IHRodW1ibmFpbDtcbiAgICB9XG4gICAgcmV0dXJuIHB1Ymxpc2hQYXJhbXM7XG4gIH0sXG4gIGNyZWF0ZVRodW1ibmFpbFB1Ymxpc2hQYXJhbXMgKHRodW1ibmFpbEZpbGVQYXRoLCBjbGFpbU5hbWUsIGxpY2Vuc2UsIG5zZncpIHtcbiAgICBpZiAoIXRodW1ibmFpbEZpbGVQYXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgVGh1bWJuYWlsIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIGNyZWF0ZSB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSAgICAgOiBgJHtjbGFpbU5hbWV9LXRodW1iYCxcbiAgICAgIGZpbGVfcGF0aDogdGh1bWJuYWlsRmlsZVBhdGgsXG4gICAgICBiaWQgICAgICA6IDAuMDEsXG4gICAgICBtZXRhZGF0YSA6IHtcbiAgICAgICAgdGl0bGUgICAgICA6IGAke2NsYWltTmFtZX0gdGh1bWJuYWlsYCxcbiAgICAgICAgZGVzY3JpcHRpb246IGBhIHRodW1ibmFpbCBmb3IgJHtjbGFpbU5hbWV9YCxcbiAgICAgICAgYXV0aG9yICAgICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlICAgOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICAgIGNoYW5uZWxfbmFtZSA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxfaWQgICA6IHB1Ymxpc2hpbmcudGh1bWJuYWlsQ2hhbm5lbElkLFxuICAgIH07XG4gIH0sXG4gIGRlbGV0ZVRlbXBvcmFyeUZpbGUgKGZpbGVQYXRoKSB7XG4gICAgZnMudW5saW5rKGZpbGVQYXRoLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYGVycm9yIGRlbGV0aW5nIHRlbXBvcmFyeSBmaWxlICR7ZmlsZVBhdGh9YCk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIGxvZ2dlci5kZWJ1Zyhgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgJHtmaWxlUGF0aH1gKTtcbiAgICB9KTtcbiAgfSxcbiAgYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEgKGZpbGVJbmZvLCBnZXRSZXN1bHQpIHtcbiAgICBmaWxlSW5mby5maWxlTmFtZSA9IGdldFJlc3VsdC5maWxlX25hbWU7XG4gICAgZmlsZUluZm8uZmlsZVBhdGggPSBnZXRSZXN1bHQuZG93bmxvYWRfcGF0aDtcbiAgICByZXR1cm4gZmlsZUluZm87XG4gIH0sXG4gIGNyZWF0ZUZpbGVEYXRhICh7IG5hbWUsIGNsYWltSWQsIG91dHBvaW50LCBoZWlnaHQsIGFkZHJlc3MsIG5zZncsIGNvbnRlbnRUeXBlIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIGNsYWltSWQsXG4gICAgICBvdXRwb2ludCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGFkZHJlc3MsXG4gICAgICBmaWxlTmFtZTogJycsXG4gICAgICBmaWxlUGF0aDogJycsXG4gICAgICBmaWxlVHlwZTogY29udGVudFR5cGUsXG4gICAgICBuc2Z3LFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcblxuY2xhc3MgTG9naW5QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICAvLyByZS1yb3V0ZSB0aGUgdXNlciB0byB0aGUgaG9tZXBhZ2UgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgaWYgKG5ld1Byb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgIT09IHRoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9gKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydMb2dpbid9IHBhZ2VVcmk9eydsb2dpbid9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5DaGFubmVscyBhbGxvdyB5b3UgdG8gcHVibGlzaCBhbmQgZ3JvdXAgY29udGVudCB1bmRlciBhbiBpZGVudGl0eS4gWW91IGNhbiBjcmVhdGUgYSBjaGFubmVsIGZvciB5b3Vyc2VsZiwgb3Igc2hhcmUgb25lIHdpdGggbGlrZS1taW5kZWQgZnJpZW5kcy4gIFlvdSBjYW4gY3JlYXRlIDEgY2hhbm5lbCwgb3IgMTAwLCBzbyB3aGV0aGVyIHlvdSdyZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdGFsb25pYTIwMTc6NDNkY2Y0NzE2M2NhYTIxZDg0MDRkOWZlOWIzMGY3OGVmM2UxNDZhOCc+ZG9jdW1lbnRpbmcgaW1wb3J0YW50IGV2ZW50czwvYT4sIG9yIG1ha2luZyBhIHB1YmxpYyByZXBvc2l0b3J5IGZvciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdEdpZnMnPmNhdCBnaWZzPC9hPiAocGFzc3dvcmQ6ICcxMjM0JyksIHRyeSBjcmVhdGluZyBhIGNoYW5uZWwgZm9yIGl0ITwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+TG9nIGluIHRvIGFuIGV4aXN0aW5nIGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxMb2dpbkZvcm0gLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+Q3JlYXRlIGEgYnJhbmQgbmV3IGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDcmVhdGVGb3JtIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKExvZ2luUGFnZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVBhZ2VUaXRsZSB9IGZyb20gJ3V0aWxzL3BhZ2VUaXRsZSc7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGFncyB9IGZyb20gJ3V0aWxzL21ldGFUYWdzJztcbmltcG9ydCB7IGNyZWF0ZUNhbm9uaWNhbExpbmsgfSBmcm9tICd1dGlscy9jYW5vbmljYWxMaW5rJztcblxuY2xhc3MgU0VPIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICAvLyBwcm9wcyBmcm9tIHN0YXRlXG4gICAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gcHJvcHMgZnJvbSBwYXJlbnRcbiAgICBjb25zdCB7IGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCB7IHBhZ2VUaXRsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjcmVhdGUgcGFnZSB0aXRsZSwgdGFncywgYW5kIGNhbm9uaWNhbCBsaW5rXG4gICAgcGFnZVRpdGxlID0gY3JlYXRlUGFnZVRpdGxlKHNpdGVUaXRsZSwgcGFnZVRpdGxlKTtcbiAgICBjb25zdCBtZXRhVGFncyA9IGNyZWF0ZU1ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgIGNvbnN0IGNhbm9uaWNhbExpbmsgPSBjcmVhdGVDYW5vbmljYWxMaW5rKGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpLCBzaXRlSG9zdCk7XG4gICAgLy8gcmVuZGVyIHJlc3VsdHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldFxuICAgICAgICB0aXRsZT17cGFnZVRpdGxlfVxuICAgICAgICBtZXRhPXttZXRhVGFnc31cbiAgICAgICAgbGluaz17W3tyZWw6ICdjYW5vbmljYWwnLCBocmVmOiBjYW5vbmljYWxMaW5rfV19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblNFTy5wcm9wVHlwZXMgPSB7XG4gIHBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGFnZVVyaSAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGFubmVsICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFzc2V0ICAgIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNFTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTG9nZ2VkSW5DaGFubmVsIChuYW1lLCBzaG9ydElkLCBsb25nSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICBzaG9ydElkLFxuICAgICAgbG9uZ0lkLFxuICAgIH0sXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvY2hhbm5lbC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZMaW5rLCB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgTG9nbyBmcm9tICdjb21wb25lbnRzL0xvZ28nO1xuaW1wb3J0IE5hdkJhckNoYW5uZWxEcm9wZG93biBmcm9tICdjb21wb25lbnRzL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24nO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNvbnN0IFZJRVcgPSAnVklFVyc7XG5jb25zdCBMT0dPVVQgPSAnTE9HT1VUJztcblxuY2xhc3MgTmF2QmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hlY2tGb3JMb2dnZWRJblVzZXIgPSB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dvdXRVc2VyID0gdGhpcy5sb2dvdXRVc2VyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3Rpb24gPSB0aGlzLmhhbmRsZVNlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW5cbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyKCk7XG4gIH1cbiAgY2hlY2tGb3JMb2dnZWRJblVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvdXNlcicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGRhdGEuY2hhbm5lbE5hbWUsIGRhdGEuc2hvcnRDaGFubmVsSWQsIGRhdGEuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvdXNlciBlcnJvcjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIGxvZ291dFVzZXIgKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtjcmVkZW50aWFsczogJ2luY2x1ZGUnfTtcbiAgICByZXF1ZXN0KCcvbG9nb3V0JywgcGFyYW1zKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ291dCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcvbG9nb3V0IGVycm9yJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgTE9HT1VUOlxuICAgICAgICB0aGlzLmxvZ291dFVzZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZJRVc6XG4gICAgICAgIC8vIHJlZGlyZWN0IHRvIGNoYW5uZWwgcGFnZVxuICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChgLyR7dGhpcy5wcm9wcy5jaGFubmVsTmFtZX06JHt0aGlzLnByb3BzLmNoYW5uZWxMb25nSWR9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzaXRlRGVzY3JpcHRpb24gfSA9ICB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBuYXYtYmFyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXNob3J0IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tY2VudGVyJz5cbiAgICAgICAgICA8TG9nbyAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1jZW50ZXInPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSduYXYtYmFyLXRhZ2xpbmUnPntzaXRlRGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXYtYmFyLS1yaWdodCc+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy8nIGV4YWN0PlB1Ymxpc2g8L05hdkxpbms+XG4gICAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnICBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvYWJvdXQnPkFib3V0PC9OYXZMaW5rPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxOYW1lID8gKFxuICAgICAgICAgICAgICA8TmF2QmFyQ2hhbm5lbERyb3Bkb3duXG4gICAgICAgICAgICAgICAgY2hhbm5lbE5hbWU9e3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9XG4gICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0aW9uPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0aW9uPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIFZJRVc9e1ZJRVd9XG4gICAgICAgICAgICAgICAgTE9HT1VUPXtMT0dPVVR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TmF2TGluayBpZD0nbmF2LWJhci1sb2dpbi1saW5rJyBjbGFzc05hbWU9J25hdi1iYXItbGluayBsaW5rLS1uYXYnIGFjdGl2ZUNsYXNzTmFtZT0nbGluay0tbmF2LWFjdGl2ZScgdG89Jy9sb2dpbic+Q2hhbm5lbDwvTmF2TGluaz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKE5hdkJhcik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9OYXZCYXIvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxMb2dpbkZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgOiBudWxsLFxuICAgICAgbmFtZSAgICA6ICcnLFxuICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ2luVG9DaGFubmVsID0gdGhpcy5sb2dpblRvQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgbG9naW5Ub0NoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWU6IHRoaXMuc3RhdGUubmFtZSwgcGFzc3dvcmQ6IHRoaXMuc3RhdGUucGFzc3dvcmR9KSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIH0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICB9O1xuICAgIHJlcXVlc3QoJ2xvZ2luJywgcGFyYW1zKVxuICAgICAgLnRoZW4oKHtzdWNjZXNzLCBjaGFubmVsTmFtZSwgc2hvcnRDaGFubmVsSWQsIGNoYW5uZWxDbGFpbUlkLCBtZXNzYWdlfSkgPT4ge1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4oY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbWVzc2FnZX0pO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIGlkPSdjaGFubmVsLWxvZ2luLWZvcm0nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1sb2dpbi1uYW1lLWlucHV0Jz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTYgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20nPlxuICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSduYW1lJyBwbGFjZWhvbGRlcj0nWW91ciBDaGFubmVsIE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxOYW1lfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnID5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5Jz5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBpZD0nY2hhbm5lbC1sb2dpbi1wYXNzd29yZC1pbnB1dCcgbmFtZT0ncGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgcGxhY2Vob2xkZXI9JycgdmFsdWU9e3RoaXMuc3RhdGUuY2hhbm5lbFBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyB0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5zdGF0ZS5lcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkVudGVyIHRoZSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSc+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5sb2dpblRvQ2hhbm5lbH0+QXV0aGVudGljYXRlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbExvZ2luRm9ybTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2dyZXNzQmFyIGZyb20gJ2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENoYW5uZWxDcmVhdGVGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIGNoYW5uZWwgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIHN0YXR1cyAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQgPSB0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVDaGFubmVsID0gdGhpcy5jcmVhdGVDaGFubmVsLmJpbmQodGhpcyk7XG4gIH1cbiAgY2xlYW5zZUNoYW5uZWxJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgaGFuZGxlQ2hhbm5lbElucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUNoYW5uZWxJbnB1dCh2YWx1ZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y2hhbm5lbDogdmFsdWV9KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdQbGVhc2UgZW50ZXIgYSBjaGFubmVsIG5hbWUnfSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtbbmFtZV06IHZhbHVlfSk7XG4gIH1cbiAgdXBkYXRlSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogbnVsbH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7J2Vycm9yJzogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgfSk7XG4gIH1cbiAgY2hlY2tJc0NoYW5uZWxBdmFpbGFibGUgKGNoYW5uZWwpIHtcbiAgICBjb25zdCBjaGFubmVsV2l0aEF0U3ltYm9sID0gYEAke2NoYW5uZWx9YDtcbiAgICByZXR1cm4gcmVxdWVzdChgL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS8ke2NoYW5uZWxXaXRoQXRTeW1ib2x9YCk7XG4gIH1cbiAgY2hlY2tJc1Bhc3N3b3JkUHJvdmlkZWQgKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcGFzc3dvcmQgfHwgcGFzc3dvcmQubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgYSBwYXNzd29yZCcpKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuICBtYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0ICh1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBib2R5ICAgOiBKU09OLnN0cmluZ2lmeSh7dXNlcm5hbWUsIHBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdCgnL3NpZ251cCcsIHBhcmFtcylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFVuZm9ydHVuYXRlbHksIHdlIGVuY291bnRlcmVkIGFuIGVycm9yIHdoaWxlIGNyZWF0aW5nIHlvdXIgY2hhbm5lbC4gUGxlYXNlIGxldCB1cyBrbm93IGluIERpc2NvcmQhICR7ZXJyb3IubWVzc2FnZX1gKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUNoYW5uZWwgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNoZWNrSXNQYXNzd29yZFByb3ZpZGVkKHRoaXMuc3RhdGUucGFzc3dvcmQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrSXNDaGFubmVsQXZhaWxhYmxlKHRoaXMuc3RhdGUuY2hhbm5lbCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6ICdXZSBhcmUgcHVibGlzaGluZyB5b3VyIG5ldyBjaGFubmVsLiAgU2l0IHRpZ2h0Li4uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlUHVibGlzaENoYW5uZWxSZXF1ZXN0KHRoaXMuc3RhdGUuY2hhbm5lbCwgdGhpcy5zdGF0ZS5wYXNzd29yZCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiBudWxsfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25DaGFubmVsTG9naW4ocmVzdWx0LmNoYW5uZWxOYW1lLCByZXN1bHQuc2hvcnRDaGFubmVsSWQsIHJlc3VsdC5jaGFubmVsQ2xhaW1JZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2UsIHN0YXR1czogbnVsbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHsgIXRoaXMuc3RhdGUuc3RhdHVzID8gKFxuICAgICAgICAgIDxmb3JtIGlkPSdwdWJsaXNoLWNoYW5uZWwtZm9ybSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSByb3ctLXNob3J0Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSduZXctY2hhbm5lbC1uYW1lJz5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1sZWZ0LWJvdHRvbSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5APC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J2NoYW5uZWwnIGlkPSduZXctY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPSdleGFtcGxlQ2hhbm5lbE5hbWUnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5uZWxJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICAgIHsgKHRoaXMuc3RhdGUuY2hhbm5lbCAmJiAhdGhpcy5zdGF0ZS5lcnJvcikgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jaGFubmVsLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTYnfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnPlBhc3N3b3JkOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIG5hbWU9J3Bhc3N3b3JkJyBpZD0nbmV3LWNoYW5uZWwtcGFzc3dvcmQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLnBhc3N3b3JkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yID8gKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIG5hbWUgYW5kIHBhc3N3b3JkIGZvciB5b3VyIGNoYW5uZWw8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5JyBvbkNsaWNrPXt0aGlzLmNyZWF0ZUNoYW5uZWx9PkNyZWF0ZSBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+e3RoaXMuc3RhdGUuc3RhdHVzfTwvcD5cbiAgICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbENyZWF0ZUZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgU2hvd0Fzc2V0TGl0ZSBmcm9tICdjb250YWluZXJzL1Nob3dBc3NldExpdGUnO1xuaW1wb3J0IFNob3dBc3NldERldGFpbHMgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzJztcbmltcG9ydCBTaG93Q2hhbm5lbCBmcm9tICdjb250YWluZXJzL1Nob3dDaGFubmVsJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG5jbGFzcyBTaG93UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSGFuZGxlU2hvd1BhZ2VVcmkodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMubWF0Y2gucGFyYW1zICE9PSB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcykge1xuICAgICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKG5leHRQcm9wcy5tYXRjaC5wYXJhbXMpO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgZXJyb3IsIHJlcXVlc3RUeXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEVycm9yUGFnZSBlcnJvcj17ZXJyb3J9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICBzd2l0Y2ggKHJlcXVlc3RUeXBlKSB7XG4gICAgICBjYXNlIENIQU5ORUw6XG4gICAgICAgIHJldHVybiA8U2hvd0NoYW5uZWwgLz47XG4gICAgICBjYXNlIEFTU0VUX0xJVEU6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0TGl0ZSAvPjtcbiAgICAgIGNhc2UgQVNTRVRfREVUQUlMUzpcbiAgICAgICAgcmV0dXJuIDxTaG93QXNzZXREZXRhaWxzIC8+O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDxwPmxvYWRpbmcuLi48L3A+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd1BhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2Uvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcblxuY2xhc3MgU2hvd0xpdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXIgc2hvdy1saXRlLWNvbnRhaW5lcic+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e25hbWV9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8QXNzZXREaXNwbGF5IC8+XG4gICAgICAgICAgPExpbmsgaWQ9J2Fzc2V0LWJvaWxlcnBhdGUnIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeSBmaW5lLXByaW50JyB0bz17YC8ke2NsYWltSWR9LyR7bmFtZX1gfT5ob3N0ZWRcbiAgICAgICAgICAgIHZpYSBTcGVlLmNoPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHA+bG9hZGluZyBhc3NldCBkYXRhLi4uPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0xpdGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXRMaXRlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBVTkFWQUlMQUJMRSwgRVJST1IsIEFWQUlMQUJMRSB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNsYXNzIEFzc2V0RGlzcGxheSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnByb3BzLm9uRmlsZVJlcXVlc3QobmFtZSwgY2xhaW1JZCk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IHN0YXR1cywgZXJyb3IsIGFzc2V0OiB7IGNsYWltRGF0YTogeyBuYW1lLCBjbGFpbUlkLCBjb250ZW50VHlwZSwgZmlsZUV4dCwgdGh1bWJuYWlsIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD0nYXNzZXQtZGlzcGxheS1jb21wb25lbnQnPlxuICAgICAgICB7KHN0YXR1cyA9PT0gTE9DQUxfQ0hFQ0spICYmXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+Q2hlY2tpbmcgdG8gc2VlIGlmIFNwZWUuY2ggaGFzIHlvdXIgYXNzZXQgbG9jYWxseS4uLjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IFVOQVZBSUxBQkxFKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlNpdCB0aWdodCwgd2UncmUgc2VhcmNoaW5nIHRoZSBMQlJZIGJsb2NrY2hhaW4gZm9yIHlvdXIgYXNzZXQhPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEVSUk9SKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPlVuZm9ydHVuYXRlbHksIHdlIGNvdWxkbid0IGRvd25sb2FkIHlvdXIgYXNzZXQgZnJvbSBMQlJZLiAgWW91IGNhbiBoZWxwIHVzIG91dCBieSBzaGFyaW5nIHRoZSBiZWxvdyBlcnJvciBtZXNzYWdlIGluIHRoZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZGlzY29yZC5nZy9Zallid2hTJyB0YXJnZXQ9J19ibGFuayc+TEJSWSBkaXNjb3JkPC9hPi48L3A+XG4gICAgICAgICAgPGk+PHAgaWQ9J2Vycm9yLW1lc3NhZ2UnPntlcnJvcn08L3A+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7KHN0YXR1cyA9PT0gQVZBSUxBQkxFKSAmJlxuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdhc3NldCdcbiAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9IC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDx2aWRlbyBjbGFzc05hbWU9J2Fzc2V0IHZpZGVvJyBjb250cm9scyBwb3N0ZXI9e3RodW1ibmFpbH0+XG4gICAgICAgICAgICAgICAgICA8c291cmNlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YC8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHA+WW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIDxjb2RlPnZpZGVvPC9jb2RlPiBlbGVtZW50LjwvcD5cbiAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD5VbnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0RGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0RGlzcGxheS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IEFzc2V0VGl0bGUgZnJvbSAnY29udGFpbmVycy9Bc3NldFRpdGxlJztcbmltcG9ydCBBc3NldERpc3BsYXkgZnJvbSAnY29udGFpbmVycy9Bc3NldERpc3BsYXknO1xuaW1wb3J0IEFzc2V0SW5mbyBmcm9tICdjb250YWluZXJzL0Fzc2V0SW5mbyc7XG5cbmNsYXNzIFNob3dBc3NldERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICBjb25zdCB7IGNsYWltRGF0YTogeyBuYW1lIH0gfSA9IGFzc2V0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17YCR7bmFtZX0gLSBkZXRhaWxzYH0gYXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8QXNzZXRUaXRsZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgc2hvdy1kZXRhaWxzLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICAgICAgPEFzc2V0SW5mbyAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPEVycm9yUGFnZSBlcnJvcj17J2xvYWRpbmcgYXNzZXQgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0Fzc2V0RGV0YWlscztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBc3NldFRpdGxlID0gKHsgdGl0bGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQtLWxhcmdlJz57dGl0bGV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRUaXRsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Fzc2V0VGl0bGUvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jbGFzcyBBc3NldEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5jb3B5VG9DbGlwYm9hcmQgPSB0aGlzLmNvcHlUb0NsaXBib2FyZC5iaW5kKHRoaXMpO1xuICB9XG4gIGNvcHlUb0NsaXBib2FyZCAoZXZlbnQpIHtcbiAgICB2YXIgZWxlbWVudFRvQ29weSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmVsZW1lbnR0b2NvcHk7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Db3B5KTtcbiAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ICdPb3BzLCB1bmFibGUgdG8gY29weSd9KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0OiB7IHNob3J0SWQsIGNsYWltRGF0YSA6IHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIGRlc2NyaXB0aW9uLCBuYW1lLCBjbGFpbUlkLCBmaWxlRXh0LCBjb250ZW50VHlwZSwgdGh1bWJuYWlsLCBob3N0IH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2NoYW5uZWxOYW1lICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkNoYW5uZWw6PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+PExpbmsgdG89e2AvJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfWB9PntjaGFubmVsTmFtZX08L0xpbms+PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIHtkZXNjcmlwdGlvbiAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz57ZGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuXG4gICAgICAgIDxkaXYgaWQ9J3Nob3ctc2hhcmUtYnV0dG9ucyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPlNoYXJlOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20gZmxleC1jb250YWluZXItLXdyYXAnPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9e2BodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD90ZXh0PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+dHdpdHRlcjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT5mYWNlYm9vazwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cDovL3R1bWJsci5jb20vd2lkZ2V0cy9zaGFyZS90b29sP2Nhbm9uaWNhbFVybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR1bWJscjwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zdWJtaXQ/dXJsPSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9JnRpdGxlPSR7bmFtZX1gfT5yZWRkaXQ8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LXNob3J0LWxpbmsnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkxpbms6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktc2hvcnQtbGluaycgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3Nob3J0LWxpbmsnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtgJHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xJyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS13aWRlJyBkYXRhLWVsZW1lbnR0b2NvcHk9J3Nob3J0LWxpbmsnXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuY29weVRvQ2xpcGJvYXJkfT5jb3B5XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgaWQ9J3Nob3ctZW1iZWQtY29kZSc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMiBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+RW1iZWQ6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC1lcnJvcicgaWQ9J2lucHV0LWVycm9yLWNvcHktZW1iZWQtdGV4dCcgaGlkZGVuPSd0cnVlJz5lcnJvciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgICAgICB7KGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JykgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDx2aWRlbyB3aWR0aD1cIjEwMCVcIiBjb250cm9scyBwb3N0ZXI9XCIke3RodW1ibmFpbH1cIiBzcmM9XCIke2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9XCIvPjwvdmlkZW8+YH0gLz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nZW1iZWQtdGV4dCcgY2xhc3NOYW1lPSdpbnB1dC1kaXNhYmxlZCBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0fSBzcGVsbENoZWNrPSdmYWxzZSdcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YDxpbWcgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz5gfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdlbWJlZC10ZXh0J1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWJvdHRvbSc+XG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0bz17YC8ke3Nob3J0SWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9PjxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9J3RleHQnPkRpcmVjdCBMaW5rPC9zcGFuPjwvTGluaz5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9e2Ake2hvc3R9LyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH0gZG93bmxvYWQ9e25hbWV9PkRvd25sb2FkPC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9kbWNhJz5SZXBvcnQ8L2E+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldEluZm87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgRXJyb3JQYWdlIGZyb20gJ3BhZ2VzL0Vycm9yUGFnZSc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBDaGFubmVsQ2xhaW1zRGlzcGxheSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5JztcblxuY2xhc3MgU2hvd0NoYW5uZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBsb25nSWQsIHNob3J0SWQgfSA9IGNoYW5uZWw7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBjaGFubmVsPXtjaGFubmVsfSAvPlxuICAgICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgICAgICA8aDI+Y2hhbm5lbCBuYW1lOiB7bmFtZX08L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9eydmaW5lLXByaW50J30+ZnVsbCBjaGFubmVsIGlkOiB7bG9uZ0lkfTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PnNob3J0IGNoYW5uZWwgaWQ6IHtzaG9ydElkfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDbGFpbXNEaXNwbGF5IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGNoYW5uZWwgZGF0YS4uLid9IC8+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd0NoYW5uZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXNzZXRQcmV2aWV3IGZyb20gJ2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3JztcblxuY2xhc3MgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlID0gdGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UuYmluZCh0aGlzKTtcbiAgfVxuICBzaG93UHJldmlvdXNSZXN1bHRzUGFnZSAoKSB7XG4gICAgY29uc3QgeyBjaGFubmVsOiB7IGNsYWltc0RhdGE6IHsgY3VycmVudFBhZ2UgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSAtIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShwcmV2aW91c1BhZ2UpO1xuICB9XG4gIHNob3dOZXh0UmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIDE7XG4gICAgdGhpcy5zaG93TmV3UGFnZShuZXh0UGFnZSk7XG4gIH1cbiAgc2hvd05ld1BhZ2UgKHBhZ2UpIHtcbiAgICBjb25zdCB7IGNoYW5uZWxLZXksIGNoYW5uZWw6IHsgbmFtZSwgbG9uZ0lkIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vblVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGNsYWltcywgY3VycmVudFBhZ2UsIHRvdGFsUGFnZXMgfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCc+XG4gICAgICAgIHsoY2xhaW1zLmxlbmd0aCA+IDApID8gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7Y2xhaW1zLm1hcCgoY2xhaW0sIGluZGV4KSA9PiA8QXNzZXRQcmV2aWV3XG4gICAgICAgICAgICAgIGNsYWltRGF0YT17Y2xhaW19XG4gICAgICAgICAgICAgIGtleT17YCR7Y2xhaW0ubmFtZX0tJHtpbmRleH1gfVxuICAgICAgICAgICAgLz4pfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA+IDEpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlfT5QcmV2aW91cyBQYWdlPC9idXR0b24+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgeyhjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMpICYmXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsnYnV0dG9uLS1zZWNvbmRhcnknfSBvbkNsaWNrPXt0aGlzLnNob3dOZXh0UmVzdWx0c1BhZ2V9Pk5leHQgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cD5UaGVyZSBhcmUgbm8gY2xhaW1zIGluIHRoaXMgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDbGFpbXNEaXNwbGF5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jb25zdCBBc3NldFByZXZpZXcgPSAoeyBkZWZhdWx0VGh1bWJuYWlsLCBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgZmlsZUV4dCwgY29udGVudFR5cGUsIHRodW1ibmFpbCB9IH0pID0+IHtcbiAgY29uc3QgZGlyZWN0U291cmNlTGluayA9IGAke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWA7XG4gIGNvbnN0IHNob3dVcmxMaW5rID0gYC8ke2NsYWltSWR9LyR7bmFtZX1gO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdhc3NldC1ob2xkZXInPlxuICAgICAgPExpbmsgdG89e3Nob3dVcmxMaW5rfSA+XG4gICAgICAgIHsoKCkgPT4ge1xuICAgICAgICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcnfVxuICAgICAgICAgICAgICAgICAgc3JjPXtkaXJlY3RTb3VyY2VMaW5rfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2Fzc2V0LXByZXZpZXcgdmlkZW8nfVxuICAgICAgICAgICAgICAgICAgc3JjPXt0aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8cD51bnN1cHBvcnRlZCBmaWxlIHR5cGU8L3A+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpfVxuICAgICAgPC9MaW5rPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRQcmV2aWV3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jbGFzcyBGb3VyT2hGb3JQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7dGl0bGUsIGhvc3R9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICA8dGl0bGU+e3RpdGxlfSAtIDQwNDwvdGl0bGU+XG4gICAgICAgICAgPGxpbmsgcmVsPSdjYW5vbmljYWwnIGhyZWY9e2Ake2hvc3R9LzQwNGB9IC8+XG4gICAgICAgIDwvSGVsbWV0PlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxoMj40MDQ8L2gyPlxuICAgICAgICAgIDxwPlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGb3VyT2hGb3JQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2Uvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hEZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMnO1xuaW1wb3J0IFB1Ymxpc2hTdGF0dXMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoU3RhdHVzJztcbmltcG9ydCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZSc7XG5cbmNsYXNzIFB1Ymxpc2hUb29sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2ggaXMgZGlzYWJsZWQnKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygncHVibGlzaCBpcyBub3QgZGlzYWJsZWQnKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQdWJsaXNoU3RhdHVzIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gPFB1Ymxpc2hEZXRhaWxzIC8+O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gPERyb3B6b25lIC8+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRvb2w7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB2YWxpZGF0ZUZpbGUgfSBmcm9tICd1dGlscy9maWxlJztcbmltcG9ydCBQdWJsaXNoUHJldmlldyBmcm9tICdjb21wb25lbnRzL1B1Ymxpc2hQcmV2aWV3JztcblxuY2xhc3MgRHJvcHpvbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRyYWdPdmVyICA6IGZhbHNlLFxuICAgICAgbW91c2VPdmVyIDogZmFsc2UsXG4gICAgICBkaW1QcmV2aWV3OiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlRHJvcCA9IHRoaXMuaGFuZGxlRHJvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ092ZXIgPSB0aGlzLmhhbmRsZURyYWdPdmVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW5kID0gdGhpcy5oYW5kbGVEcmFnRW5kLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEcmFnRW50ZXIgPSB0aGlzLmhhbmRsZURyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0xlYXZlID0gdGhpcy5oYW5kbGVEcmFnTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRW50ZXIgPSB0aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlTGVhdmUgPSB0aGlzLmhhbmRsZU1vdXNlTGVhdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRmlsZUlucHV0ID0gdGhpcy5oYW5kbGVGaWxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNob29zZUZpbGUgPSB0aGlzLmNob29zZUZpbGUuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVEcm9wIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlfSk7XG4gICAgLy8gaWYgZHJvcHBlZCBpdGVtcyBhcmVuJ3QgZmlsZXMsIHJlamVjdCB0aGVtXG4gICAgY29uc3QgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBpZiAoZHQuaXRlbXNbMF0ua2luZCA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwZWRGaWxlID0gZHQuaXRlbXNbMF0uZ2V0QXNGaWxlKCk7XG4gICAgICAgIHRoaXMuY2hvb3NlRmlsZShkcm9wcGVkRmlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGhhbmRsZURyYWdPdmVyIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaGFuZGxlRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICB2YXIgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgaWYgKGR0Lml0ZW1zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGR0Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGR0Lml0ZW1zLnJlbW92ZShpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmNsZWFyRGF0YSgpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlRHJhZ0xlYXZlICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VFbnRlciAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiB0cnVlLCBkaW1QcmV2aWV3OiB0cnVlfSk7XG4gIH1cbiAgaGFuZGxlTW91c2VMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bW91c2VPdmVyOiBmYWxzZSwgZGltUHJldmlldzogZmFsc2V9KTtcbiAgfVxuICBoYW5kbGVDbGljayAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlX2lucHV0JykuY2xpY2soKTtcbiAgfVxuICBoYW5kbGVGaWxlSW5wdXQgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBmaWxlTGlzdCA9IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICB0aGlzLmNob29zZUZpbGUoZmlsZUxpc3RbMF0pO1xuICB9XG4gIGNob29zZUZpbGUgKGZpbGUpIHtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsaWRhdGVGaWxlKGZpbGUpOyAvLyB2YWxpZGF0ZSB0aGUgZmlsZSdzIG5hbWUsIHR5cGUsIGFuZCBzaXplXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZXRGaWxlRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICAvLyBzdGFnZSBpdCBzbyBpdCB3aWxsIGJlIHJlYWR5IHdoZW4gdGhlIHB1Ymxpc2ggYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgIHRoaXMucHJvcHMuc2VsZWN0RmlsZShmaWxlKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbic+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J2lucHV0LWZpbGUnIHR5cGU9J2ZpbGUnIGlkPSdmaWxlX2lucHV0JyBuYW1lPSdmaWxlX2lucHV0JyBhY2NlcHQ9J3ZpZGVvLyosaW1hZ2UvKicgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsZUlucHV0fSBlbmNUeXBlPSdtdWx0aXBhcnQvZm9ybS1kYXRhJyAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxkaXYgaWQ9J3ByZXZpZXctZHJvcHpvbmUnIGNsYXNzTmFtZT17J3JvdyByb3ctLXBhZGRlZCByb3ctLXRhbGwgZHJvcHpvbmUnICsgKHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAnIGRyb3B6b25lLS1kcmFnLW92ZXInIDogJycpfSBvbkRyb3A9e3RoaXMuaGFuZGxlRHJvcH0gb25EcmFnT3Zlcj17dGhpcy5oYW5kbGVEcmFnT3Zlcn0gb25EcmFnRW5kPXt0aGlzLmhhbmRsZURyYWdFbmR9IG9uRHJhZ0VudGVyPXt0aGlzLmhhbmRsZURyYWdFbnRlcn0gb25EcmFnTGVhdmU9e3RoaXMuaGFuZGxlRHJhZ0xlYXZlfSBvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn0gb25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmZpbGUgPyAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8UHVibGlzaFByZXZpZXdcbiAgICAgICAgICAgICAgICBkaW1QcmV2aWV3PXt0aGlzLnN0YXRlLmRpbVByZXZpZXd9XG4gICAgICAgICAgICAgICAgZmlsZT17dGhpcy5wcm9wcy5maWxlfVxuICAgICAgICAgICAgICAgIHRodW1ibmFpbD17dGhpcy5wcm9wcy50aHVtYm5haWx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLXRleHQtaG9sZGVyJyBjbGFzc05hbWU9eydmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJ30+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPkRyb3AgaXQuPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5tb3VzZU92ZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS1wbGFjZWhvbGRlciBpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnIGlkPSdpbnB1dC1lcnJvci1maWxlLXNlbGVjdGlvbic+e3RoaXMucHJvcHMuZmlsZUVycm9yfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUtLXVuZGVybGluZWQnPkNIT09TRSBGSUxFPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZHJhZ092ZXIgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtZHJhZ292ZXInPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS1pbnN0cnVjdGlvbnMnPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICA8cD5EcmFnICYgZHJvcCBpbWFnZSBvciB2aWRlbyBoZXJlIHRvIHB1Ymxpc2g8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPk9SPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcHpvbmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Ecm9wem9uZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgRHJvcHpvbmUgZnJvbSAnY29udGFpbmVycy9Ecm9wem9uZSc7XG5pbXBvcnQgUHVibGlzaFRpdGxlSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGl0bGVJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFVybElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0JztcbmltcG9ydCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hNZXRhZGF0YUlucHV0cyBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hNZXRhZGF0YUlucHV0cyc7XG5pbXBvcnQgQ2hhbm5lbFNlbGVjdCBmcm9tICdjb250YWluZXJzL0NoYW5uZWxTZWxlY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMub25QdWJsaXNoU3VibWl0ID0gdGhpcy5vblB1Ymxpc2hTdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuICBvblB1Ymxpc2hTdWJtaXQgKCkge1xuICAgIHRoaXMucHJvcHMuc3RhcnRQdWJsaXNoKHRoaXMucHJvcHMuaGlzdG9yeSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLWJvdHRvbSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgPFB1Ymxpc2hUaXRsZUlucHV0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogbGVmdCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwJyA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8RHJvcHpvbmUgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvKiByaWdodCBjb2x1bW4gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tc21sLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICA8ZGl2IGlkPSdwdWJsaXNoLWFjdGl2ZS1hcmVhJyBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoVXJsSW5wdXQgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8Q2hhbm5lbFNlbGVjdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLmZpbGUudHlwZSA9PT0gJ3ZpZGVvL21wNCcpICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUgJz5cbiAgICAgICAgICAgICAgICA8UHVibGlzaFRodW1ibmFpbElucHV0IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS1uby1ib3R0b20gcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hNZXRhZGF0YUlucHV0cyAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0td2lkZSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gaWQ9J3B1Ymxpc2gtc3VibWl0JyBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLWxhcmdlJyBvbkNsaWNrPXt0aGlzLm9uUHVibGlzaFN1Ym1pdH0+UHVibGlzaDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tYm90dG9tIGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tY2FuY2VsJyBvbkNsaWNrPXt0aGlzLnByb3BzLmNsZWFyRmlsZX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1zaG9ydCBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nZmluZS1wcmludCc+QnkgY2xpY2tpbmcgJ1B1Ymxpc2gnLCB5b3UgYWZmaXJtIHRoYXQgeW91IGhhdmUgdGhlIHJpZ2h0cyB0byBwdWJsaXNoIHRoaXMgY29udGVudCB0byB0aGUgTEJSWSBuZXR3b3JrLCBhbmQgdGhhdCB5b3UgdW5kZXJzdGFuZCB0aGUgcHJvcGVydGllcyBvZiBwdWJsaXNoaW5nIGl0IHRvIGEgZGVjZW50cmFsaXplZCwgdXNlci1jb250cm9sbGVkIG5ldHdvcmsuIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9sZWFybic+UmVhZCBtb3JlLjwvYT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKFB1Ymxpc2hEZXRhaWxzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHVibGlzaFRpdGxlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZSkge1xuICAgIGNvbnN0IG5hbWUgPSBlLnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHZhbHVlKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J3B1Ymxpc2gtdGl0bGUnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCB0ZXh0LS1sYXJnZSBpbnB1dC10ZXh0LS1mdWxsLXdpZHRoJyBuYW1lPSd0aXRsZScgcGxhY2Vob2xkZXI9J0dpdmUgeW91ciBwb3N0IGEgdGl0bGUuLi4nIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSB2YWx1ZT17dGhpcy5wcm9wcy50aXRsZX0gLz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hUaXRsZUlucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAndXRpbHMvcmVxdWVzdCc7XG5pbXBvcnQgVXJsTWlkZGxlIGZyb20gJ2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXknO1xuXG5jbGFzcyBQdWJsaXNoVXJsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBjbGFpbSwgZmlsZU5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjbGFpbSkge1xuICAgICAgdGhpcy5zZXRDbGFpbU5hbWUoZmlsZU5hbWUpO1xuICAgIH1cbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzICh7IGNsYWltLCBmaWxlTmFtZSB9KSB7XG4gICAgLy8gaWYgYSBuZXcgZmlsZSB3YXMgY2hvc2VuLCB1cGRhdGUgdGhlIGNsYWltIG5hbWVcbiAgICBpZiAoZmlsZU5hbWUgIT09IHRoaXMucHJvcHMuZmlsZU5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldENsYWltTmFtZShmaWxlTmFtZSk7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBjbGFpbSBoYXMgdXBkYXRlZCwgY2hlY2sgaXRzIGF2YWlsYWJpbGl0eVxuICAgIGlmIChjbGFpbSAhPT0gdGhpcy5wcm9wcy5jbGFpbSkge1xuICAgICAgdGhpcy52YWxpZGF0ZUNsYWltKGNsYWltKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHZhbHVlID0gdGhpcy5jbGVhbnNlSW5wdXQodmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICB0aGlzLnByb3BzLm9uQ2xhaW1DaGFuZ2UodmFsdWUpO1xuICB9XG4gIGNsZWFuc2VJbnB1dCAoaW5wdXQpIHtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccysvZywgJy0nKTsgLy8gcmVwbGFjZSBzcGFjZXMgd2l0aCBkYXNoZXNcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05LV0vZywgJycpOyAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCBvciAnLSdcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbiAgc2V0Q2xhaW1OYW1lIChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lV2l0aG91dEVuZGluZyA9IGZpbGVOYW1lLnN1YnN0cmluZygwLCBmaWxlTmFtZS5sYXN0SW5kZXhPZignLicpKTtcbiAgICBjb25zdCBjbGVhbkNsYWltTmFtZSA9IHRoaXMuY2xlYW5zZUlucHV0KGZpbGVOYW1lV2l0aG91dEVuZGluZyk7XG4gICAgdGhpcy5wcm9wcy5vbkNsYWltQ2hhbmdlKGNsZWFuQ2xhaW1OYW1lKTtcbiAgfVxuICB2YWxpZGF0ZUNsYWltIChjbGFpbSkge1xuICAgIGlmICghY2xhaW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uVXJsRXJyb3IoJ0VudGVyIGEgdXJsIGFib3ZlJyk7XG4gICAgfVxuICAgIHJlcXVlc3QoYC9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LyR7Y2xhaW19YClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKG51bGwpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblVybEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNsYWltLCBsb2dnZWRJbkNoYW5uZWxOYW1lLCBsb2dnZWRJbkNoYW5uZWxTaG9ydElkLCBwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIHVybEVycm9yIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSBzcGFuLS1yZWxhdGl2ZSc+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd1cmwtdGV4dC0tc2Vjb25kYXJ5Jz5zcGVlLmNoIC8gPC9zcGFuPlxuICAgICAgICAgIDxVcmxNaWRkbGVcbiAgICAgICAgICAgIHB1Ymxpc2hJbkNoYW5uZWw9e3B1Ymxpc2hJbkNoYW5uZWx9XG4gICAgICAgICAgICBzZWxlY3RlZENoYW5uZWw9e3NlbGVjdGVkQ2hhbm5lbH1cbiAgICAgICAgICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWU9e2xvZ2dlZEluQ2hhbm5lbE5hbWV9XG4gICAgICAgICAgICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkPXtsb2dnZWRJbkNoYW5uZWxTaG9ydElkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjbGFpbS1uYW1lLWlucHV0JyBjbGFzc05hbWU9J2lucHV0LXRleHQnIG5hbWU9J2NsYWltJyBwbGFjZWhvbGRlcj0neW91ci11cmwtaGVyZScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IHZhbHVlPXtjbGFpbX0gLz5cbiAgICAgICAgICB7IChjbGFpbSAmJiAhdXJsRXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNsYWltLW5hbWUnIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1zdWNjZXNzIHNwYW4tLWFic29sdXRlJz57J1xcdTI3MTMnfTwvc3Bhbj4gfVxuICAgICAgICAgIHsgdXJsRXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgeyB1cmxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGlkPSdpbnB1dC1lcnJvci1jbGFpbS1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3VybEVycm9yfTwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPkNob29zZSBhIGN1c3RvbSB1cmw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hVcmxJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIGRhdGFVUkl0b0Jsb2IoZGF0YVVSSSkge1xuICAvLyBjb252ZXJ0IGJhc2U2NC9VUkxFbmNvZGVkIGRhdGEgY29tcG9uZW50IHRvIHJhdyBiaW5hcnkgZGF0YSBoZWxkIGluIGEgc3RyaW5nXG4gIGxldCBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG4gIGxldCBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcbiAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYSB0eXBlZCBhcnJheVxuICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShieXRlU3RyaW5nLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBuZXcgQmxvYihbaWFdLCB7dHlwZTogbWltZVN0cmluZ30pO1xufVxuXG5jbGFzcyBQdWJsaXNoVGh1bWJuYWlsSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpZGVvU291cmNlICAgOiBudWxsLFxuICAgICAgZXJyb3IgICAgICAgICA6IG51bGwsXG4gICAgICBzbGlkZXJNaW5SYW5nZTogMSxcbiAgICAgIHNsaWRlck1heFJhbmdlOiBudWxsLFxuICAgICAgc2xpZGVyVmFsdWUgICA6IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YSA9IHRoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2UgPSB0aGlzLmhhbmRsZVNsaWRlckNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlsID0gdGhpcy5jcmVhdGVUaHVtYm5haWwuYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBmaWxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuc2V0VmlkZW9Tb3VyY2UoZmlsZSk7XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgLy8gaWYgZmlsZSBjaGFuZ2VzXG4gICAgaWYgKG5leHRQcm9wcy5maWxlICYmIG5leHRQcm9wcy5maWxlICE9PSB0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgIGNvbnN0IHsgZmlsZSB9ID0gbmV4dFByb3BzO1xuICAgICAgdGhpcy5zZXRWaWRlb1NvdXJjZShmaWxlKTtcbiAgICB9O1xuICB9XG4gIHNldFZpZGVvU291cmNlIChmaWxlKSB7XG4gICAgY29uc3QgcHJldmlld1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcHJldmlld1JlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIHByZXZpZXdSZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YVVyaSA9IHByZXZpZXdSZWFkZXIucmVzdWx0O1xuICAgICAgY29uc3QgYmxvYiA9IGRhdGFVUkl0b0Jsb2IoZGF0YVVyaSk7XG4gICAgICBjb25zdCB2aWRlb1NvdXJjZSA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmlkZW9Tb3VyY2UgfSk7XG4gICAgfTtcbiAgfVxuICBoYW5kbGVWaWRlb0xvYWRlZERhdGEgKGV2ZW50KSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBldmVudC50YXJnZXQuZHVyYXRpb247XG4gICAgY29uc3QgdG90YWxNaW51dGVzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIDYwKTtcbiAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKGR1cmF0aW9uICUgNjApO1xuICAgIC8vIHNldCB0aGUgc2xpZGVyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJNYXhSYW5nZTogZHVyYXRpb24gKiAxMDAsXG4gICAgICBzbGlkZXJWYWx1ZSAgIDogZHVyYXRpb24gKiAxMDAgLyAyLFxuICAgICAgdG90YWxNaW51dGVzLFxuICAgICAgdG90YWxTZWNvbmRzLFxuICAgIH0pO1xuICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlb1xuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IGR1cmF0aW9uIC8gMjtcbiAgfVxuICBoYW5kbGVTbGlkZXJDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpO1xuICAgIC8vIHVwZGF0ZSB0aGUgc2xpZGVyIHZhbHVlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzbGlkZXJWYWx1ZTogdmFsdWUsXG4gICAgfSk7XG4gICAgLy8gdXBkYXRlIHRoZSBjdXJyZW50IHRpbWUgb2YgdGhlIHZpZGVvXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gdmFsdWUgLyAxMDA7XG4gIH1cbiAgY3JlYXRlVGh1bWJuYWlsICgpIHtcbiAgICAvLyB0YWtlIGEgc25hcHNob3RcbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuICAgIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIGNvbnN0IGJsb2IgPSBkYXRhVVJJdG9CbG9iKGRhdGFVcmwpO1xuICAgIGNvbnN0IHNuYXBzaG90ID0gbmV3IEZpbGUoW2Jsb2JdLCBgdGh1bWJuYWlsLnBuZ2AsIHtcbiAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgIH0pO1xuICAgIC8vIHNldCB0aGUgdGh1bWJuYWlsIGluIHJlZHV4IHN0b3JlXG4gICAgaWYgKHNuYXBzaG90KSB7XG4gICAgICB0aGlzLnByb3BzLm9uTmV3VGh1bWJuYWlsKHNuYXBzaG90KTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCB2aWRlb1NvdXJjZSwgc2xpZGVyTWluUmFuZ2UsIHNsaWRlck1heFJhbmdlLCBzbGlkZXJWYWx1ZSwgdG90YWxNaW51dGVzLCB0b3RhbFNlY29uZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJz5UaHVtYm5haWw6PC9sYWJlbD5cbiAgICAgICAgPHZpZGVvXG4gICAgICAgICAgaWQ9J3ZpZGVvLXRodW1iLXBsYXllcidcbiAgICAgICAgICBwcmVsb2FkPSdtZXRhZGF0YSdcbiAgICAgICAgICBtdXRlZFxuICAgICAgICAgIHN0eWxlPXt7ZGlzcGxheTogJ25vbmUnfX1cbiAgICAgICAgICBwbGF5c0lubGluZVxuICAgICAgICAgIG9uTG9hZGVkRGF0YT17dGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGF9XG4gICAgICAgICAgc3JjPXt2aWRlb1NvdXJjZX1cbiAgICAgICAgICBvblNlZWtlZD17dGhpcy5jcmVhdGVUaHVtYm5haWx9XG4gICAgICAgIC8+XG4gICAgICAgIHtcbiAgICAgICAgICBzbGlkZXJWYWx1ZSA/IChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcicgc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPjAnMDBcIjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+e3RvdGFsTWludXRlc30ne3RvdGFsU2Vjb25kc31cIjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPSdyYW5nZSdcbiAgICAgICAgICAgICAgICAgIG1pbj17c2xpZGVyTWluUmFuZ2V9XG4gICAgICAgICAgICAgICAgICBtYXg9e3NsaWRlck1heFJhbmdlfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3NsaWRlclZhbHVlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdzbGlkZXInXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnID5sb2FkaW5nLi4uIDwvcD5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgeyBlcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e2Vycm9yfTwvcD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+VXNlIHNsaWRlciB0byBzZXQgdGh1bWJuYWlsPC9wPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGh1bWJuYWlsSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEV4cGFuZGluZ1RleHRBcmVhIGZyb20gJ2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEnO1xuXG5jbGFzcyBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy50b2dnbGVTaG93SW5wdXRzID0gdGhpcy50b2dnbGVTaG93SW5wdXRzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVJbnB1dCA9IHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdCA9IHRoaXMuaGFuZGxlU2VsZWN0LmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlU2hvd0lucHV0cyAoKSB7XG4gICAgdGhpcy5wcm9wcy5vblRvZ2dsZU1ldGFkYXRhSW5wdXRzKCF0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgPyB0YXJnZXQuY2hlY2tlZCA6IHRhcmdldC52YWx1ZTtcbiAgICBjb25zdCBuYW1lID0gdGFyZ2V0Lm5hbWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHZhbHVlKTtcbiAgfVxuICBoYW5kbGVTZWxlY3QgKGV2ZW50KSB7XG4gICAgY29uc3QgbmFtZSA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uTWV0YWRhdGFDaGFuZ2UobmFtZSwgc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J3B1Ymxpc2gtZGV0YWlscycgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAge3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5EZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPEV4cGFuZGluZ1RleHRBcmVhXG4gICAgICAgICAgICAgICAgICBpZD0ncHVibGlzaC1kZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndGV4dGFyZWEgdGV4dGFyZWEtLXByaW1hcnkgdGV4dGFyZWEtLWZ1bGwtd2lkdGgnXG4gICAgICAgICAgICAgICAgICByb3dzPXsxfVxuICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyMDAwfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWF4SGVpZ2h0OiAyMDAgfX1cbiAgICAgICAgICAgICAgICAgIG5hbWU9J2Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J09wdGlvbmFsIGRlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J2xhYmVsJz5MaWNlbnNlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIG5hbWU9J2xpY2Vuc2UnIGlkPSdwdWJsaXNoLWxpY2Vuc2UnIGNsYXNzTmFtZT0nc2VsZWN0IHNlbGVjdC0tcHJpbWFyeScgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0fT5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9JyAnPlVuc3BlY2lmaWVkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdQdWJsaWMgRG9tYWluJz5QdWJsaWMgRG9tYWluPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdDcmVhdGl2ZSBDb21tb25zJz5DcmVhdGl2ZSBDb21tb25zPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbnNmdycgY2xhc3NOYW1lPSdsYWJlbCc+TWF0dXJlOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1jaGVja2JveCcgdHlwZT0nY2hlY2tib3gnIGlkPSdwdWJsaXNoLW5zZncnIG5hbWU9J25zZncnIHZhbHVlPXt0aGlzLnByb3BzLm5zZnd9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1zZWNvbmRhcnknIG9uQ2xpY2s9e3RoaXMudG9nZ2xlU2hvd0lucHV0c30+e3RoaXMucHJvcHMuc2hvd01ldGFkYXRhSW5wdXRzID8gJ2xlc3MnIDogJ21vcmUnfTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoTWV0YWRhdGFJbnB1dHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcbmltcG9ydCAqIGFzIHN0YXRlcyBmcm9tICdjb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMnO1xuXG5jbGFzcyBDaGFubmVsU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaCA9IHRoaXMudG9nZ2xlQW5vbnltb3VzUHVibGlzaC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICB0b2dnbGVBbm9ueW1vdXNQdWJsaXNoIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gJ2Fub255bW91cycpIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5vblB1Ymxpc2hJbkNoYW5uZWxDaGFuZ2UodHJ1ZSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZVNlbGVjdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxTZWxlY3Qoc2VsZWN0ZWRPcHRpb24pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdhbm9ueW1vdXMtcmFkaW8nIGNsYXNzTmFtZT0naW5wdXQtcmFkaW8nIHZhbHVlPSdhbm9ueW1vdXMnIGNoZWNrZWQ9eyF0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nYW5vbnltb3VzLXJhZGlvJz5Bbm9ueW1vdXM8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdyYWRpbycgbmFtZT0nYW5vbnltb3VzLW9yLWNoYW5uZWwnIGlkPSdjaGFubmVsLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0naW4gYSBjaGFubmVsJyBjaGVja2VkPXt0aGlzLnByb3BzLnB1Ymxpc2hJbkNoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2h9IC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCBsYWJlbC0tcG9pbnRlcicgaHRtbEZvcj0nY2hhbm5lbC1yYWRpbyc+SW4gYSBjaGFubmVsPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hhbm5lbEVycm9yID8gKFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnByb3BzLmNoYW5uZWxFcnJvcn08L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5QdWJsaXNoIGFub255bW91c2x5IG9yIGluIGEgY2hhbm5lbDwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsICYmIChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMnPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nY2hhbm5lbC1uYW1lLXNlbGVjdCc+Q2hhbm5lbDo8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcnPlxuICAgICAgICAgICAgICA8c2VsZWN0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLW5hbWUtc2VsZWN0JyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLWFycm93JyB2YWx1ZT17dGhpcy5wcm9wcy5zZWxlY3RlZENoYW5uZWx9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdGlvbn0+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgJiYgPG9wdGlvbiB2YWx1ZT17dGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lfSBpZD0ncHVibGlzaC1jaGFubmVsLXNlbGVjdC1jaGFubmVsLW9wdGlvbic+e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX08L29wdGlvbj4gfVxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3N0YXRlcy5MT0dJTn0+RXhpc3Rpbmc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuQ1JFQVRFfT5OZXc8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuTE9HSU4pICYmIDxDaGFubmVsTG9naW5Gb3JtIC8+IH1cbiAgICAgICAgICAgIHsgKHRoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsID09PSBzdGF0ZXMuQ1JFQVRFKSAmJiA8Q2hhbm5lbENyZWF0ZUZvcm0gLz4gfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsU2VsZWN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgKiBhcyBwdWJsaXNoU3RhdGVzIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcyc7XG5cbmNsYXNzIFB1Ymxpc2hTdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBtZXNzYWdlLCBjbGVhckZpbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURfU1RBUlQgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+RmlsZSBpcyBsb2FkaW5nIHRvIHNlcnZlcjwvcD5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPjAlPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURJTkcgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgIDxwPkZpbGUgaXMgbG9hZGluZyB0byBzZXJ2ZXI8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPnttZXNzYWdlfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5QVUJMSVNISU5HICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlVwbG9hZCBjb21wbGV0ZS4gIFlvdXIgZmlsZSBpcyBub3cgYmVpbmcgcHVibGlzaGVkIG9uIHRoZSBibG9ja2NoYWluLi4uPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5TVUNDRVNTICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPllvdXIgcHVibGlzaCBpcyBjb21wbGV0ZSEgWW91IGFyZSBiZWluZyByZWRpcmVjdGVkIHRvIGl0IG5vdy48L3A+XG4gICAgICAgICAgPHA+SWYgeW91IGFyZSBub3QgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLCA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXttZXNzYWdlfT5jbGljayBoZXJlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuRkFJTEVEICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlNvbWV0aGluZyB3ZW50IHdyb25nLi4uPC9wPlxuICAgICAgICAgIDxwPjxzdHJvbmc+e21lc3NhZ2V9PC9zdHJvbmc+PC9wPlxuICAgICAgICAgIDxwPkZvciBoZWxwLCBwb3N0IHRoZSBhYm92ZSBlcnJvciB0ZXh0IGluIHRoZSAjc3BlZWNoIGNoYW5uZWwgb24gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5sYnJ5IGRpc2NvcmQ8L2E+PC9wPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXNlY29uZGFyeScgb25DbGljaz17Y2xlYXJGaWxlfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFN0YXR1cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5wcm9wcy5tZXNzYWdlO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzLnByb3BzLm1lc3NhZ2U6JywgbWVzc2FnZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgZHJvcHpvbmUtLWRpc2FibGVkIHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyJz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+UHVibGlzaGluZyBpcyBjdXJyZW50bHkgZGlzYWJsZWQuPC9wPlxuICAgICAgICA8cCBjbGFzc05hbWU9J3RleHQtLWRpc2FibGVkJz57bWVzc2FnZX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hEaXNhYmxlZE1lc3NhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL3ZpZXcuanN4IiwiY29uc3QgeyBsc3RhdFN5bmMsIHJlYWRkaXJTeW5jIH0gPSByZXF1aXJlKCdmcycpO1xuY29uc3QgeyBqb2luIH0gPSByZXF1aXJlKCdwYXRoJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRTdWJEaXJlY3RvcnlOYW1lcyA9IChyb290KSA9PiB7XG4gIHJldHVybiByZWFkZGlyU3luYyhyb290KVxuICAgIC5maWx0ZXIobmFtZSA9PiB7XG4gICAgICBjb25zdCBmdWxsUGF0aCA9IGpvaW4ocm9vdCwgbmFtZSk7XG4gICAgICByZXR1cm4gbHN0YXRTeW5jKGZ1bGxQYXRoKS5pc0RpcmVjdG9yeSgpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2J1aWxkL2dldEZvbGRlck5hbWVzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBteXNxbCAoKSB7XG4gIHRoaXMuZGF0YWJhc2UgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXNlcm5hbWUgPSAnZGVmYXVsdCc7XG4gIHRoaXMucGFzc3dvcmQgPSAnZGVmYXVsdCc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIE15U1FMIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgLy8gY29uZmlndXJlIGNyZWRlbnRpYWxzXG4gICAgbG9nZ2VyLmluZm8oJ2NvbmZpZ3VyaW5nIG15c3FsLi4uJyk7XG4gICAgY29uc3QgeyBkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBjb25maWc7XG4gICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBteXNxbCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtbG9jYWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmV0dXJuU2hvcnRJZDogZnVuY3Rpb24gKGNsYWltc0FycmF5LCBsb25nSWQpIHtcbiAgICBsZXQgY2xhaW1JbmRleDtcbiAgICBsZXQgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgMSk7IC8vIGRlZmF1bHQgc2hvcnQgaWQgaXMgdGhlIGZpcnN0IGxldHRlclxuICAgIGxldCBzaG9ydElkTGVuZ3RoID0gMDtcbiAgICAvLyBmaW5kIHRoZSBpbmRleCBvZiB0aGlzIGNsYWltIGlkXG4gICAgY2xhaW1JbmRleCA9IGNsYWltc0FycmF5LmZpbmRJbmRleChlbGVtZW50ID0+IHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYWltSWQgPT09IGxvbmdJZDtcbiAgICB9KTtcbiAgICBpZiAoY2xhaW1JbmRleCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xhaW0gaWQgbm90IGZvdW5kIGluIGNsYWltcyBsaXN0Jyk7XG4gICAgfVxuICAgIC8vIGdldCBhbiBhcnJheSBvZiBhbGwgY2xhaW1zIHdpdGggbG93ZXIgaGVpZ2h0XG4gICAgbGV0IHBvc3NpYmxlTWF0Y2hlcyA9IGNsYWltc0FycmF5LnNsaWNlKDAsIGNsYWltSW5kZXgpO1xuICAgIC8vIHJlbW92ZSBjZXJ0aWZpY2F0ZXMgd2l0aCB0aGUgc2FtZSBwcmVmaXhlcyB1bnRpbCBub25lIGFyZSBsZWZ0LlxuICAgIHdoaWxlIChwb3NzaWJsZU1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2hvcnRJZExlbmd0aCArPSAxO1xuICAgICAgc2hvcnRJZCA9IGxvbmdJZC5zdWJzdHJpbmcoMCwgc2hvcnRJZExlbmd0aCk7XG4gICAgICBwb3NzaWJsZU1hdGNoZXMgPSBwb3NzaWJsZU1hdGNoZXMuZmlsdGVyKGVsZW1lbnQgPT4ge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuY2xhaW1JZCAmJiAoZWxlbWVudC5jbGFpbUlkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKSA9PT0gc2hvcnRJZCkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzaG9ydElkO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIlxuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnY2xpZW50L3JlZHVjZXJzJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICdjbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyLyc7XG5pbXBvcnQgQXBwIGZyb20gJ2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UuanMnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIpO1xuXG4gIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcblxuICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAvLyBTb21ld2hlcmUgYSBgPFJlZGlyZWN0PmAgd2FzIHJlbmRlcmVkXG4gICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUHVibGlzaFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvcHVibGlzaCc7XG5pbXBvcnQgQ2hhbm5lbFJlZHVjZXIgZnJvbSAncmVkdWNlcnMvY2hhbm5lbCc7XG5pbXBvcnQgU2hvd1JlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2hvdyc7XG5pbXBvcnQgU2l0ZVJlZHVjZXIgZnJvbSAncmVkdWNlcnMvc2l0ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGNoYW5uZWw6IENoYW5uZWxSZWR1Y2VyLFxuICBwdWJsaXNoOiBQdWJsaXNoUmVkdWNlcixcbiAgc2hvdyAgIDogU2hvd1JlZHVjZXIsXG4gIHNpdGUgICA6IFNpdGVSZWR1Y2VyLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvaW5kZXguanMiLCJleHBvcnQgY29uc3QgRklMRV9TRUxFQ1RFRCA9ICdGSUxFX1NFTEVDVEVEJztcbmV4cG9ydCBjb25zdCBGSUxFX0NMRUFSID0gJ0ZJTEVfQ0xFQVInO1xuZXhwb3J0IGNvbnN0IE1FVEFEQVRBX1VQREFURSA9ICdNRVRBREFUQV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IENMQUlNX1VQREFURSA9ICdDTEFJTV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFVF9QVUJMSVNIX0lOX0NIQU5ORUwgPSAnU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFUVVNfVVBEQVRFID0gJ1BVQkxJU0hfU1RBVFVTX1VQREFURSc7XG5leHBvcnQgY29uc3QgRVJST1JfVVBEQVRFID0gJ0VSUk9SX1VQREFURSc7XG5leHBvcnQgY29uc3QgU0VMRUNURURfQ0hBTk5FTF9VUERBVEUgPSAnU0VMRUNURURfQ0hBTk5FTF9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9NRVRBREFUQV9JTlBVVFMgPSAnVE9HR0xFX01FVEFEQVRBX0lOUFVUUyc7XG5leHBvcnQgY29uc3QgVEhVTUJOQUlMX05FVyA9ICdUSFVNQk5BSUxfTkVXJztcbmV4cG9ydCBjb25zdCBQVUJMSVNIX1NUQVJUID0gJ1BVQkxJU0hfU1RBUlQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2FjdGlvbl90eXBlcy5qcyIsImV4cG9ydCBjb25zdCBMT0dJTiA9ICdFeGlzdGluZyc7XG5leHBvcnQgY29uc3QgQ1JFQVRFID0gJ05ldyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzLmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUxfVVBEQVRFID0gJ0NIQU5ORUxfVVBEQVRFJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9DQUxfQ0hFQ0sgPSAnTE9DQUxfQ0hFQ0snO1xuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFID0gJ1VOQVZBSUxBQkxFJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdFUlJPUic7XG5leHBvcnQgY29uc3QgQVZBSUxBQkxFID0gJ0FWQUlMQUJMRSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IGR5bmFtaWNJbXBvcnQgfSBmcm9tICd1dGlscy9keW5hbWljSW1wb3J0Jztcbi8vIGltcG9ydCBIb21lUGFnZSBmcm9tICdwYWdlcy9Ib21lUGFnZSc7XG4vLyBpbXBvcnQgQWJvdXRQYWdlIGZyb20gJ3BhZ2VzL0Fib3V0UGFnZSc7XG5pbXBvcnQgTG9naW5QYWdlIGZyb20gJ3BhZ2VzL0xvZ2luUGFnZSc7XG5pbXBvcnQgU2hvd1BhZ2UgZnJvbSAncGFnZXMvU2hvd1BhZ2UnO1xuaW1wb3J0IEZvdXJPaEZvdXJQYWdlIGZyb20gJ2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UnO1xuXG5jb25zdCBIb21lUGFnZSA9IGR5bmFtaWNJbXBvcnQoJ3BhZ2VzL0hvbWVQYWdlJykgfHwgcmVxdWlyZSgncGFnZXMvSG9tZVBhZ2UnKS5kZWZhdWx0O1xuY29uc3QgQWJvdXRQYWdlID0gZHluYW1pY0ltcG9ydCgncGFnZXMvQWJvdXRQYWdlJykgfHwgcmVxdWlyZSgncGFnZXMvQWJvdXRQYWdlJykuZGVmYXVsdDtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTd2l0Y2g+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXtIb21lUGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvYWJvdXQnIGNvbXBvbmVudD17QWJvdXRQYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy9sb2dpbicgY29tcG9uZW50PXtMb2dpblBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzppZGVudGlmaWVyLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvOmNsYWltJyBjb21wb25lbnQ9e1Nob3dQYWdlfSAvPlxuICAgICAgPFJvdXRlIGNvbXBvbmVudD17Rm91ck9oRm91clBhZ2V9IC8+XG4gICAgPC9Td2l0Y2g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBwLmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUwgPSAnQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgQVNTRVRfTElURSA9ICdBU1NFVF9MSVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9ERVRBSUxTID0gJ0FTU0VUX0RFVEFJTFMnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL3N0YXRpYy9hc3NldHMvY3NzL3Jlc2V0LmNzc1wiIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvc3RhdGljL2Fzc2V0cy9jc3MvZ2VuZXJhbC5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL3N0YXRpYy9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvc3RhdGljL2J1bmRsZS9idW5kbGUuanNcIj48L3NjcmlwdD5cbiAgICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9yZW5kZXJGdWxsUGFnZS5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHsgZ2V0Q2xhaW1JZCwgZ2V0TG9jYWxGaWxlUmVjb3JkIH0gPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnLi9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IFNFUlZFID0gJ1NFUlZFJztcbmNvbnN0IFNIT1cgPSAnU0hPVyc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuZnVuY3Rpb24gY2xpZW50QWNjZXB0c0h0bWwgKHthY2NlcHR9KSB7XG4gIHJldHVybiBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC90ZXh0XFwvaHRtbC8pO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdElzRnJvbUJyb3dzZXIgKGhlYWRlcnMpIHtcbiAgcmV0dXJuIGhlYWRlcnNbJ3VzZXItYWdlbnQnXSAmJiBoZWFkZXJzWyd1c2VyLWFnZW50J10ubWF0Y2goL01vemlsbGEvKTtcbn07XG5cbmZ1bmN0aW9uIGNsaWVudFdhbnRzQXNzZXQgKHthY2NlcHQsIHJhbmdlfSkge1xuICBjb25zdCBpbWFnZUlzV2FudGVkID0gYWNjZXB0ICYmIGFjY2VwdC5tYXRjaCgvaW1hZ2VcXC8uKi8pICYmICFhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL1xcKi8pO1xuICBjb25zdCB2aWRlb0lzV2FudGVkID0gYWNjZXB0ICYmIHJhbmdlO1xuICByZXR1cm4gaW1hZ2VJc1dhbnRlZCB8fCB2aWRlb0lzV2FudGVkO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZENsYWltSWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuICgoY2xhaW1JZC5sZW5ndGggPT09IDQwKSAmJiAhL1teQS1aYS16MC05XS9nLnRlc3QoY2xhaW1JZCkpO1xufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWQgKGNsYWltSWQpIHtcbiAgcmV0dXJuIGNsYWltSWQubGVuZ3RoID09PSAxOyAgLy8gaXQgc2hvdWxkIHJlYWxseSBldmFsdWF0ZSB0aGUgc2hvcnQgdXJsIGl0c2VsZlxufTtcblxuZnVuY3Rpb24gaXNWYWxpZFNob3J0SWRPckNsYWltSWQgKGlucHV0KSB7XG4gIHJldHVybiAoaXNWYWxpZENsYWltSWQoaW5wdXQpIHx8IGlzVmFsaWRTaG9ydElkKGlucHV0KSk7XG59O1xuXG5mdW5jdGlvbiBzZXJ2ZUFzc2V0VG9DbGllbnQgKGNsYWltSWQsIG5hbWUsIHJlcykge1xuICByZXR1cm4gZ2V0TG9jYWxGaWxlUmVjb3JkKGNsYWltSWQsIG5hbWUpXG4gICAgLnRoZW4oZmlsZVJlY29yZCA9PiB7XG4gICAgICAvLyBjaGVjayB0aGF0IGEgbG9jYWwgcmVjb3JkIHdhcyBmb3VuZFxuICAgICAgaWYgKGZpbGVSZWNvcmQgPT09IE5PX0ZJTEUpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMzA3KS5yZWRpcmVjdChgL2FwaS9jbGFpbS9nZXQvJHtuYW1lfS8ke2NsYWltSWR9YCk7XG4gICAgICB9XG4gICAgICAvLyBzZXJ2ZSB0aGUgZmlsZVxuICAgICAgY29uc3Qge2ZpbGVQYXRoLCBmaWxlVHlwZX0gPSBmaWxlUmVjb3JkO1xuICAgICAgbG9nZ2VyLnZlcmJvc2UoYHNlcnZpbmcgZmlsZTogJHtmaWxlUGF0aH1gKTtcbiAgICAgIGNvbnN0IHNlbmRGaWxlT3B0aW9ucyA9IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnICAgICAgICAgIDogZmlsZVR5cGUgfHwgJ2ltYWdlL2pwZWcnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kRmlsZShmaWxlUGF0aCwgc2VuZEZpbGVPcHRpb25zKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQsIG9yaWdpbmFsVXJsLCBpcCwgcmVzKSB7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4oZnVsbENsYWltSWQgPT4ge1xuICAgICAgICBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9IGVsc2UgaWYgKGZ1bGxDbGFpbUlkID09PSBOT19DSEFOTkVMKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ25vIGNoYW5uZWwgaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VydmVBc3NldFRvQ2xpZW50KGZ1bGxDbGFpbUlkLCBjbGFpbU5hbWUsIHJlcyk7XG4gICAgICAgIC8vIHBvc3RUb1N0YXRzKHJlc3BvbnNlVHlwZSwgb3JpZ2luYWxVcmwsIGlwLCBjbGFpbU5hbWUsIGZ1bGxDbGFpbUlkLCAnc3VjY2VzcycpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdmYWlsJyk7XG4gICAgICB9KTtcbiAgfSxcbiAgZGV0ZXJtaW5lUmVzcG9uc2VUeXBlIChoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKSB7XG4gICAgbGV0IHJlc3BvbnNlVHlwZTtcbiAgICBpZiAoaGFzRmlsZUV4dGVuc2lvbikge1xuICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7ICAvLyBhc3N1bWUgYSBzZXJ2ZSByZXF1ZXN0IGlmIGZpbGUgZXh0ZW5zaW9uIGlzIHByZXNlbnRcbiAgICAgIGlmIChjbGllbnRBY2NlcHRzSHRtbChoZWFkZXJzKSkgeyAgLy8gaWYgdGhlIHJlcXVlc3QgY29tZXMgZnJvbSBhIGJyb3dzZXIsIGNoYW5nZSBpdCB0byBhIHNob3cgcmVxdWVzdFxuICAgICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTSE9XO1xuICAgICAgaWYgKGNsaWVudFdhbnRzQXNzZXQoaGVhZGVycykgJiYgcmVxdWVzdElzRnJvbUJyb3dzZXIoaGVhZGVycykpIHsgIC8vIHRoaXMgaXMgaW4gY2FzZSBzb21lb25lIGVtYmVkcyBhIHNob3cgdXJsXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnU2hvdyByZXF1ZXN0IGNhbWUgZnJvbSBicm93c2VyIGJ1dCB3YW50cyBhbiBpbWFnZS92aWRlby4gQ2hhbmdpbmcgcmVzcG9uc2UgdG8gc2VydmUuLi4nKTtcbiAgICAgICAgcmVzcG9uc2VUeXBlID0gU0VSVkU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZVR5cGU7XG4gIH0sXG4gIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkgKGlkZW50aWZpZXIsIG5hbWUpIHtcbiAgICAvLyB0aGlzIGlzIGEgcGF0Y2ggZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5IHdpdGggJy9uYW1lL2NsYWltX2lkJyB1cmwgZm9ybWF0XG4gICAgaWYgKGlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKG5hbWUpICYmICFpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZChpZGVudGlmaWVyKSkge1xuICAgICAgY29uc3QgdGVtcE5hbWUgPSBuYW1lO1xuICAgICAgbmFtZSA9IGlkZW50aWZpZXI7XG4gICAgICBpZGVudGlmaWVyID0gdGVtcE5hbWU7XG4gICAgfVxuICAgIHJldHVybiBbaWRlbnRpZmllciwgbmFtZV07XG4gIH0sXG4gIGxvZ1JlcXVlc3REYXRhIChyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgY2hhbm5lbE5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3Jlc3BvbnNlVHlwZSA9PT0nLCByZXNwb25zZVR5cGUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2xhaW0gbmFtZSA9PT0gJywgY2xhaW1OYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NoYW5uZWwgbmFtZSA9PT0nLCBjaGFubmVsTmFtZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBpZCA9PT0nLCBjbGFpbUlkKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBsb2dnZXIuZGVidWcoJ3BhcnNpbmcgaWRlbnRpZmllcjonLCBpZGVudGlmaWVyKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7dmFsdWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG5hbWVcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgdXJsLiAgTm8gY2hhbm5lbCBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICB9XG4gICAgY29uc3QgaXNDaGFubmVsID0gdmFsdWUuc3RhcnRzV2l0aChtb2R1bGUuZXhwb3J0cy5DSEFOTkVMX0NIQVIpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gaXNDaGFubmVsID8gdmFsdWUgOiBudWxsO1xuICAgIGxldCBjbGFpbUlkO1xuICAgIGlmIChpc0NoYW5uZWwpIHtcbiAgICAgIGlmICghY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjaGFubmVsIG5hbWUgYWZ0ZXIgQC4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVCYWRDaGFycyA9IChjaGFubmVsTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0hBTk5FTCk7XG4gICAgICBpZiAobmFtZUJhZENoYXJzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNoYW5uZWwgbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYWltSWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBjaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGlmICghbW9kaWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtb2RpZmllciBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke21vZGlmaWVyU2VwZXJhdG9yfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciA9PT0gJzonKSB7XG4gICAgICAgIGNoYW5uZWxDbGFpbUlkID0gbW9kaWZpZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQsXG4gICAgICBjbGFpbUlkLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBuYW1lOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghY2xhaW1OYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltIG5hbWUgcHJvdmlkZWQgYmVmb3JlIC4nKTtcbiAgICB9XG4gICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNsYWltTmFtZSkubWF0Y2gobW9kdWxlLmV4cG9ydHMuUkVHRVhQX0lOVkFMSURfQ0xBSU0pO1xuICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsYWltIG5hbWU6ICR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9LmApO1xuICAgIH1cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGZpbGUgZXh0ZW5zaW9uIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciAke21vZGlmaWVyU2VwZXJhdG9yfS5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RpZmllclNlcGVyYXRvciAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlICR7bW9kaWZpZXJTZXBlcmF0b3J9IG1vZGlmaWVyIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWVgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgY2xhaW1OYW1lLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlTW9kaWZpZXI6IGZ1bmN0aW9uIChjbGFpbSkge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBtb2RpZmllcjonLCBjbGFpbSk7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgbW9kaWZpZXIpXG4gICAgICAnKFs6JCMuXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBtb2RpZmllclNlcGVyYXRvciwgbW9kaWZpZXJdID0gY29tcG9uZW50c1JlZ2V4XG4gICAgICAuZXhlYyhjbGFpbSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHtjbGFpbU5hbWV9LCAke21vZGlmaWVyU2VwZXJhdG9yfSwgJHttb2RpZmllcn1gKTtcbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBtb2RpZmllclxuICAgIGxldCBoYXNGaWxlRXh0ZW5zaW9uID0gZmFsc2U7XG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBoYXNGaWxlRXh0ZW5zaW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24sXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5VXJpLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnLi4vLi4vY2xpZW50L3JlZHVjZXJzL2luZGV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICcuLi8uLi9jbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyL2luZGV4JztcbmltcG9ydCBBcHAgZnJvbSAnLi4vLi4vY2xpZW50L2FwcCc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi9yZW5kZXJGdWxsUGFnZSc7XG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBjYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCB7IGhhbmRsZVNob3dQYWdlVXJpIH0gZnJvbSAnLi4vLi4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpJztcbmltcG9ydCB7IG9uSGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvYWN0aW9ucy9zaG93JztcblxuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5jb25zdCByZXR1cm5TYWdhV2l0aFBhcmFtcyA9IChzYWdhLCBwYXJhbXMpID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uICogKCkge1xuICAgIHlpZWxkIGNhbGwoc2FnYSwgcGFyYW1zKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBjb250ZXh0ID0ge307XG5cbiAgLy8gY3JlYXRlIGFuZCBhcHBseSBtaWRkbGV3YXJlXG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSk7XG5cbiAgLy8gY3JlYXRlIGEgbmV3IFJlZHV4IHN0b3JlIGluc3RhbmNlXG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoUmVkdWNlciwgbWlkZGxld2FyZSk7XG5cbiAgLy8gY3JlYXRlIHNhZ2FcbiAgY29uc3QgYWN0aW9uID0gb25IYW5kbGVTaG93UGFnZVVyaShyZXEucGFyYW1zKTtcbiAgY29uc3Qgc2FnYSA9IHJldHVyblNhZ2FXaXRoUGFyYW1zKGhhbmRsZVNob3dQYWdlVXJpLCBhY3Rpb24pO1xuXG4gIC8vIHJ1biB0aGUgc2FnYSBtaWRkbGV3YXJlXG4gIHNhZ2FNaWRkbGV3YXJlXG4gICAgLnJ1bihzYWdhKVxuICAgIC5kb25lXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gcmVuZGVyIGNvbXBvbmVudCB0byBhIHN0cmluZ1xuICAgICAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICA8U3RhdGljUm91dGVyIGxvY2F0aW9uPXtyZXEudXJsfSBjb250ZXh0PXtjb250ZXh0fT5cbiAgICAgICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgICAgICA8QXBwIC8+XG4gICAgICAgICAgICA8L0dBTGlzdGVuZXI+XG4gICAgICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICApO1xuXG4gICAgICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gICAgICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKCk7XG5cbiAgICAgIC8vIGNoZWNrIGZvciBhIHJlZGlyZWN0XG4gICAgICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gICAgICBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICAgIC8vIHNlbmQgdGhlIHJlbmRlcmVkIHBhZ2UgYmFjayB0byB0aGUgY2xpZW50XG4gICAgICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG4gICAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlU2hvd1JlbmRlci5qc3giLCJleHBvcnQgY29uc3Qgc2VsZWN0U2l0ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVIb3N0ID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaXRlLmhvc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NlbGVjdG9ycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hhdHdnLWZldGNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2hhdHdnLWZldGNoXCJcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuL3NlcnZlcicpO1xuY29uc3QgUGFnZXMgPSByZXF1aXJlKCcuL2NsaWVudC9wYWdlcycpO1xuY29uc3QgQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY2xpZW50L2NvbXBvbmVudHMnKTtcbmNvbnN0IENvbnRhaW5lcnMgPSByZXF1aXJlKCcuL2NsaWVudC9jb250YWluZXJzJyk7XG5cbmNvbnN0IGV4cG9ydHMgPSB7XG4gIFNlcnZlcixcbiAgUGFnZXMsXG4gIENvbXBvbmVudHMsXG4gIENvbnRhaW5lcnMsXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcGVlY2hQYWNrYWdlLmpzIiwiLy8gYXBwIGRlcGVuZGVuY2llc1xuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuY29uc3QgZXhwcmVzc0hhbmRsZWJhcnMgPSByZXF1aXJlKCdleHByZXNzLWhhbmRsZWJhcnMnKTtcbmNvbnN0IEhhbmRsZWJhcnMgPSByZXF1aXJlKCdoYW5kbGViYXJzJyk7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKCdoZWxtZXQnKTtcbmNvbnN0IGNvb2tpZVNlc3Npb24gPSByZXF1aXJlKCdjb29raWUtc2Vzc2lvbicpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IHJlcXVlc3RMb2dnZXIgPSByZXF1aXJlKCdtaWRkbGV3YXJlL3JlcXVlc3RMb2dnZXIuanMnKTtcbmNvbnN0IFBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBsb2dnZXJDb25maWcgPSByZXF1aXJlKCdsb2dnZXJDb25maWcuanMnKTtcbmNvbnN0IG15c3FsQ29uZmlnID0gcmVxdWlyZSgnbXlzcWxDb25maWcuanMnKTtcbmNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJ3NsYWNrQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIFNlcnZlciAoKSB7XG4gIHRoaXMuY29uZmlndXJlTG9nZ2VyID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBsb2dnZXJDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBteXNxbENvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlU2l0ZURldGFpbHMgPSAodXNlckNvbmZpZykgPT4ge1xuICAgIHNpdGVDb25maWcudXBkYXRlKHVzZXJDb25maWcpO1xuICB9O1xuICB0aGlzLmNvbmZpZ3VyZVNsYWNrID0gKHVzZXJDb25maWcpID0+IHtcbiAgICBzbGFja0NvbmZpZy51cGRhdGUodXNlckNvbmZpZyk7XG4gIH07XG4gIHRoaXMuY29uZmlndXJlQ2xpZW50QnVuZGxlID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnY29uZmlndXJlIHRoZSBjbGllbnQgaGVyZSBieSBwYXNzaW5nIGluIHRoZSBidW5kbGUgYW5kIGNvbmZpZ3VyaW5nIGl0LCBvciBiZXR0ZXIgeWV0OiB0YWtpbmcgaW4gdGhlIGNvbXBvbmVudHMgdG8gdXNlIGR5bmFtaWNhbGx5IGZyb20gaGVyZS4nKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVNb2RlbHMgPSAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdoZXJlIGlzIHdoZXJlIHlvdSBjb3VsZCBhZGQvb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG1vZGVscycpXG4gIH07XG4gIHRoaXMuY29uZmlndXJlUm91dGVzID0gKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZygnaGVyZSBpcyB3aGVyZSB5b3UgY291bGQgYWRkL292ZXJ3cml0ZSB0aGUgZGVmYXVsdCByb3V0ZXMnKVxuICB9O1xuICB0aGlzLmNyZWF0ZUFwcCA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgYW4gRXhwcmVzcyBhcHBsaWNhdGlvblxuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuICAgIC8vIHRydXN0IHRoZSBwcm94eSB0byBnZXQgaXAgYWRkcmVzcyBmb3IgdXNcbiAgICBhcHAuZW5hYmxlKCd0cnVzdCBwcm94eScpO1xuXG4gICAgLyogYWRkIG1pZGRsZXdhcmUgKi9cbiAgICAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoaGVsbWV0KCkpO1xuICAgIC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIGlmIChzaXRlQ29uZmlnLnJvdXRlcy5wdWJsaWNGb2xkZXIpIHtcbiAgICAgIC8vIHRha2UgaW4gYSBkaWZmZXJlbnQgcHVibGljIGZvbGRlciwgc28gaXQgY2FuIHNlcnZlIGl0J3Mgb3duIGJ1bmRsZSBpZiBuZWVkZWRcbiAgICAgIGNvbnN0IHB1YmxpY0ZvbGRlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBzaXRlQ29uZmlnLnJvdXRlcy5wdWJsaWNGb2xkZXIpO1xuICAgICAgYXBwLnVzZSgnL3N0YXRpYycsIGV4cHJlc3Muc3RhdGljKHB1YmxpY0ZvbGRlcikpO1xuICAgICAgbG9nZ2VyLmluZm8oJ3NlcnZpbmcgc3RhdGljIGZpbGVzIGZyb20gY3VzdG9tIHBhdGg6JywgcHVibGljRm9sZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHVibGljUGF0aCA9IFBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKTtcbiAgICAgIGFwcC51c2UoJy9zdGF0aWMnLCBleHByZXNzLnN0YXRpYyhwdWJsaWNQYXRoKSk7XG4gICAgICBsb2dnZXIuaW5mbygnc2VydmluZyBzdGF0aWMgZmlsZXMgZnJvbSBkZWZhdWx0IHBhdGg6JywgcHVibGljUGF0aCk7XG4gICAgfTtcbiAgICAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL2pzb25cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG4gICAgLy8gYWRkIGN1c3RvbSBtaWRkbGV3YXJlIChub3RlOiBidWlsZCBvdXQgdG8gYWNjZXB0IGR5bmFtaWNhbGx5IHVzZSB3aGF0IGlzIGluIHNlcnZlci9taWRkbGV3YXJlL1xuICAgIGFwcC51c2UocmVxdWVzdExvZ2dlcik7XG5cbiAgICAvLyBjb25maWd1cmUgcGFzc3BvcnRcbiAgICBjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG4gICAgLy8gaW5pdGlhbGl6ZSBwYXNzcG9ydFxuICAgIGNvbnN0IHNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICBhcHAudXNlKGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZSAgOiAnc2Vzc2lvbicsXG4gICAgICBrZXlzICA6IFtzZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHNwZWVjaFBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShzcGVlY2hQYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS8nKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2VzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXNzZXRzLycpKGFwcCk7XG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvZmFsbGJhY2svJykoYXBwKTtcblxuICAgIHRoaXMuYXBwID0gYXBwO1xuICB9O1xuICB0aGlzLmluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgdGhpcy5jcmVhdGVBcHAoKTtcbiAgICB0aGlzLnNlcnZlciA9IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgfTtcbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuICAgIGNvbnN0IFBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgICAvLyBzeW5jIHNlcXVlbGl6ZVxuICAgIGRiLnNlcXVlbGl6ZS5zeW5jKClcbiAgICAvLyBzdGFydCB0aGUgc2VydmVyXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oYFNlcnZlciBpcyBsaXN0ZW5pbmcgb24gUE9SVCAke1BPUlR9YCk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBTdGFydHVwIEVycm9yOmAsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZXJ2ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSAxMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDExNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGFuZGxlYmFyc1wiXG4vLyBtb2R1bGUgaWQgPSAxMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaGVsbWV0XCJcbi8vIG1vZHVsZSBpZCA9IDExOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb29raWUtc2Vzc2lvblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvb2tpZS1zZXNzaW9uXCJcbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSAxMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zdCByZXF1ZXN0TG9nZ2VyID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7ICAvLyBjdXN0b20gbG9nZ2luZyBtaWRkbGV3YXJlIHRvIGxvZyBhbGwgaW5jb21pbmcgaHR0cCByZXF1ZXN0c1xuICBsb2dnZXIudmVyYm9zZShgUmVxdWVzdCBvbiAke3JlcS5vcmlnaW5hbFVybH0gZnJvbSAke3JlcS5pcH1gKTtcbiAgbmV4dCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1ZXN0TG9nZ2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21pZGRsZXdhcmUvcmVxdWVzdExvZ2dlci5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxuZnVuY3Rpb24gTG9nZ2VyQ29uZmlnICgpIHtcbiAgdGhpcy5sb2dMZXZlbCA9ICdkZWJ1Zyc7XG4gIHRoaXMudXBkYXRlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gbG9nZ2VyLndhcm4oJ05vIGxvZ2dlciBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGxvZ2dlci5pbmZvKCdjb25maWd1cmluZyB3aW5zdG9uIGxvZ2dlci4uLicpO1xuICAgIC8vIHVwZGF0ZSB2YWx1ZXMgd2l0aCBsb2NhbCBjb25maWcgcGFyYW1zXG4gICAgY29uc3Qge2xvZ0xldmVsfSA9IGNvbmZpZztcbiAgICB0aGlzLmxvZ0xldmVsID0gbG9nTGV2ZWw7XG4gICAgLy8gY29uZmlndXJlIHRoZSB3aW5zdG9uIGxvZ2dlclxuICAgIGxvZ2dlci5jb25maWd1cmUoe1xuICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICBuZXcgKGxvZ2dlci50cmFuc3BvcnRzLkNvbnNvbGUpKHtcbiAgICAgICAgICBsZXZlbCAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmxvZ0xldmVsLFxuICAgICAgICAgIHRpbWVzdGFtcCAgICAgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgIGNvbG9yaXplICAgICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICAgICAgcHJldHR5UHJpbnQgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgICBoYW5kbGVFeGNlcHRpb25zICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb246IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KTtcbiAgICAvLyB0ZXN0IGFsbCB0aGUgbG9nIGxldmVsc1xuICAgIGxvZ2dlci5pbmZvKCd0ZXN0aW5nIHdpbnN0b24gbG9nIGxldmVscy4uLicpO1xuICAgIGxvZ2dlci5lcnJvcignTGV2ZWwgMCcpO1xuICAgIGxvZ2dlci53YXJuKCdMZXZlbCAxJyk7XG4gICAgbG9nZ2VyLmluZm8oJ0xldmVsIDInKTtcbiAgICBsb2dnZXIudmVyYm9zZSgnTGV2ZWwgMycpO1xuICAgIGxvZ2dlci5kZWJ1ZygnTGV2ZWwgNCcpO1xuICAgIGxvZ2dlci5zaWxseSgnTGV2ZWwgNScpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgTG9nZ2VyQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbG9nZ2VyQ29uZmlnLmpzIiwiY29uc3Qgd2luc3RvblNsYWNrV2ViSG9vayA9IHJlcXVpcmUoJ3dpbnN0b24tc2xhY2std2ViaG9vaycpLlNsYWNrV2ViSG9vaztcbmNvbnN0IHdpbnN0b24gPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbmZ1bmN0aW9uIFNsYWNrQ29uZmlnICgpIHtcbiAgdGhpcy5zbGFja1dlYkhvb2sgICAgICA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9ICdkZWZhdWx0JztcbiAgdGhpcy5zbGFja0luZm9DaGFubmVsICA9ICdkZWZhdWx0JztcbiAgdGhpcy51cGRhdGUgPSAoY29uZmlnKSA9PiB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybiB3aW5zdG9uLndhcm4oJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZCcpO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgdmFyaWFibGVzXG4gICAgd2luc3Rvbi5pbmZvKCdjb25maWd1cmluZyBzbGFjayBsb2dnZXIuLi4nKTtcbiAgICBjb25zdCB7c2xhY2tXZWJIb29rLCBzbGFja0Vycm9yQ2hhbm5lbCwgc2xhY2tJbmZvQ2hhbm5lbH0gPSBjb25maWc7XG4gICAgdGhpcy5zbGFja1dlYkhvb2sgPSBzbGFja1dlYkhvb2s7XG4gICAgdGhpcy5zbGFja0Vycm9yQ2hhbm5lbCA9IHNsYWNrRXJyb3JDaGFubmVsO1xuICAgIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCA9IHNsYWNrSW5mb0NoYW5uZWw7XG4gICAgLy8gdXBkYXRlIHNsYWNrIHdlYmhvb2sgc2V0dGluZ3NcbiAgICBpZiAodGhpcy5zbGFja1dlYkhvb2spIHtcbiAgICAgIC8vIGFkZCBhIHRyYW5zcG9ydCBmb3IgZXJyb3JzIHRvIHNsYWNrXG4gICAgICBpZiAodGhpcy5zbGFja0Vycm9yQ2hhbm5lbCkge1xuICAgICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICAgIGxldmVsICAgICA6ICd3YXJuJyxcbiAgICAgICAgICB3ZWJob29rVXJsOiB0aGlzLnNsYWNrV2ViSG9vayxcbiAgICAgICAgICBjaGFubmVsICAgOiB0aGlzLnNsYWNrRXJyb3JDaGFubmVsLFxuICAgICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgICBpY29uRW1vamkgOiAnOmZhY2Vfd2l0aF9oZWFkX2JhbmRhZ2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgaWYgKHNsYWNrSW5mb0NoYW5uZWwpIHtcbiAgICAgICAgd2luc3Rvbi5hZGQod2luc3RvblNsYWNrV2ViSG9vaywge1xuICAgICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgICAgbGV2ZWwgICAgIDogJ2luZm8nLFxuICAgICAgICAgIHdlYmhvb2tVcmw6IHRoaXMuc2xhY2tXZWJIb29rLFxuICAgICAgICAgIGNoYW5uZWwgICA6IHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCxcbiAgICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgICAgaWNvbkVtb2ppIDogJzpuZXJkX2ZhY2U6JyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgLy8gc2VuZCB0ZXN0IG1lc3NhZ2VzXG4gICAgICB3aW5zdG9uLmluZm8oJ3Rlc3Rpbmcgc2xhY2sgbG9nZ2VyLi4uJyk7XG4gICAgICB3aW5zdG9uLmVycm9yKCdTbGFjayBcImVycm9yXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gICAgICB3aW5zdG9uLmluZm8oJ1NsYWNrIFwiaW5mb1wiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5zdG9uLndhcm4oJ1NsYWNrIGxvZ2dpbmcgaXMgbm90IGVuYWJsZWQgYmVjYXVzZSBubyBzbGFja1dlYkhvb2sgY29uZmlnIHZhciBwcm92aWRlZC4nKTtcbiAgICB9XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTbGFja0NvbmZpZygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL3NsYWNrQ29uZmlnLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCJcbi8vIG1vZHVsZSBpZCA9IDEyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXNzcG9ydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhc3Nwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuY29uc3QgcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvID0gKHVzZXJJbnN0YW5jZSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCB1c2VySW5mbyA9IHt9O1xuICAgIHVzZXJJbmZvWydpZCddID0gdXNlckluc3RhbmNlLmlkO1xuICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gdXNlckluc3RhbmNlLnVzZXJOYW1lO1xuICAgIHVzZXJJbnN0YW5jZVxuICAgICAgLmdldENoYW5uZWwoKVxuICAgICAgLnRoZW4oKHtjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWR9KSA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIHJldHVybiBkYi5DZXJ0aWZpY2F0ZS5nZXRTaG9ydENoYW5uZWxJZEZyb21Mb25nQ2hhbm5lbElkKGNoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oc2hvcnRDaGFubmVsSWQgPT4ge1xuICAgICAgICB1c2VySW5mb1snc2hvcnRDaGFubmVsSWQnXSA9IHNob3J0Q2hhbm5lbElkO1xuICAgICAgICByZXNvbHZlKHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgcmV0dXJuIGRiLlVzZXJcbiAgICAgIC5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHt1c2VyTmFtZTogdXNlcm5hbWV9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHVzZXIgPT4ge1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCBmYWxzZSwge21lc3NhZ2U6ICdJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXIuY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKGlzTWF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUGFzc3dvcmQgd2FzIGEgbWF0Y2gsIHJldHVybmluZyBVc2VyJyk7XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVXNlckFuZENoYW5uZWxJbmZvKHVzZXIpXG4gICAgICAgICAgICAgIC50aGVuKHVzZXJJbmZvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShudWxsLCB1c2VySW5mbyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sXG4pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NwZWVjaFBhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENlcnRpZmljYXRlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2VydGlmaWNhdGUnLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBrZXlUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2VydGlmaWNhdGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENlcnRpZmljYXRlLmJlbG9uZ3NUbyhkYi5DaGFubmVsLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChsb25nQ2hhbm5lbElkLCBjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCAke2NoYW5uZWxOYW1lfToke2xvbmdDaGFubmVsSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7bmFtZTogY2hhbm5lbE5hbWV9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwocykgZm91bmQgd2l0aCB0aGF0IGNoYW5uZWwgbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGxvbmdDaGFubmVsSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSAgIDogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtjaGFubmVsQ2xhaW1JZH0lYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKCR7Y2hhbm5lbE5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjaGFubmVsTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS52YWxpZGF0ZUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgdmFsaWRhdGVMb25nQ2hhbm5lbElkKCR7bmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCAmJiAoY2hhbm5lbENsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDbGFpbUlkICYmIGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA8IDQwKSB7ICAvLyBpZiBhIHNob3J0IGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZShjaGFubmVsTmFtZSk7ICAvLyBpZiBubyBjaGFubmVsIGlkIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDZXJ0aWZpY2F0ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IENoYW5uZWwgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDaGFubmVsJyxcbiAgICB7XG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsQ2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENoYW5uZWwuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENoYW5uZWwuYmVsb25nc1RvKGRiLlVzZXIpO1xuICAgIENoYW5uZWwuaGFzT25lKGRiLkNlcnRpZmljYXRlKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIgfSkgPT4ge1xuICBjb25zdCBGaWxlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnRmlsZScsXG4gICAge1xuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICAgIDogSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdCAgOiAwLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVQYXRoOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVUeXBlOiB7XG4gICAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB0cmVuZGluZ0VsaWdpYmxlOiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgRmlsZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgRmlsZS5oYXNNYW55KGRiLlJlcXVlc3QpO1xuICAgIEZpbGUuaGFzT25lKGRiLkNsYWltKTtcbiAgfTtcblxuICBGaWxlLmdldFJlY2VudENsYWltcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKHtcbiAgICAgIHdoZXJlOiB7IG5zZnc6IGZhbHNlLCB0cmVuZGluZ0VsaWdpYmxlOiB0cnVlIH0sXG4gICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICBsaW1pdDogMjUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpbGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9maWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgVEVYVCB9KSA9PiB7XG4gIGNvbnN0IFJlcXVlc3QgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdSZXF1ZXN0JyxcbiAgICB7XG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGlwQWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICB0eXBlICAgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBSZXF1ZXN0LmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBSZXF1ZXN0LmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlcXVlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiY3J5cHRcIlxuLy8gbW9kdWxlIGlkID0gMTMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsYnJ5QXBpID0gcmVxdWlyZSgnLi4vaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICBsb2dnZXIudmVyYm9zZShgbmV3IGNoYW5uZWwgc2lnbnVwIHJlcXVlc3QuIHVzZXI6ICR7dXNlcm5hbWV9IHBhc3M6ICR7cGFzc3dvcmR9IC5gKTtcbiAgICBsZXQgdXNlckluZm8gPSB7fTtcbiAgICAvLyBzZXJ2ZXItc2lkZSB2YWxpZGF0b24gb2YgaW5wdXRzICh1c2VybmFtZSwgcGFzc3dvcmQpXG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYW5uZWwgYW5kIHJldHJpZXZlIHRoZSBtZXRhZGF0YVxuICAgIHJldHVybiBsYnJ5QXBpLmNyZWF0ZUNoYW5uZWwoYEAke3VzZXJuYW1lfWApXG4gICAgICAudGhlbih0eCA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlckRhdGEgPicsIHVzZXJEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIHVzZXIgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNoYW5uZWxEYXRhID0ge1xuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCdjaGFubmVsRGF0YSA+JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAvLyBjcmVhdGUgY2VydGlmaWNhdGUgcmVjb3JkXG4gICAgICAgIGNvbnN0IGNlcnRpZmljYXRlRGF0YSA9IHtcbiAgICAgICAgICBjbGFpbUlkOiB0eC5jbGFpbV9pZCxcbiAgICAgICAgICBuYW1lICAgOiBgQCR7dXNlcm5hbWV9YCxcbiAgICAgICAgICAvLyBhZGRyZXNzLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2VydGlmaWNhdGVEYXRhID4nLCBjZXJ0aWZpY2F0ZURhdGEpO1xuICAgICAgICAvLyBzYXZlIHVzZXIgYW5kIGNlcnRpZmljYXRlIHRvIGRiXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIuVXNlci5jcmVhdGUodXNlckRhdGEpLCBkYi5DaGFubmVsLmNyZWF0ZShjaGFubmVsRGF0YSksIGRiLkNlcnRpZmljYXRlLmNyZWF0ZShjZXJ0aWZpY2F0ZURhdGEpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFtuZXdVc2VyLCBuZXdDaGFubmVsLCBuZXdDZXJ0aWZpY2F0ZV0pID0+IHtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXIgYW5kIGNlcnRpZmljYXRlIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJyk7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZWxldmFudCBuZXdVc2VyIGluZm8gdG8gYmUgcGFzc2VkIGJhY2sgZm9yIHJlcS5Vc2VyXG4gICAgICAgIHVzZXJJbmZvWydpZCddID0gbmV3VXNlci5pZDtcbiAgICAgICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSBuZXdVc2VyLnVzZXJOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbE5hbWUnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgIHVzZXJJbmZvWydjaGFubmVsQ2xhaW1JZCddID0gbmV3Q2hhbm5lbC5jaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgLy8gYXNzb2NpYXRlIHRoZSBpbnN0YW5jZXNcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtuZXdDZXJ0aWZpY2F0ZS5zZXRDaGFubmVsKG5ld0NoYW5uZWwpLCBuZXdDaGFubmVsLnNldFVzZXIobmV3VXNlcildKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICByZXR1cm4gZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCh1c2VySW5mby5jaGFubmVsQ2xhaW1JZCwgdXNlckluZm8uY2hhbm5lbE5hbWUpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHNob3J0Q2hhbm5lbElkID0+IHtcbiAgICAgICAgdXNlckluZm9bJ3Nob3J0Q2hhbm5lbElkJ10gPSBzaG9ydENoYW5uZWxJZDtcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgdXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcignc2lnbnVwIGVycm9yJywgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9zcGVlY2hQYXNzcG9ydC9sb2NhbC1zaWdudXAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImF4aW9zXCJcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsYnJ5Q29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBhcGlIb3N0OiAnbG9jYWxob3N0JyxcbiAgICBhcGlQb3J0OiAnNTI3OScsXG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxicnlDb25maWc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbGJyeUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuaXZlcnNhbC1hbmFseXRpY3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCJcbi8vIG1vZHVsZSBpZCA9IDEzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gcmV0dXJucyB1c2VyIGRhdGEgdG8gYmUgc2VyaWFsaXplZCBpbnRvIHNlc3Npb25cbiAgICBjb25zb2xlLmxvZygnc2VyaWFsaXppbmcgdXNlcicpO1xuICAgIGRvbmUobnVsbCwgdXNlcik7XG4gIH0sXG4gIGRlc2VyaWFsaXplU3BlZWNoVXNlciAodXNlciwgZG9uZSkgeyAgLy8gZGVzZXJpYWxpemVzIHNlc3Npb24gYW5kIHBvcHVsYXRlcyBhZGRpdGlvbmFsIGluZm8gdG8gcmVxLnVzZXJcbiAgICBjb25zb2xlLmxvZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsImNvbnN0IHNwZWVjaFBhc3Nwb3J0ID0gcmVxdWlyZSgnc3BlZWNoUGFzc3BvcnQnKTtcbmNvbnN0IGhhbmRsZVNpZ251cFJlcXVlc3QgPSByZXF1aXJlKCcuL3NpZ251cCcpO1xuY29uc3QgaGFuZGxlTG9naW5SZXF1ZXN0ID0gcmVxdWlyZSgnLi9sb2dpbicpO1xuY29uc3QgaGFuZGxlTG9nb3V0UmVxdWVzdCA9IHJlcXVpcmUoJy4vbG9nb3V0Jyk7XG5jb25zdCBoYW5kbGVVc2VyUmVxdWVzdCA9IHJlcXVpcmUoJy4vdXNlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgYXBwLnBvc3QoJy9zaWdudXAnLCBzcGVlY2hQYXNzcG9ydC5hdXRoZW50aWNhdGUoJ2xvY2FsLXNpZ251cCcpLCBoYW5kbGVTaWdudXBSZXF1ZXN0KTtcbiAgYXBwLnBvc3QoJy9sb2dpbicsIGhhbmRsZUxvZ2luUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9sb2dvdXQnLCBoYW5kbGVMb2dvdXRSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL3VzZXInLCBoYW5kbGVVc2VyUmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2luZGV4LmpzIiwiY29uc3Qgc2lnbnVwID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICBjaGFubmVsTmFtZSAgIDogcmVxLnVzZXIuY2hhbm5lbE5hbWUsXG4gICAgY2hhbm5lbENsYWltSWQ6IHJlcS51c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpZ251cDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9zaWdudXAuanMiLCJjb25zdCBzcGVlY2hQYXNzcG9ydCA9IHJlcXVpcmUoJ3NwZWVjaFBhc3Nwb3J0Jyk7XG5cbmNvbnN0IGxvZ2luID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHNwZWVjaFBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICB9XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcS5sb2dJbih1c2VyLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHJlcS51c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KShyZXEsIHJlcywgbmV4dCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ2luO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL2xvZ2luLmpzIiwiY29uc3QgbG9nb3V0ID0gKHJlcSwgcmVzKSA9PiB7XG4gIHJlcS5sb2dvdXQoKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6ICd5b3Ugc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBvdXQnfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvZ291dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXV0aC9sb2dvdXQuanMiLCJjb25zdCB1c2VyID0gKHJlcSwgcmVzKSA9PiB7XG4gIGlmIChyZXEudXNlcikge1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ3VzZXIgaXMgbm90IGxvZ2dlZCBpbid9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c2VyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hdXRoL3VzZXIuanMiLCJjb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9jaGFubmVsQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjaGFubmVsQ2xhaW1zID0gcmVxdWlyZSgnLi9jaGFubmVsQ2xhaW1zJyk7XG5jb25zdCBjaGFubmVsRGF0YSA9IHJlcXVpcmUoJy4vY2hhbm5lbERhdGEnKTtcbmNvbnN0IGNoYW5uZWxTaG9ydElkID0gcmVxdWlyZSgnLi9jaGFubmVsU2hvcnRJZCcpO1xuY29uc3QgY2xhaW1BdmFpbGFiaWxpdHkgPSByZXF1aXJlKCcuL2NsYWltQXZhaWxhYmlsaXR5Jyk7XG5jb25zdCBjbGFpbURhdGEgPSByZXF1aXJlKCcuL2NsYWltRGF0YScpO1xuY29uc3QgY2xhaW1HZXQgPSByZXF1aXJlKCcuL2NsYWltR2V0Jyk7XG5jb25zdCBjbGFpbUxvbmdJZCA9IHJlcXVpcmUoJy4vY2xhaW1Mb25nSWQnKTtcbmNvbnN0IGNsYWltUHVibGlzaCA9IHJlcXVpcmUoJy4vY2xhaW1QdWJsaXNoJyk7XG5jb25zdCBjbGFpbVJlc29sdmUgPSByZXF1aXJlKCcuL2NsYWltUmVzb2x2ZScpO1xuY29uc3QgY2xhaW1TaG9ydElkID0gcmVxdWlyZSgnLi9jbGFpbVNob3J0SWQnKTtcbmNvbnN0IGNsYWltTGlzdCA9IHJlcXVpcmUoJy4vY2xhaW1MaXN0Jyk7XG5jb25zdCBmaWxlQXZhaWxhYmlsaXR5ID0gcmVxdWlyZSgnLi9maWxlQXZhaWxhYmlsaXR5Jyk7XG5cbmNvbnN0IG11bHRpcGFydE1pZGRsZXdhcmUgPSByZXF1aXJlKCdoZWxwZXJzL211bHRpcGFydE1pZGRsZXdhcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIC8vIGNoYW5uZWwgcm91dGVzXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvOm5hbWUnLCBjaGFubmVsQXZhaWxhYmlsaXR5KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL3Nob3J0LWlkLzpsb25nSWQvOm5hbWUnLCBjaGFubmVsU2hvcnRJZCk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9kYXRhLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQnLCBjaGFubmVsRGF0YSk7XG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9jbGFpbXMvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZC86cGFnZScsIGNoYW5uZWxDbGFpbXMpO1xuICAvLyBjbGFpbSByb3V0ZXNcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9saXN0LzpuYW1lJywgY2xhaW1MaXN0KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9nZXQvOm5hbWUvOmNsYWltSWQnLCBjbGFpbUdldCk7XG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LzpuYW1lJywgY2xhaW1BdmFpbGFiaWxpdHkpO1xuICBhcHAuZ2V0KCcvYXBpL2NsYWltL3Jlc29sdmUvOm5hbWUvOmNsYWltSWQnLCBjbGFpbVJlc29sdmUpO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9wdWJsaXNoJywgbXVsdGlwYXJ0TWlkZGxld2FyZSwgY2xhaW1QdWJsaXNoKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgY2xhaW1TaG9ydElkKTtcbiAgYXBwLnBvc3QoJy9hcGkvY2xhaW0vbG9uZy1pZCcsIGNsYWltTG9uZ0lkKTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9kYXRhLzpjbGFpbU5hbWUvOmNsYWltSWQnLCBjbGFpbURhdGEpO1xuICAvLyBmaWxlIHJvdXRlc1xuICBhcHAuZ2V0KCcvYXBpL2ZpbGUvYXZhaWxhYmlsaXR5LzpuYW1lLzpjbGFpbUlkJywgZmlsZUF2YWlsYWJpbGl0eSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvaW5kZXguanMiLCJjb25zdCB7IGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgc2l0ZSBoYXMgcHVibGlzaGVkIHRvIGEgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eShuYW1lKVxuICAgIC50aGVuKGF2YWlsYWJsZU5hbWUgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXZhaWxhYmxlTmFtZSk7XG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxBdmFpbGFiaWxpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQXZhaWxhYmlsaXR5LmpzIiwiY29uc3QgeyBnZXRDaGFubmVsQ2xhaW1zIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGFsbCBjbGFpbXMgZm9yIGNoYW5uZWxcblxuKi9cblxuY29uc3QgY2hhbm5lbENsYWltcyA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICBjb25zdCBwYWdlID0gcGFyYW1zLnBhZ2U7XG4gIGdldENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNoYW5uZWwgd2FzIGZvdW5kJ30pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYW5uZWxDbGFpbXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsQ2xhaW1zLmpzIiwiY29uc3QgQ0xBSU1TX1BFUl9QQUdFID0gMTI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjbGFpbXMsIHBhZ2UpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxQYWdlcyhjbGFpbXMpO1xuICAgIGNvbnN0IHBhZ2luYXRpb25QYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0UGFnZUZyb21RdWVyeShwYWdlKTtcbiAgICBjb25zdCB2aWV3RGF0YSA9IHtcbiAgICAgIGNoYW5uZWxOYW1lICAgICAgIDogY2hhbm5lbE5hbWUsXG4gICAgICBsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltcyAgICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zKGNsYWltcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgcHJldmlvdXNQYWdlICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVQcmV2aW91c1BhZ2UocGFnaW5hdGlvblBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgICAgICAgOiBwYWdpbmF0aW9uUGFnZSxcbiAgICAgIG5leHRQYWdlICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lTmV4dFBhZ2UodG90YWxQYWdlcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgdG90YWxQYWdlcyAgICAgICAgOiB0b3RhbFBhZ2VzLFxuICAgICAgdG90YWxSZXN1bHRzICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbENsYWltcyhjbGFpbXMpLFxuICAgIH07XG4gICAgcmV0dXJuIHZpZXdEYXRhO1xuICB9LFxuICBnZXRQYWdlRnJvbVF1ZXJ5IChwYWdlKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH0sXG4gIGV4dHJhY3RQYWdlRnJvbUNsYWltcyAoY2xhaW1zLCBwYWdlTnVtYmVyKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiBbXTsgIC8vIGlmIG5vIGNsYWltcywgcmV0dXJuIHRoaXMgZGVmYXVsdFxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ2NsYWltcyBpcyBhcnJheT8nLCBBcnJheS5pc0FycmF5KGNsYWltcykpO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZyhgcGFnZU51bWJlciAke3BhZ2VOdW1iZXJ9IGlzIG51bWJlcj9gLCBOdW1iZXIuaXNJbnRlZ2VyKHBhZ2VOdW1iZXIpKTtcbiAgICBjb25zdCBjbGFpbVN0YXJ0SW5kZXggPSAocGFnZU51bWJlciAtIDEpICogQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IGNsYWltRW5kSW5kZXggPSBjbGFpbVN0YXJ0SW5kZXggKyBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgcGFnZU9mQ2xhaW1zID0gY2xhaW1zLnNsaWNlKGNsYWltU3RhcnRJbmRleCwgY2xhaW1FbmRJbmRleCk7XG4gICAgcmV0dXJuIHBhZ2VPZkNsYWltcztcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxQYWdlcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbENsYWltcyA9IGNsYWltcy5sZW5ndGg7XG4gICAgICBpZiAodG90YWxDbGFpbXMgPCBDTEFJTVNfUEVSX1BBR0UpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBmdWxsUGFnZXMgPSBNYXRoLmZsb29yKHRvdGFsQ2xhaW1zIC8gQ0xBSU1TX1BFUl9QQUdFKTtcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsQ2xhaW1zICUgQ0xBSU1TX1BFUl9QQUdFO1xuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnVsbFBhZ2VzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxQYWdlcyArIDE7XG4gICAgfVxuICB9LFxuICBkZXRlcm1pbmVQcmV2aW91c1BhZ2UgKGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gMTtcbiAgfSxcbiAgZGV0ZXJtaW5lTmV4dFBhZ2UgKHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlICsgMTtcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxDbGFpbXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNsYWltcy5sZW5ndGg7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJjb25zdCB7IGdldENoYW5uZWxEYXRhIH0gPSByZXF1aXJlKCdjb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGRhdGEgZm9yIGEgY2hhbm5lbFxuXG4qL1xuXG5jb25zdCBjaGFubmVsRGF0YSA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgbGV0IGNoYW5uZWxDbGFpbUlkID0gcGFyYW1zLmNoYW5uZWxDbGFpbUlkO1xuICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICBnZXRDaGFubmVsRGF0YShjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIDApXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbERhdGE7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jaGFubmVsRGF0YS5qcyIsImNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG5yb3V0ZSB0byBnZXQgYSBzaG9ydCBjaGFubmVsIGlkIGZyb20gbG9uZyBjaGFubmVsIElkXG5cbiovXG5cbmNvbnN0IGNoYW5uZWxTaG9ydElkUm91dGUgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAudGhlbihzaG9ydElkID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNob3J0SWQpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhbm5lbFNob3J0SWRSb3V0ZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NoYW5uZWxTaG9ydElkLmpzIiwiY29uc3QgeyBjbGFpbU5hbWVJc0F2YWlsYWJsZSB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgdGhpcyBzaXRlIHB1Ymxpc2hlZCB0byBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltQXZhaWxhYmlsaXR5ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdCk7XG4gICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdjbGFpbSBuYW1lIGF2YWlsYWJpbGl0eScsIG5hbWUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltQXZhaWxhYmlsaXR5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1BdmFpbGFiaWxpdHkuanMiLCJjb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgZGIgPSByZXF1aXJlKCdtb2RlbHMnKTtcblxuLypcblxuICByb3V0ZSB0byByZXR1cm4gZGF0YSBmb3IgYSBjbGFpbVxuXG4qL1xuXG5jb25zdCBjbGFpbURhdGEgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2xhaW1OYW1lID0gcGFyYW1zLmNsYWltTmFtZTtcbiAgbGV0IGNsYWltSWQgPSBwYXJhbXMuY2xhaW1JZDtcbiAgaWYgKGNsYWltSWQgPT09ICdub25lJykgY2xhaW1JZCA9IG51bGw7XG4gIGRiLkNsYWltLnJlc29sdmVDbGFpbShjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgLnRoZW4oY2xhaW1JbmZvID0+IHtcbiAgICAgIGlmICghY2xhaW1JbmZvKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBjbGFpbSBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBjbGFpbUluZm99KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltRGF0YTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXBpL2NsYWltRGF0YS5qcyIsImNvbnN0IHsgZ2V0Q2xhaW0gfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSwgY3JlYXRlRmlsZURhdGEgfSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIGdldCBhIGNsYWltXG5cbiovXG5cbmNvbnN0IGNsYWltR2V0ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwYXJhbXMubmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAvLyByZXNvbHZlIHRoZSBjbGFpbVxuICBkYi5DbGFpbS5yZXNvbHZlQ2xhaW0obmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihyZXNvbHZlUmVzdWx0ID0+IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSBhIGNsYWltIGFjdHVhbGx5IGV4aXN0cyBhdCB0aGF0IHVyaVxuICAgICAgaWYgKCFyZXNvbHZlUmVzdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWF0Y2hpbmcgdXJpIGZvdW5kIGluIENsYWltIHRhYmxlJyk7XG4gICAgICB9XG4gICAgICBsZXQgZmlsZURhdGEgPSBjcmVhdGVGaWxlRGF0YShyZXNvbHZlUmVzdWx0KTtcbiAgICAgIC8vIGdldCB0aGUgY2xhaW1cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZURhdGEsIGdldENsYWltKGAke25hbWV9IyR7Y2xhaW1JZH1gKV0pO1xuICAgIH0pXG4gICAgLnRoZW4oKFsgZmlsZURhdGEsIGdldFJlc3VsdCBdKSA9PiB7XG4gICAgICBmaWxlRGF0YSA9IGFkZEdldFJlc3VsdHNUb0ZpbGVEYXRhKGZpbGVEYXRhLCBnZXRSZXN1bHQpO1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZURhdGEsIHtuYW1lLCBjbGFpbUlkfSwgJ0ZpbGUnKSwgZ2V0UmVzdWx0XSk7XG4gICAgfSlcbiAgICAudGhlbigoWyBmaWxlUmVjb3JkLCB7bWVzc2FnZSwgY29tcGxldGVkfSBdKSA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2UsIGNvbXBsZXRlZCB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltR2V0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1HZXQuanMiLCJjb25zdCB7IGdldENsYWltSWQgfSA9IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgTk9fQ0hBTk5FTCA9ICdOT19DSEFOTkVMJztcbmNvbnN0IE5PX0NMQUlNID0gJ05PX0NMQUlNJztcblxuLypcblxuICByb3V0ZSB0byBnZXQgYSBsb25nIGNsYWltIGlkXG5cbiovXG5cbmNvbnN0IGNsYWltTG9uZ0lkID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gYm9keS5jaGFubmVsTmFtZTtcbiAgY29uc3QgY2hhbm5lbENsYWltSWQgPSBib2R5LmNoYW5uZWxDbGFpbUlkO1xuICBjb25zdCBjbGFpbU5hbWUgPSBib2R5LmNsYWltTmFtZTtcbiAgY29uc3QgY2xhaW1JZCA9IGJvZHkuY2xhaW1JZDtcbiAgZ2V0Q2xhaW1JZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjbGFpbSBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgIH1cbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXN1bHR9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBoYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYWltTG9uZ0lkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1Mb25nSWQuanMiLCJjb25zdCB7IGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcywgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcywgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHksIHBhcnNlUHVibGlzaEFwaVJlcXVlc3RGaWxlcyB9ID0gcmVxdWlyZSgnaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgeyBjbGFpbU5hbWVJc0F2YWlsYWJsZSwgcHVibGlzaCB9ID0gcmVxdWlyZSgnY29udHJvbGxlcnMvcHVibGlzaENvbnRyb2xsZXIuanMnKTtcbmNvbnN0IHsgYXV0aGVudGljYXRlVXNlciB9ID0gcmVxdWlyZSgnYXV0aC9hdXRoZW50aWNhdGlvbi5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgaGFuZGxlRXJyb3JSZXNwb25zZSB9ID0gcmVxdWlyZSgnaGVscGVycy9lcnJvckhhbmRsZXJzLmpzJyk7XG5jb25zdCB7IGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCdzaXRlQ29uZmlnLmpzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gcHVibGlzaCBhIGNsYWltIHRocm91Z2ggdGhlIGRhZW1vblxuXG4qL1xuXG5jb25zdCBjbGFpbVB1Ymxpc2ggPSAoeyBib2R5LCBmaWxlcywgaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsLCB1c2VyIH0sIHJlcykgPT4ge1xuICAvLyBkZWZpbmUgdmFyaWFibGVzXG4gIGxldCAgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCBkZXNjcmlwdGlvbiwgZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgZ2FTdGFydFRpbWUsIGxpY2Vuc2UsIG5hbWUsIG5zZncsIHRodW1ibmFpbCwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZSwgdGl0bGU7XG4gIC8vIHJlY29yZCB0aGUgc3RhcnQgdGltZSBvZiB0aGUgcmVxdWVzdFxuICBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIC8vIHZhbGlkYXRlIHRoZSBib2R5IGFuZCBmaWxlcyBvZiB0aGUgcmVxdWVzdFxuICB0cnkge1xuICAgIC8vIHZhbGlkYXRlQXBpUHVibGlzaFJlcXVlc3QoYm9keSwgZmlsZXMpO1xuICAgICh7bmFtZSwgbnNmdywgbGljZW5zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCB0aHVtYm5haWx9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkoYm9keSkpO1xuICAgICh7ZmlsZU5hbWUsIGZpbGVQYXRoLCBmaWxlVHlwZSwgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVQYXRoLCB0aHVtYm5haWxGaWxlVHlwZX0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0RmlsZXMoZmlsZXMpKTtcbiAgICAoe2NoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZH0gPSBib2R5KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gY2hlY2sgY2hhbm5lbCBhdXRob3JpemF0aW9uXG4gIFByb21pc2VcbiAgICAuYWxsKFtcbiAgICAgIGF1dGhlbnRpY2F0ZVVzZXIoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSxcbiAgICAgIGNsYWltTmFtZUlzQXZhaWxhYmxlKG5hbWUpLFxuICAgICAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zKGZpbGVQYXRoLCBuYW1lLCB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncsIHRodW1ibmFpbCksXG4gICAgICBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zKHRodW1ibmFpbEZpbGVQYXRoLCBuYW1lLCBsaWNlbnNlLCBuc2Z3KSxcbiAgICBdKVxuICAgIC50aGVuKChbe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0sIHZhbGlkYXRlZENsYWltTmFtZSwgcHVibGlzaFBhcmFtcywgdGh1bWJuYWlsUHVibGlzaFBhcmFtc10pID0+IHtcbiAgICAgIC8vIGFkZCBjaGFubmVsIGRldGFpbHMgdG8gdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9uYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9pZCddID0gY2hhbm5lbENsYWltSWQ7XG4gICAgICB9XG4gICAgICAvLyBwdWJsaXNoIHRoZSB0aHVtYm5haWxcbiAgICAgIGlmICh0aHVtYm5haWxQdWJsaXNoUGFyYW1zKSB7XG4gICAgICAgIHB1Ymxpc2godGh1bWJuYWlsUHVibGlzaFBhcmFtcywgdGh1bWJuYWlsRmlsZU5hbWUsIHRodW1ibmFpbEZpbGVUeXBlKTtcbiAgICAgIH1cbiAgICAgIC8vIHB1Ymxpc2ggdGhlIGFzc2V0XG4gICAgICByZXR1cm4gcHVibGlzaChwdWJsaXNoUGFyYW1zLCBmaWxlTmFtZSwgZmlsZVR5cGUpO1xuICAgIH0pXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogJ3B1Ymxpc2ggY29tcGxldGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICAgIGRhdGEgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGNsYWltSWQ6IHJlc3VsdC5jbGFpbV9pZCxcbiAgICAgICAgICB1cmwgICAgOiBgJHtob3N0fS8ke3Jlc3VsdC5jbGFpbV9pZH0vJHtuYW1lfWAsXG4gICAgICAgICAgbGJyeVR4IDogcmVzdWx0LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICAvLyByZWNvcmQgdGhlIHB1Ymxpc2ggZW5kIHRpbWUgYW5kIHNlbmQgdG8gZ29vZ2xlIGFuYWx5dGljc1xuICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAncHVibGlzaCcsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFpbVB1Ymxpc2g7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2FwaS9jbGFpbVB1Ymxpc2guanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJ21vZGVscycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXV0aGVudGljYXRlVXNlciAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkLCB1c2VyKSB7XG4gICAgLy8gY2FzZTogbm8gY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgKGFub255bW91cyksIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB1c2VyIHRva2VuIGlzIHByb3ZpZGVkXG4gICAgaWYgKCFjaGFubmVsTmFtZSAmJiAhY2hhbm5lbElkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGFubmVsTmFtZSAgIDogbnVsbCxcbiAgICAgICAgY2hhbm5lbENsYWltSWQ6IG51bGwsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBjYXNlOiBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCB3aXRoIHVzZXIgdG9rZW5cbiAgICBpZiAodXNlcikge1xuICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxOYW1lICE9PSB1c2VyLmNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgbmFtZSBkb2VzIG5vdCBtYXRjaCB1c2VyIGNyZWRlbnRpYWxzJyk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbm5lbElkICYmIGNoYW5uZWxJZCAhPT0gdXNlci5jaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBwcm92aWRlZCBjaGFubmVsIGlkIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiB1c2VyLmNoYW5uZWxOYW1lLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogdXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggcGFzc3dvcmQgaW5zdGVhZCBvZiB1c2VyIHRva2VuXG4gICAgaWYgKCFjaGFubmVsUGFzc3dvcmQpIHRocm93IG5ldyBFcnJvcignbm8gY2hhbm5lbCBwYXNzd29yZCBwcm92aWRlZCcpO1xuICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cy5hdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCwgY2hhbm5lbFBhc3N3b3JkKTtcbiAgfSxcbiAgYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCB1c2VyUGFzc3dvcmQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaG9pc3RlZCB2YXJpYWJsZXNcbiAgICAgIGxldCBjaGFubmVsRGF0YTtcbiAgICAgIC8vIGJ1aWxkIHRoZSBwYXJhbXMgZm9yIGZpbmRpbmcgdGhlIGNoYW5uZWxcbiAgICAgIGxldCBjaGFubmVsRmluZFBhcmFtcyA9IHt9O1xuICAgICAgaWYgKGNoYW5uZWxOYW1lKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbE5hbWUnXSA9IGNoYW5uZWxOYW1lO1xuICAgICAgaWYgKGNoYW5uZWxJZCkgY2hhbm5lbEZpbmRQYXJhbXNbJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsSWQ7XG4gICAgICAvLyBmaW5kIHRoZSBjaGFubmVsXG4gICAgICBkYi5DaGFubmVsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICB3aGVyZTogY2hhbm5lbEZpbmRQYXJhbXMsXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAgIGlmICghY2hhbm5lbCkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdubyBjaGFubmVsIGZvdW5kJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hhbm5lbERhdGEgPSBjaGFubmVsLmdldCgpO1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBkYXRhOicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgICByZXR1cm4gZGIuVXNlci5maW5kT25lKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IHVzZXJOYW1lOiBjaGFubmVsRGF0YS5jaGFubmVsTmFtZS5zdWJzdHJpbmcoMSkgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIHVzZXIgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQodXNlclBhc3N3b3JkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ2luY29ycmVjdCBwYXNzd29yZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnLi4ucGFzc3dvcmQgd2FzIGEgbWF0Y2guLi4nKTtcbiAgICAgICAgICByZXNvbHZlKGNoYW5uZWxEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvYXV0aC9hdXRoZW50aWNhdGlvbi5qcyIsImNvbnN0IHsgcmVzb2x2ZVVyaSB9ID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5QXBpLmpzJyk7XG5jb25zdCB7IGhhbmRsZUVycm9yUmVzcG9uc2UgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuXG4vKlxuXG4gIHJvdXRlIHRvIHJ1biBhIHJlc29sdmUgcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG5cbiovXG5cbmNvbnN0IGNsYWltUmVzb2x2ZSA9ICh7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICByZXNvbHZlVXJpKGAke3BhcmFtcy5uYW1lfSMke3BhcmFtcy5jbGFpbUlkfWApXG4gICAgLnRoZW4ocmVzb2x2ZWRVcmkgPT4ge1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzb2x2ZWRVcmkpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1SZXNvbHZlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1SZXNvbHZlLmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gZ2V0IGEgc2hvcnQgY2xhaW0gaWQgZnJvbSBsb25nIGNsYWltIElkXG5cbiovXG5cbmNvbnN0IGNsYWltU2hvcnRJZCA9ICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICBkYi5DbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQocGFyYW1zLmxvbmdJZCwgcGFyYW1zLm5hbWUpXG4gICAgLnRoZW4oc2hvcnRJZCA9PiB7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogc2hvcnRJZH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1TaG9ydElkO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1TaG9ydElkLmpzIiwiY29uc3QgeyBnZXRDbGFpbUxpc3QgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuLypcblxuICByb3V0ZSB0byBnZXQgbGlzdCBvZiBjbGFpbXNcblxuKi9cblxuY29uc3QgY2xhaW1MaXN0ID0gKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gIGdldENsYWltTGlzdChwYXJhbXMubmFtZSlcbiAgICAudGhlbihjbGFpbXNMaXN0ID0+IHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGNsYWltc0xpc3QpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhaW1MaXN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvY2xhaW1MaXN0LmpzIiwiY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCdoZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMnKTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnbW9kZWxzJyk7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VlIGlmIGFzc2V0IGlzIGF2YWlsYWJsZSBsb2NhbGx5XG5cbiovXG5cbmNvbnN0IGZpbGVBdmFpbGFiaWxpdHkgPSAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gIGRiLkZpbGVcbiAgICAuZmluZE9uZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBuYW1lLFxuICAgICAgICBjbGFpbUlkLFxuICAgICAgfSxcbiAgICB9KVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogdHJ1ZX0pO1xuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGZhbHNlfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWxlQXZhaWxhYmlsaXR5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGkvZmlsZUF2YWlsYWJpbGl0eS5qcyIsImNvbnN0IG11bHRpcGFydCA9IHJlcXVpcmUoJ2Nvbm5lY3QtbXVsdGlwYXJ0eScpO1xyXG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgdXBsb2FkRGlyZWN0b3J5IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcclxuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IG11bHRpcGFydCh7dXBsb2FkRGlyOiB1cGxvYWREaXJlY3Rvcnl9KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbXVsdGlwYXJ0TWlkZGxld2FyZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvbXVsdGlwYXJ0TWlkZGxld2FyZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtbXVsdGlwYXJ0eVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiXG4vLyBtb2R1bGUgaWQgPSAxNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgaGFuZGxlUGFnZVJlcXVlc3QgPSByZXF1aXJlKCcuL3NlbmRSZWFjdEFwcCcpO1xuY29uc3QgaGFuZGxlRW1iZWRSZXF1ZXN0ID0gcmVxdWlyZSgnLi9zZW5kRW1iZWRQYWdlJyk7XG5jb25zdCByZWRpcmVjdCA9IHJlcXVpcmUoJy4vcmVkaXJlY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoYXBwKSA9PiB7XG4gIGFwcC5nZXQoJy8nLCBoYW5kbGVQYWdlUmVxdWVzdCk7XG4gIGFwcC5nZXQoJy9sb2dpbicsIGhhbmRsZVBhZ2VSZXF1ZXN0KTtcbiAgYXBwLmdldCgnL2Fib3V0JywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvdHJlbmRpbmcnLCByZWRpcmVjdCgnL3BvcHVsYXInKSk7XG4gIGFwcC5nZXQoJy9wb3B1bGFyJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvbmV3JywgaGFuZGxlUGFnZVJlcXVlc3QpO1xuICBhcHAuZ2V0KCcvZW1iZWQvOmNsYWltSWQvOm5hbWUnLCBoYW5kbGVFbWJlZFJlcXVlc3QpOyAgLy8gcm91dGUgdG8gc2VuZCBlbWJlZGFibGUgdmlkZW8gcGxheWVyIChmb3IgdHdpdHRlcilcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL2luZGV4LmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxuY29uc3Qgc2VuZFJlYWN0QXBwID0gKHJlcSwgcmVzKSA9PiB7XG4gIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUmVhY3RBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRSZWFjdEFwcC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPR0lOIH0gZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcbmNvbnN0IHsgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRpc2FibGVkICAgICAgICAgIDogcHVibGlzaGluZy5kaXNhYmxlZCxcbiAgZGlzYWJsZWRNZXNzYWdlICAgOiBwdWJsaXNoaW5nLmRpc2FibGVkTWVzc2FnZSxcbiAgcHVibGlzaEluQ2hhbm5lbCAgOiBmYWxzZSxcbiAgc2VsZWN0ZWRDaGFubmVsICAgOiBMT0dJTixcbiAgc2hvd01ldGFkYXRhSW5wdXRzOiBmYWxzZSxcbiAgc3RhdHVzICAgICAgICAgICAgOiB7XG4gICAgc3RhdHVzIDogbnVsbCxcbiAgICBtZXNzYWdlOiBudWxsLFxuICB9LFxuICBlcnJvcjoge1xuICAgIGZpbGUgICAgICAgICA6IG51bGwsXG4gICAgdXJsICAgICAgICAgIDogbnVsbCxcbiAgICBjaGFubmVsICAgICAgOiBudWxsLFxuICAgIHB1Ymxpc2hTdWJtaXQ6IG51bGwsXG4gIH0sXG4gIGZpbGUgICAgOiBudWxsLFxuICBjbGFpbSAgIDogJycsXG4gIG1ldGFkYXRhOiB7XG4gICAgdGl0bGUgICAgICA6ICcnLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBsaWNlbnNlICAgIDogJycsXG4gICAgbnNmdyAgICAgICA6IGZhbHNlLFxuICB9LFxuICB0aHVtYm5haWw6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLkZJTEVfU0VMRUNURUQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgaW5pdGlhbFN0YXRlLCB7ICAvLyBub3RlOiBjbGVhcnMgdG8gaW5pdGlhbCBzdGF0ZVxuICAgICAgICBmaWxlOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0NMRUFSOlxuICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbiAgICBjYXNlIGFjdGlvbnMuTUVUQURBVEFfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIG1ldGFkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5tZXRhZGF0YSwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNMQUlNX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjbGFpbTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBwdWJsaXNoSW5DaGFubmVsOiBhY3Rpb24uY2hhbm5lbCxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc3RhdHVzOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5FUlJPUl9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZXJyb3I6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmVycm9yLCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLm5hbWVdOiBhY3Rpb24uZGF0YS52YWx1ZSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuU0VMRUNURURfQ0hBTk5FTF9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgc2VsZWN0ZWRDaGFubmVsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5UT0dHTEVfTUVUQURBVEFfSU5QVVRTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNob3dNZXRhZGF0YUlucHV0czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVEhVTUJOQUlMX05FVzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICB0aHVtYm5haWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL3B1Ymxpc2guanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbG9nZ2VkSW5DaGFubmVsOiB7XG4gICAgbmFtZSAgIDogbnVsbCxcbiAgICBzaG9ydElkOiBudWxsLFxuICAgIGxvbmdJZCA6IG51bGwsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGxvZ2dlZEluQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvY2hhbm5lbC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPQ0FMX0NIRUNLLCBFUlJPUiB9IGZyb20gJ2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgcmVxdWVzdDoge1xuICAgIGVycm9yOiBudWxsLFxuICAgIHR5cGUgOiBudWxsLFxuICAgIGlkICAgOiBudWxsLFxuICB9LFxuICByZXF1ZXN0TGlzdCA6IHt9LFxuICBjaGFubmVsTGlzdCA6IHt9LFxuICBhc3NldExpc3QgICA6IHt9LFxuICBkaXNwbGF5QXNzZXQ6IHtcbiAgICBlcnJvciA6IG51bGwsXG4gICAgc3RhdHVzOiBMT0NBTF9DSEVDSyxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAvLyBoYW5kbGUgcmVxdWVzdFxuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHJlcXVlc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3QsIHtcbiAgICAgICAgICB0eXBlOiBhY3Rpb24uZGF0YS5yZXF1ZXN0VHlwZSxcbiAgICAgICAgICBpZCAgOiBhY3Rpb24uZGF0YS5yZXF1ZXN0SWQsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gc3RvcmUgcmVxdWVzdHNcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9MSVNUX0FERDpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVxdWVzdExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uLmRhdGEuZXJyb3IsXG4gICAgICAgICAgICBrZXkgIDogYWN0aW9uLmRhdGEua2V5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gYXNzZXQgZGF0YVxuICAgIGNhc2UgYWN0aW9ucy5BU1NFVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgYXNzZXRMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hc3NldExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuaWRdOiB7XG4gICAgICAgICAgICBlcnJvciAgICA6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAgbmFtZSAgICAgOiBhY3Rpb24uZGF0YS5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgOiBhY3Rpb24uZGF0YS5jbGFpbUlkLFxuICAgICAgICAgICAgc2hvcnRJZCAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1EYXRhOiBhY3Rpb24uZGF0YS5jbGFpbURhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAvLyBjaGFubmVsIGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQ0hBTk5FTF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2hhbm5lbExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgbmFtZSAgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGxvbmdJZCAgICA6IGFjdGlvbi5kYXRhLmxvbmdJZCxcbiAgICAgICAgICAgIHNob3J0SWQgICA6IGFjdGlvbi5kYXRhLnNob3J0SWQsXG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQ0xBSU1TX1VQREFURV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5jaGFubmVsTGlzdElkXTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3RbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF0sIHtcbiAgICAgICAgICAgIGNsYWltc0RhdGE6IGFjdGlvbi5kYXRhLmNsYWltc0RhdGEsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gZGlzcGxheSBhbiBhc3NldFxuICAgIGNhc2UgYWN0aW9ucy5GSUxFX0FWQUlMQUJJTElUWV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZGlzcGxheUFzc2V0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5kaXNwbGF5QXNzZXQsIHtcbiAgICAgICAgICBzdGF0dXM6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5ESVNQTEFZX0FTU0VUX0VSUk9SOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgZXJyb3IgOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgICBzdGF0dXM6IEVSUk9SLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwiY29uc3Qgc2l0ZUNvbmZpZyA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qge1xuICBhbmFseXRpY3M6IHtcbiAgICBnb29nbGVJZDogZ29vZ2xlQW5hbHl0aWNzSWQsXG4gIH0sXG4gIGFzc2V0RGVmYXVsdHM6IHtcbiAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXG4gICAgZGVzY3JpcHRpb246IGRlZmF1bHREZXNjcmlwdGlvbixcbiAgfSxcbiAgZGV0YWlsczoge1xuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhvc3QsXG4gICAgdGl0bGUsXG4gICAgdHdpdHRlcixcbiAgfSxcbn0gPSBzaXRlQ29uZmlnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGRlc2NyaXB0aW9uLFxuICBnb29nbGVBbmFseXRpY3NJZCxcbiAgaG9zdCxcbiAgdGl0bGUsXG4gIHR3aXR0ZXIsXG4gIGRlZmF1bHREZXNjcmlwdGlvbixcbiAgZGVmYXVsdFRodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2l0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWdhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZ2FcIlxuLy8gbW9kdWxlIGlkID0gMTY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHsgY3VzdG9tQ29tcG9uZW50cyB9ID0gcmVxdWlyZSgnc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBnZXREZWVwZXN0Q2hpbGRWYWx1ZSAocGFyZW50LCBjaGlsZHJlbktleXMpIHtcbiAgaWYgKCFwYXJlbnRbY2hpbGRyZW5LZXlzWzBdXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGxldCBjaGlsZEtleSA9IGNoaWxkcmVuS2V5cy5zaGlmdCgpOyAvLyAuc2hpZnQoKSByZXRyaWV2ZXMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYXJyYXkgYW5kIHJlbW92ZXMgaXQgZnJvbSBhcnJheVxuICBsZXQgY2hpbGQgPSBwYXJlbnRbY2hpbGRLZXldO1xuICBpZiAoY2hpbGRyZW5LZXlzLmxlbmd0aCA+PSAxKSB7XG4gICAgcmV0dXJuIGdldERlZXBlc3RDaGlsZFZhbHVlKGNoaWxkLCBjaGlsZHJlbktleXMpO1xuICB9XG4gIHJldHVybiBjaGlsZDtcbn1cblxuZXhwb3J0IGNvbnN0IGR5bmFtaWNJbXBvcnQgPSAoZmlsZVBhdGgpID0+IHtcbiAgLy8gdmFsaWRhdGUgaW5wdXRzXG4gIGlmICghZmlsZVBhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcGF0aCBwcm92aWRlZCB0byBkeW5hbWljSW1wb3J0KCknKTtcbiAgfVxuICBpZiAodHlwZW9mIGZpbGVQYXRoICE9PSAnc3RyaW5nJykge1xuICAgIGNvbnNvbGUubG9nKCdkeW5hbWljSW1wb3J0ID4gZmlsZVBhdGg6JywgZmlsZVBhdGgpO1xuICAgIGNvbnNvbGUubG9nKCdkeW5hbWljSW1wb3J0ID4gZmlsZVBhdGggdHlwZTonLCB0eXBlb2YgZmlsZVBhdGgpO1xuICAgIHRocm93IG5ldyBFcnJvcignZmlsZSBwYXRoIHByb3ZpZGVkIHRvIGR5bmFtaWNJbXBvcnQoKSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gIH1cbiAgaWYgKCFjdXN0b21Db21wb25lbnRzKSB7XG4gICAgY29uc29sZS5sb2coJ05vIGN1c3RvbUNvbXBvbmVudHMgZm91bmQgaW4gc2l0ZUNvbmZpZy5qcycpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIHNwbGl0IG91dCB0aGUgZmlsZSBmb2xkZXJzICAvLyBmaWx0ZXIgb3V0IGFueSBlbXB0eSBvciB3aGl0ZS1zcGFjZS1vbmx5IHN0cmluZ3NcbiAgY29uc3QgZm9sZGVycyA9IGZpbGVQYXRoLnNwbGl0KCcvJykuZmlsdGVyKGZvbGRlck5hbWUgPT4gZm9sZGVyTmFtZS5yZXBsYWNlKC9cXHMvZywgJycpLmxlbmd0aCk7XG4gIC8vIGNoZWNrIGZvciB0aGUgY29tcG9uZW50IGNvcnJlc3BvbmRpbmcgdG8gZmlsZSBwYXRoIGluIHRoZSBzaXRlIGNvbmZpZyBvYmplY3RcbiAgLy8gaS5lLiBjdXN0b21Db21wb25lbnRzW2ZvbGRlcnNbMF1dW2ZvbGRlcnNbMl1bLi4uXVtmb2xkZXJzW25dXVxuICBjb25zdCBjb21wb25lbnQgPSBnZXREZWVwZXN0Q2hpbGRWYWx1ZShjdXN0b21Db21wb25lbnRzLCBmb2xkZXJzKTtcbiAgaWYgKGNvbXBvbmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdGb3VuZCBjdXN0b20gY29tcG9uZW50OicsIGNvbXBvbmVudCk7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnRm91bmQgY3VzdG9tIGNvbXBvbmVudDonLCBjb21wb25lbnQpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2R5bmFtaWNJbXBvcnQuanMiLCJleHBvcnQgY29uc3QgY3JlYXRlUGFnZVRpdGxlID0gKHNpdGVUaXRsZSwgcGFnZVRpdGxlKSA9PiB7XG4gIGlmICghcGFnZVRpdGxlKSB7XG4gICAgcmV0dXJuIGAke3NpdGVUaXRsZX1gO1xuICB9XG4gIHJldHVybiBgJHtzaXRlVGl0bGV9IC0gJHtwYWdlVGl0bGV9YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwiY29uc3QgZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZSA9ICh0aHVtYm5haWwpID0+IHtcbiAgaWYgKHRodW1ibmFpbCkge1xuICAgIGNvbnN0IGZpbGVFeHQgPSB0aHVtYm5haWwuc3Vic3RyaW5nKHRodW1ibmFpbC5sYXN0SW5kZXhPZignLicpKTtcbiAgICBzd2l0Y2ggKGZpbGVFeHQpIHtcbiAgICAgIGNhc2UgJ2pwZWcnOlxuICAgICAgY2FzZSAnanBnJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICAgIGNhc2UgJ3BuZyc6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvcG5nJztcbiAgICAgIGNhc2UgJ2dpZic6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvZ2lmJztcbiAgICAgIGNhc2UgJ21wNCc6XG4gICAgICAgIHJldHVybiAndmlkZW8vbXA0JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnaW1hZ2UvanBlZyc7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn07XG5cbmNvbnN0IGNyZWF0ZUJhc2ljTWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlcikgPT4ge1xuICByZXR1cm4gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaXRlSG9zdH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNpdGVEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdzdW1tYXJ5J30sXG4gIF07XG59O1xuXG5jb25zdCBjcmVhdGVDaGFubmVsTWV0YVRhZ3MgPSAoc2l0ZVRpdGxlLCBzaXRlSG9zdCwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBgJHtuYW1lfSBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogYCR7bmFtZX0sIGEgY2hhbm5lbCBvbiAke3NpdGVUaXRsZX1gfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0TWV0YVRhZ3MgPSAoc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGEgfSA9IGFzc2V0O1xuICBjb25zdCB7IGNvbnRlbnRUeXBlIH0gPSBjbGFpbURhdGE7XG4gIGNvbnN0IGVtYmVkVXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc2hvd1VybCA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfWA7XG4gIGNvbnN0IHNvdXJjZSA9IGAke3NpdGVIb3N0fS8ke2NsYWltRGF0YS5jbGFpbUlkfS8ke2NsYWltRGF0YS5uYW1lfS4ke2NsYWltRGF0YS5maWxlRXh0fWA7XG4gIGNvbnN0IG9nVGl0bGUgPSBjbGFpbURhdGEudGl0bGUgfHwgY2xhaW1EYXRhLm5hbWU7XG4gIGNvbnN0IG9nRGVzY3JpcHRpb24gPSBjbGFpbURhdGEuZGVzY3JpcHRpb24gfHwgZGVmYXVsdERlc2NyaXB0aW9uO1xuICBjb25zdCBvZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gZGV0ZXJtaW5lT2dUaHVtYm5haWxDb250ZW50VHlwZShjbGFpbURhdGEudGh1bWJuYWlsKTtcbiAgY29uc3Qgb2dUaHVtYm5haWwgPSBjbGFpbURhdGEudGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWw7XG4gIGNvbnN0IG1ldGFUYWdzID0gW1xuICAgIHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogb2dUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6dXJsJywgY29udGVudDogc2hvd1VybH0sXG4gICAge3Byb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogc2l0ZVRpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IG9nRGVzY3JpcHRpb259LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOndpZHRoJywgY29udGVudDogNjAwfSxcbiAgICB7cHJvcGVydHk6ICdvZzppbWFnZTpoZWlnaHQnLCBjb250ZW50OiAzMTV9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgXTtcbiAgaWYgKGNvbnRlbnRUeXBlID09PSAndmlkZW8vbXA0JyB8fCBjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL3dlYm0nKSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbycsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86c2VjdXJlX3VybCcsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dmlkZW86dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IG9nVGh1bWJuYWlsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZTp0eXBlJywgY29udGVudDogb2dUaHVtYm5haWxDb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICd2aWRlbyd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6Y2FyZCcsIGNvbnRlbnQ6ICdwbGF5ZXInfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcicsIGNvbnRlbnQ6IGVtYmVkVXJsfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjp3aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjp0ZXh0OnBsYXllcl93aWR0aCcsIGNvbnRlbnQ6IDYwMH0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6aGVpZ2h0JywgY29udGVudDogMzM3fSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpzdHJlYW0nLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbTpjb250ZW50X3R5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICB9IGVsc2Uge1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBzb3VyY2V9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBjb250ZW50VHlwZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICdhcnRpY2xlJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnfSk7XG4gIH1cbiAgcmV0dXJuIG1ldGFUYWdzO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU1ldGFUYWdzID0gKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpID0+IHtcbiAgaWYgKGFzc2V0KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFzc2V0TWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICB9O1xuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsTWV0YVRhZ3Moc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGNoYW5uZWwpO1xuICB9O1xuICByZXR1cm4gY3JlYXRlQmFzaWNNZXRhVGFncyhzaXRlRGVzY3JpcHRpb24sIHNpdGVIb3N0LCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvbWV0YVRhZ3MuanMiLCJjb25zdCBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsgPSAocGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke3BhZ2V9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayA9IChhc3NldCwgc2l0ZUhvc3QpID0+IHtcbiAgbGV0IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkO1xuICBpZiAoYXNzZXQuY2xhaW1EYXRhKSB7XG4gICAgKHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YSk7XG4gIH07XG4gIGlmIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfS8ke25hbWV9YDtcbiAgfTtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NsYWltSWR9LyR7bmFtZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsgPSAoY2hhbm5lbCwgc2l0ZUhvc3QpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbm9uaWNhbExpbmsgPSAoYXNzZXQsIGNoYW5uZWwsIHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsoYXNzZXQsIHNpdGVIb3N0KTtcbiAgfVxuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayhjaGFubmVsLCBzaXRlSG9zdCk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayhwYWdlLCBzaXRlSG9zdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNyb3NzLWZldGNoL3BvbHlmaWxsXCJcbi8vIG1vZHVsZSBpZCA9IDE3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsaWRhdGVGaWxlIChmaWxlKSB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcHJvdmlkZWQnKTtcbiAgICB9XG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgc2l6ZSBhbmQgdHlwZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgR0lGcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZpbGUudHlwZSArICcgaXMgbm90IGEgc3VwcG9ydGVkIGZpbGUgdHlwZS4gT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsImV4cG9ydCBjb25zdCBMT0FEX1NUQVJUID0gJ0xPQURfU1RBUlQnO1xuZXhwb3J0IGNvbnN0IExPQURJTkcgPSAnTE9BRElORyc7XG5leHBvcnQgY29uc3QgUFVCTElTSElORyA9ICdQVUJMSVNISU5HJztcbmV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IEZBSUxFRCA9ICdGQUlMRUQnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcy5qcyIsImNvbnN0IHsgZGV0YWlsczogeyBob3N0IH0gfSA9IHJlcXVpcmUoJ3NpdGVDb25maWcuanMnKTtcblxuY29uc3Qgc2VuZEVtYmVkUGFnZSA9ICh7IHBhcmFtcyB9LCByZXMpID0+IHtcbiAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gIC8vIGdldCBhbmQgcmVuZGVyIHRoZSBjb250ZW50XG4gIHJlcy5zdGF0dXMoMjAwKS5yZW5kZXIoJ2VtYmVkJywgeyBsYXlvdXQ6ICdlbWJlZCcsIGhvc3QsIGNsYWltSWQsIG5hbWUgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbmRFbWJlZFBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3NlbmRFbWJlZFBhZ2UuanMiLCJjb25zdCByZWRpcmVjdCA9IChyb3V0ZSkgPT4ge1xuICByZXR1cm4gKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnN0YXR1cygzMDEpLnJlZGlyZWN0KHJvdXRlKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVkaXJlY3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL3BhZ2VzL3JlZGlyZWN0LmpzIiwiY29uc3Qgc2VydmVBc3NldEJ5Q2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUNsYWltJyk7XG5jb25zdCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0gPSByZXF1aXJlKCcuL3NlcnZlQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHAsIGRiKSA9PiB7XG4gIGFwcC5nZXQoJy86aWRlbnRpZmllci86Y2xhaW0nLCBzZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0pO1xuICBhcHAuZ2V0KCcvOmNsYWltJywgc2VydmVBc3NldEJ5Q2xhaW0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXRzL2luZGV4LmpzIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCdoZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3QgeyBkZXRlcm1pbmVSZXNwb25zZVR5cGUsIGxvZ1JlcXVlc3REYXRhLCBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCB9ID0gcmVxdWlyZSgnaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCdoZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCdoZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgb25seVxuXG4qL1xuXG5jb25zdCBzZXJ2ZXJBc3NldEJ5Q2xhaW0gPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAvLyBkZWNpZGUgaWYgdGhpcyBpcyBhIHNob3cgcmVxdWVzdFxuICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgdHJ5IHtcbiAgICAoeyBoYXNGaWxlRXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlTW9kaWZpZXIocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgcmV0dXJuIGhhbmRsZVNob3dSZW5kZXIocmVxLCByZXMpO1xuICB9XG4gIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gIC8vIHNlbmQgZ29vZ2xlIGFuYWx5dGljc1xuICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gIC8vIHBhcnNlIHRoZSBjbGFpbVxuICBsZXQgY2xhaW1OYW1lO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICBsb2dSZXF1ZXN0RGF0YShyZXNwb25zZVR5cGUsIGNsYWltTmFtZSwgbnVsbCwgbnVsbCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KG51bGwsIG51bGwsIGNsYWltTmFtZSwgbnVsbCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJBc3NldEJ5Q2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlDbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCJcbi8vIG1vZHVsZSBpZCA9IDE4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgb25SZXF1ZXN0RXJyb3IsIG9uTmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IG5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfYXNzZXQnO1xuaW1wb3J0IHsgbmV3Q2hhbm5lbFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2NoYW5uZWwnO1xuaW1wb3J0IGxicnlVcmkgZnJvbSAndXRpbHMvbGJyeVVyaSc7XG5cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0gKG1vZGlmaWVyLCBjbGFpbSkge1xuICAvLyB0aGlzIGlzIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXRcbiAgLy8gY2xhaW0gd2lsbCBiZSBhbiBhc3NldCBjbGFpbVxuICAvLyB0aGUgaWRlbnRpZmllciBjb3VsZCBiZSBhIGNoYW5uZWwgb3IgYSBjbGFpbSBpZFxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQsIGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihtb2RpZmllcikpO1xuICAgICh7IGNsYWltTmFtZSwgZXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgZXh0ZW5zaW9uKSk7XG4gIH07XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIGNsYWltSWQsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUNsYWltT25seSAoY2xhaW0pIHtcbiAgLy8gdGhpcyBjb3VsZCBiZSBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0IG9yIGEgY2hhbm5lbCBwYWdlXG4gIC8vIGNsYWltIGNvdWxkIGJlIGFuIGFzc2V0IGNsYWltIG9yIGEgY2hhbm5lbCBjbGFpbVxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgLy8gcmV0dXJuIGVhcmx5IGlmIHRoaXMgcmVxdWVzdCBpcyBmb3IgYSBjaGFubmVsXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdDaGFubmVsUmVxdWVzdCwgb25OZXdDaGFubmVsUmVxdWVzdChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpKTtcbiAgfVxuICAvLyBpZiBub3QgZm9yIGEgY2hhbm5lbCwgcGFyc2UgdGhlIGNsYWltIHJlcXVlc3RcbiAgbGV0IGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lLCBleHRlbnNpb259ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIGhhbmRsZVNob3dQYWdlVXJpIChhY3Rpb24pIHtcbiAgY29uc3QgeyBpZGVudGlmaWVyLCBjbGFpbSB9ID0gYWN0aW9uLmRhdGE7XG4gIGlmIChpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0sIGlkZW50aWZpZXIsIGNsYWltKTtcbiAgfVxuICB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5LCBjbGFpbSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaEhhbmRsZVNob3dQYWdlVXJpICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSwgaGFuZGxlU2hvd1BhZ2VVcmkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCBhZGRBc3NldFRvQXNzZXRMaXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldExvbmdDbGFpbUlkLCBnZXRTaG9ydElkLCBnZXRDbGFpbURhdGEgfSBmcm9tICdhcGkvYXNzZXRBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0Fzc2V0UmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgbmFtZSwgbW9kaWZpZXIgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBsb25nIGlkICYmIGFkZCByZXF1ZXN0IHRvIHJlcXVlc3QgbGlzdFxuICBsZXQgbG9uZ0lkO1xuICB0cnkge1xuICAgICh7ZGF0YTogbG9uZ0lkfSA9IHlpZWxkIGNhbGwoZ2V0TG9uZ0NsYWltSWQsIGhvc3QsIG5hbWUsIG1vZGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgY29uc3QgYXNzZXRLZXkgPSBgYSMke25hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGFzc2V0S2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgYXNzZXQ/XG4gIC8vIElmIHRoaXMgYXNzZXQgaXMgaW4gdGhlIGFzc2V0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmFzc2V0TGlzdFthc3NldEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgc2hvcnQgSWRcbiAgbGV0IHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBzaG9ydElkfSA9IHlpZWxkIGNhbGwoZ2V0U2hvcnRJZCwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gZ2V0IGFzc2V0IGNsYWltIGRhdGFcbiAgbGV0IGNsYWltRGF0YTtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGNsYWltRGF0YX0gPSB5aWVsZCBjYWxsKGdldENsYWltRGF0YSwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gYWRkIGFzc2V0IHRvIGFzc2V0IGxpc3RcbiAgeWllbGQgcHV0KGFkZEFzc2V0VG9Bc3NldExpc3QoYXNzZXRLZXksIG51bGwsIG5hbWUsIGxvbmdJZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSk7XG4gIC8vIGNsZWFyIGFueSBlcnJvcnMgaW4gcmVxdWVzdCBlcnJvclxuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdBc3NldFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsIG5ld0Fzc2V0UmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvbmdDbGFpbUlkIChob3N0LCBuYW1lLCBtb2RpZmllcikge1xuICBsZXQgYm9keSA9IHt9O1xuICAvLyBjcmVhdGUgcmVxdWVzdCBwYXJhbXNcbiAgaWYgKG1vZGlmaWVyKSB7XG4gICAgaWYgKG1vZGlmaWVyLmlkKSB7XG4gICAgICBib2R5WydjbGFpbUlkJ10gPSBtb2RpZmllci5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keVsnY2hhbm5lbE5hbWUnXSA9IG1vZGlmaWVyLmNoYW5uZWwubmFtZTtcbiAgICAgIGJvZHlbJ2NoYW5uZWxDbGFpbUlkJ10gPSBtb2RpZmllci5jaGFubmVsLmlkO1xuICAgIH1cbiAgfVxuICBib2R5WydjbGFpbU5hbWUnXSA9IG5hbWU7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH07XG4gIC8vIGNyZWF0ZSB1cmxcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2xvbmctaWRgO1xuICAvLyByZXR1cm4gdGhlIHJlcXVlc3QgcHJvbWlzZVxuICByZXR1cm4gUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnRJZCAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vc2hvcnQtaWQvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFpbURhdGEgKGhvc3QsIG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2RhdGEvJHtuYW1lfS8ke2NsYWltSWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwiaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0LCBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgdXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDaGFubmVsRGF0YSB9IGZyb20gJ2FwaS9jaGFubmVsQXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcbmltcG9ydCB7IHNlbGVjdFNpdGVIb3N0IH0gZnJvbSAnc2VsZWN0b3JzL3NpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdDaGFubmVsUmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgbG9uZyBpZFxuICBsZXQgbG9uZ0lkLCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7IGRhdGE6IHtsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdJZCwgc2hvcnRDaGFubmVsQ2xhaW1JZDogc2hvcnRJZH0gfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbERhdGEsIGhvc3QsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgcmVxdWVzdCBpbiB0aGUgY2hhbm5lbCByZXF1ZXN0cyBsaXN0XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSBgYyMke2NoYW5uZWxOYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBjaGFubmVsS2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgY2hhbm5lbD9cbiAgLy8gSWYgdGhpcyBjaGFubmVsIGlzIGluIHRoZSBjaGFubmVsIGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgY2xhaW1zIGRhdGFcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIGNoYW5uZWxOYW1lLCAxKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIGNoYW5uZWwgZGF0YSBpbiB0aGUgY2hhbm5lbCBsaXN0XG4gIHlpZWxkIHB1dChhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdChjaGFubmVsS2V5LCBjaGFubmVsTmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSk7XG4gIC8vIGNsZWFyIGFueSByZXF1ZXN0IGVycm9yc1xuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsIG5ld0NoYW5uZWxSZXF1ZXN0KTtcbn07XG5cbmZ1bmN0aW9uICogZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlIH0gPSBhY3Rpb24uZGF0YTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGxldCBjbGFpbXNEYXRhO1xuICB0cnkge1xuICAgICh7IGRhdGE6IGNsYWltc0RhdGEgfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbENsYWltcywgaG9zdCwgbG9uZ0lkLCBuYW1lLCBwYWdlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgcHV0KHVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgY2xhaW1zRGF0YSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaFVwZGF0ZUNoYW5uZWxDbGFpbXMgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLCBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxEYXRhIChob3N0LCBpZCwgbmFtZSkge1xuICBpZiAoIWlkKSBpZCA9ICdub25lJztcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvZGF0YS8ke25hbWV9LyR7aWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsQ2xhaW1zIChob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpIHtcbiAgaWYgKCFwYWdlKSBwYWdlID0gMTtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvY2xhaW1zLyR7bmFtZX0vJHtsb25nSWR9LyR7cGFnZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXggIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIGFmdGVyIFwiQFwiLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IGNoYW5uZWxDbGFpbUlkIHx8IG51bGwsXG4gICAgICBjbGFpbUlkICAgICAgIDogY2xhaW1JZCB8fCBudWxsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgZXh0ZW5zaW9uKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIGV4dGVuc2lvbiBzZXBhcmF0b3IsIGV4dGVuc2lvbiAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBleHRlbnNpb25TZXBlcmF0b3IsIGV4dGVuc2lvbl0gPSBjb21wb25lbnRzUmVnZXggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMobmFtZSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIi5cIicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIGV4dGVuc2lvblxuICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IpIHtcbiAgICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIi5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIgc2VwYXJhdG9yIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWUuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgICBleHRlbnNpb246IGV4dGVuc2lvbiB8fCBudWxsLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2xicnlVcmkuanMiLCJjb25zdCB7IHNlbmRHQVNlcnZlRXZlbnQgfSA9IHJlcXVpcmUoJ2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzJyk7XG5jb25zdCB7XG4gIGRldGVybWluZVJlc3BvbnNlVHlwZSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSxcbiAgbG9nUmVxdWVzdERhdGEsXG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0LFxufSA9IHJlcXVpcmUoJ2hlbHBlcnMvc2VydmVIZWxwZXJzLmpzJyk7XG5jb25zdCBsYnJ5VXJpID0gcmVxdWlyZSgnaGVscGVycy9sYnJ5VXJpLmpzJyk7XG5jb25zdCBoYW5kbGVTaG93UmVuZGVyID0gcmVxdWlyZSgnaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCcpO1xuXG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbi8qXG5cbiAgcm91dGUgdG8gc2VydmUgYW4gYXNzZXQgb3IgdGhlIHJlYWN0IGFwcCB2aWEgdGhlIGNsYWltIG5hbWUgYW5kIGFuIGlkZW50aWZpZXJcblxuKi9cblxuY29uc3Qgc2VydmVyQXNzZXRCeUlkZW50aWZpZXJBbmRDbGFpbSA9IChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gIGxldCBoYXNGaWxlRXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgbGV0IHJlc3BvbnNlVHlwZSA9IGRldGVybWluZVJlc3BvbnNlVHlwZShoYXNGaWxlRXh0ZW5zaW9uLCBoZWFkZXJzKTtcbiAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gIH1cbiAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gIHNlbmRHQVNlcnZlRXZlbnQoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgLy8gcGFyc2UgdGhlIGNsYWltXG4gIGxldCBjbGFpbU5hbWU7XG4gIHRyeSB7XG4gICAgKHsgY2xhaW1OYW1lIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICB9XG4gIC8vIHBhcnNlIHRoZSBpZGVudGlmaWVyXG4gIGxldCBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZDtcbiAgdHJ5IHtcbiAgICAoeyBpc0NoYW5uZWwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1JZCB9ID0gbGJyeVVyaS5wYXJzZUlkZW50aWZpZXIocGFyYW1zLmlkZW50aWZpZXIpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gIH1cbiAgaWYgKCFpc0NoYW5uZWwpIHtcbiAgICBbY2xhaW1JZCwgY2xhaW1OYW1lXSA9IGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkoY2xhaW1JZCwgY2xhaW1OYW1lKTtcbiAgfVxuICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCk7XG4gIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0KGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZlckFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0cy9zZXJ2ZUFzc2V0QnlJZGVudGlmaWVyQW5kQ2xhaW0uanMiLCJjb25zdCBoYW5kbGVQYWdlUmVxdWVzdCA9IHJlcXVpcmUoJy4vc2VuZFJlYWN0QXBwJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcclxuICBhcHAuZ2V0KCcqJywgaGFuZGxlUGFnZVJlcXVlc3QpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL2luZGV4LmpzIiwiY29uc3QgaGFuZGxlUGFnZVJlbmRlciA9IHJlcXVpcmUoJ2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3gnKTtcblxuY29uc3Qgc2VuZFJlYWN0QXBwID0gKHJlcSwgcmVzKSA9PiB7XG4gIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZW5kUmVhY3RBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2ZhbGxiYWNrL3NlbmRSZWFjdEFwcC5qcyIsInZhciBtYXAgPSB7XG5cdFwiLi9cIjogNTYsXG5cdFwiLi9BYm91dFBhZ2VcIjogNTIsXG5cdFwiLi9BYm91dFBhZ2UvXCI6IDUyLFxuXHRcIi4vQWJvdXRQYWdlL2luZGV4XCI6IDUyLFxuXHRcIi4vQWJvdXRQYWdlL2luZGV4LmpzeFwiOiA1Mixcblx0XCIuL0Vycm9yUGFnZVwiOiAxMixcblx0XCIuL0Vycm9yUGFnZS9cIjogMTIsXG5cdFwiLi9FcnJvclBhZ2UvaW5kZXhcIjogMTIsXG5cdFwiLi9FcnJvclBhZ2UvaW5kZXguanN4XCI6IDEyLFxuXHRcIi4vSG9tZVBhZ2VcIjogMzksXG5cdFwiLi9Ib21lUGFnZS9cIjogMzksXG5cdFwiLi9Ib21lUGFnZS9pbmRleFwiOiAzOSxcblx0XCIuL0hvbWVQYWdlL2luZGV4LmpzeFwiOiAzOSxcblx0XCIuL0xvZ2luUGFnZVwiOiAyNCxcblx0XCIuL0xvZ2luUGFnZS9cIjogMjQsXG5cdFwiLi9Mb2dpblBhZ2UvaW5kZXhcIjogMjQsXG5cdFwiLi9Mb2dpblBhZ2UvaW5kZXguanNcIjogMjQsXG5cdFwiLi9Mb2dpblBhZ2Uvdmlld1wiOiA2Myxcblx0XCIuL0xvZ2luUGFnZS92aWV3LmpzeFwiOiA2Myxcblx0XCIuL1Nob3dQYWdlXCI6IDI5LFxuXHRcIi4vU2hvd1BhZ2UvXCI6IDI5LFxuXHRcIi4vU2hvd1BhZ2UvaW5kZXhcIjogMjksXG5cdFwiLi9TaG93UGFnZS9pbmRleC5qc1wiOiAyOSxcblx0XCIuL1Nob3dQYWdlL3ZpZXdcIjogNjksXG5cdFwiLi9TaG93UGFnZS92aWV3LmpzeFwiOiA2OSxcblx0XCIuL2luZGV4XCI6IDU2LFxuXHRcIi4vaW5kZXguanNcIjogNTZcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxOTA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jbGllbnQvcGFnZXMgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gMTkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9cIjogNTcsXG5cdFwiLi9BY3RpdmVTdGF0dXNCYXJcIjogMjcsXG5cdFwiLi9BY3RpdmVTdGF0dXNCYXIvXCI6IDI3LFxuXHRcIi4vQWN0aXZlU3RhdHVzQmFyL2luZGV4XCI6IDI3LFxuXHRcIi4vQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeFwiOiAyNyxcblx0XCIuL0Fzc2V0UHJldmlld1wiOiAzNyxcblx0XCIuL0Fzc2V0UHJldmlldy9cIjogMzcsXG5cdFwiLi9Bc3NldFByZXZpZXcvaW5kZXhcIjogMzcsXG5cdFwiLi9Bc3NldFByZXZpZXcvaW5kZXguanNcIjogMzcsXG5cdFwiLi9Bc3NldFByZXZpZXcvdmlld1wiOiA3Nyxcblx0XCIuL0Fzc2V0UHJldmlldy92aWV3LmpzeFwiOiA3Nyxcblx0XCIuL0V4cGFuZGluZ1RleHRBcmVhXCI6IDQ4LFxuXHRcIi4vRXhwYW5kaW5nVGV4dEFyZWEvXCI6IDQ4LFxuXHRcIi4vRXhwYW5kaW5nVGV4dEFyZWEvaW5kZXhcIjogNDgsXG5cdFwiLi9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleC5qc3hcIjogNDgsXG5cdFwiLi9HQUxpc3RlbmVyXCI6IDE0LFxuXHRcIi4vR0FMaXN0ZW5lci9cIjogMTQsXG5cdFwiLi9HQUxpc3RlbmVyL2luZGV4XCI6IDE0LFxuXHRcIi4vR0FMaXN0ZW5lci9pbmRleC5qc3hcIjogMTQsXG5cdFwiLi9JbmFjdGl2ZVN0YXR1c0JhclwiOiAyOCxcblx0XCIuL0luYWN0aXZlU3RhdHVzQmFyL1wiOiAyOCxcblx0XCIuL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4XCI6IDI4LFxuXHRcIi4vSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4XCI6IDI4LFxuXHRcIi4vTG9nb1wiOiAyNSxcblx0XCIuL0xvZ28vXCI6IDI1LFxuXHRcIi4vTG9nby9pbmRleFwiOiAyNSxcblx0XCIuL0xvZ28vaW5kZXguanN4XCI6IDI1LFxuXHRcIi4vTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93blwiOiAyNixcblx0XCIuL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vXCI6IDI2LFxuXHRcIi4vTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleFwiOiAyNixcblx0XCIuL05hdkJhckNoYW5uZWxPcHRpb25zRHJvcGRvd24vaW5kZXguanN4XCI6IDI2LFxuXHRcIi4vUHJvZ3Jlc3NCYXJcIjogMTAsXG5cdFwiLi9Qcm9ncmVzc0Jhci9cIjogMTAsXG5cdFwiLi9Qcm9ncmVzc0Jhci9pbmRleFwiOiAxMCxcblx0XCIuL1Byb2dyZXNzQmFyL2luZGV4LmpzeFwiOiAxMCxcblx0XCIuL1B1Ymxpc2hQcmV2aWV3XCI6IDQxLFxuXHRcIi4vUHVibGlzaFByZXZpZXcvXCI6IDQxLFxuXHRcIi4vUHVibGlzaFByZXZpZXcvaW5kZXhcIjogNDEsXG5cdFwiLi9QdWJsaXNoUHJldmlldy9pbmRleC5qc3hcIjogNDEsXG5cdFwiLi9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheVwiOiA0NSxcblx0XCIuL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L1wiOiA0NSxcblx0XCIuL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5L2luZGV4XCI6IDQ1LFxuXHRcIi4vUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4XCI6IDQ1LFxuXHRcIi4vU0VPXCI6IDksXG5cdFwiLi9TRU8vXCI6IDksXG5cdFwiLi9TRU8vaW5kZXhcIjogOSxcblx0XCIuL1NFTy9pbmRleC5qc1wiOiA5LFxuXHRcIi4vU0VPL3ZpZXdcIjogNjQsXG5cdFwiLi9TRU8vdmlldy5qc3hcIjogNjQsXG5cdFwiLi9pbmRleFwiOiA1Nyxcblx0XCIuL2luZGV4LmpzXCI6IDU3XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTkxO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2xpZW50L2NvbXBvbmVudHMgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gMTkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9cIjogNTgsXG5cdFwiLi9Bc3NldERpc3BsYXlcIjogMTksXG5cdFwiLi9Bc3NldERpc3BsYXkvXCI6IDE5LFxuXHRcIi4vQXNzZXREaXNwbGF5L2luZGV4XCI6IDE5LFxuXHRcIi4vQXNzZXREaXNwbGF5L2luZGV4LmpzXCI6IDE5LFxuXHRcIi4vQXNzZXREaXNwbGF5L3ZpZXdcIjogNzEsXG5cdFwiLi9Bc3NldERpc3BsYXkvdmlldy5qc3hcIjogNzEsXG5cdFwiLi9Bc3NldEluZm9cIjogMzQsXG5cdFwiLi9Bc3NldEluZm8vXCI6IDM0LFxuXHRcIi4vQXNzZXRJbmZvL2luZGV4XCI6IDM0LFxuXHRcIi4vQXNzZXRJbmZvL2luZGV4LmpzXCI6IDM0LFxuXHRcIi4vQXNzZXRJbmZvL3ZpZXdcIjogNzQsXG5cdFwiLi9Bc3NldEluZm8vdmlldy5qc3hcIjogNzQsXG5cdFwiLi9Bc3NldFRpdGxlXCI6IDMzLFxuXHRcIi4vQXNzZXRUaXRsZS9cIjogMzMsXG5cdFwiLi9Bc3NldFRpdGxlL2luZGV4XCI6IDMzLFxuXHRcIi4vQXNzZXRUaXRsZS9pbmRleC5qc1wiOiAzMyxcblx0XCIuL0Fzc2V0VGl0bGUvdmlld1wiOiA3Myxcblx0XCIuL0Fzc2V0VGl0bGUvdmlldy5qc3hcIjogNzMsXG5cdFwiLi9DaGFubmVsQ2xhaW1zRGlzcGxheVwiOiAzNixcblx0XCIuL0NoYW5uZWxDbGFpbXNEaXNwbGF5L1wiOiAzNixcblx0XCIuL0NoYW5uZWxDbGFpbXNEaXNwbGF5L2luZGV4XCI6IDM2LFxuXHRcIi4vQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXguanNcIjogMzYsXG5cdFwiLi9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3XCI6IDc2LFxuXHRcIi4vQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3hcIjogNzYsXG5cdFwiLi9DaGFubmVsQ3JlYXRlRm9ybVwiOiAxOCxcblx0XCIuL0NoYW5uZWxDcmVhdGVGb3JtL1wiOiAxOCxcblx0XCIuL0NoYW5uZWxDcmVhdGVGb3JtL2luZGV4XCI6IDE4LFxuXHRcIi4vQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanNcIjogMTgsXG5cdFwiLi9DaGFubmVsQ3JlYXRlRm9ybS92aWV3XCI6IDY4LFxuXHRcIi4vQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3hcIjogNjgsXG5cdFwiLi9DaGFubmVsTG9naW5Gb3JtXCI6IDE3LFxuXHRcIi4vQ2hhbm5lbExvZ2luRm9ybS9cIjogMTcsXG5cdFwiLi9DaGFubmVsTG9naW5Gb3JtL2luZGV4XCI6IDE3LFxuXHRcIi4vQ2hhbm5lbExvZ2luRm9ybS9pbmRleC5qc1wiOiAxNyxcblx0XCIuL0NoYW5uZWxMb2dpbkZvcm0vdmlld1wiOiA2Nyxcblx0XCIuL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3hcIjogNjcsXG5cdFwiLi9DaGFubmVsU2VsZWN0XCI6IDQ5LFxuXHRcIi4vQ2hhbm5lbFNlbGVjdC9cIjogNDksXG5cdFwiLi9DaGFubmVsU2VsZWN0L2luZGV4XCI6IDQ5LFxuXHRcIi4vQ2hhbm5lbFNlbGVjdC9pbmRleC5qc1wiOiA0OSxcblx0XCIuL0NoYW5uZWxTZWxlY3Qvdmlld1wiOiA4Nixcblx0XCIuL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3hcIjogODYsXG5cdFwiLi9Ecm9wem9uZVwiOiAyMCxcblx0XCIuL0Ryb3B6b25lL1wiOiAyMCxcblx0XCIuL0Ryb3B6b25lL2luZGV4XCI6IDIwLFxuXHRcIi4vRHJvcHpvbmUvaW5kZXguanNcIjogMjAsXG5cdFwiLi9Ecm9wem9uZS92aWV3XCI6IDgwLFxuXHRcIi4vRHJvcHpvbmUvdmlldy5qc3hcIjogODAsXG5cdFwiLi9Gb3VyT2hGb3VyUGFnZVwiOiAzOCxcblx0XCIuL0ZvdXJPaEZvdXJQYWdlL1wiOiAzOCxcblx0XCIuL0ZvdXJPaEZvdXJQYWdlL2luZGV4XCI6IDM4LFxuXHRcIi4vRm91ck9oRm91clBhZ2UvaW5kZXguanN4XCI6IDM4LFxuXHRcIi4vRm91ck9oRm91clBhZ2Uvdmlld1wiOiA3OCxcblx0XCIuL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4XCI6IDc4LFxuXHRcIi4vTmF2QmFyXCI6IDcsXG5cdFwiLi9OYXZCYXIvXCI6IDcsXG5cdFwiLi9OYXZCYXIvaW5kZXhcIjogNyxcblx0XCIuL05hdkJhci9pbmRleC5qc1wiOiA3LFxuXHRcIi4vTmF2QmFyL3ZpZXdcIjogNjYsXG5cdFwiLi9OYXZCYXIvdmlldy5qc3hcIjogNjYsXG5cdFwiLi9QdWJsaXNoRGV0YWlsc1wiOiA0Mixcblx0XCIuL1B1Ymxpc2hEZXRhaWxzL1wiOiA0Mixcblx0XCIuL1B1Ymxpc2hEZXRhaWxzL2luZGV4XCI6IDQyLFxuXHRcIi4vUHVibGlzaERldGFpbHMvaW5kZXguanNcIjogNDIsXG5cdFwiLi9QdWJsaXNoRGV0YWlscy92aWV3XCI6IDgxLFxuXHRcIi4vUHVibGlzaERldGFpbHMvdmlldy5qc3hcIjogODEsXG5cdFwiLi9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlXCI6IDUxLFxuXHRcIi4vUHVibGlzaERpc2FibGVkTWVzc2FnZS9cIjogNTEsXG5cdFwiLi9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4XCI6IDUxLFxuXHRcIi4vUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qc1wiOiA1MSxcblx0XCIuL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlld1wiOiA4OCxcblx0XCIuL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2Uvdmlldy5qc3hcIjogODgsXG5cdFwiLi9QdWJsaXNoTWV0YWRhdGFJbnB1dHNcIjogNDcsXG5cdFwiLi9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvXCI6IDQ3LFxuXHRcIi4vUHVibGlzaE1ldGFkYXRhSW5wdXRzL2luZGV4XCI6IDQ3LFxuXHRcIi4vUHVibGlzaE1ldGFkYXRhSW5wdXRzL2luZGV4LmpzXCI6IDQ3LFxuXHRcIi4vUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXdcIjogODUsXG5cdFwiLi9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvdmlldy5qc3hcIjogODUsXG5cdFwiLi9QdWJsaXNoU3RhdHVzXCI6IDUwLFxuXHRcIi4vUHVibGlzaFN0YXR1cy9cIjogNTAsXG5cdFwiLi9QdWJsaXNoU3RhdHVzL2luZGV4XCI6IDUwLFxuXHRcIi4vUHVibGlzaFN0YXR1cy9pbmRleC5qc1wiOiA1MCxcblx0XCIuL1B1Ymxpc2hTdGF0dXMvdmlld1wiOiA4Nyxcblx0XCIuL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3hcIjogODcsXG5cdFwiLi9QdWJsaXNoVGh1bWJuYWlsSW5wdXRcIjogNDYsXG5cdFwiLi9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvXCI6IDQ2LFxuXHRcIi4vUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4XCI6IDQ2LFxuXHRcIi4vUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzXCI6IDQ2LFxuXHRcIi4vUHVibGlzaFRodW1ibmFpbElucHV0L3ZpZXdcIjogODQsXG5cdFwiLi9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlldy5qc3hcIjogODQsXG5cdFwiLi9QdWJsaXNoVGl0bGVJbnB1dFwiOiA0Myxcblx0XCIuL1B1Ymxpc2hUaXRsZUlucHV0L1wiOiA0Myxcblx0XCIuL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4XCI6IDQzLFxuXHRcIi4vUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanNcIjogNDMsXG5cdFwiLi9QdWJsaXNoVGl0bGVJbnB1dC92aWV3XCI6IDgyLFxuXHRcIi4vUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3hcIjogODIsXG5cdFwiLi9QdWJsaXNoVG9vbFwiOiA0MCxcblx0XCIuL1B1Ymxpc2hUb29sL1wiOiA0MCxcblx0XCIuL1B1Ymxpc2hUb29sL2luZGV4XCI6IDQwLFxuXHRcIi4vUHVibGlzaFRvb2wvaW5kZXguanNcIjogNDAsXG5cdFwiLi9QdWJsaXNoVG9vbC92aWV3XCI6IDc5LFxuXHRcIi4vUHVibGlzaFRvb2wvdmlldy5qc3hcIjogNzksXG5cdFwiLi9QdWJsaXNoVXJsSW5wdXRcIjogNDQsXG5cdFwiLi9QdWJsaXNoVXJsSW5wdXQvXCI6IDQ0LFxuXHRcIi4vUHVibGlzaFVybElucHV0L2luZGV4XCI6IDQ0LFxuXHRcIi4vUHVibGlzaFVybElucHV0L2luZGV4LmpzXCI6IDQ0LFxuXHRcIi4vUHVibGlzaFVybElucHV0L3ZpZXdcIjogODMsXG5cdFwiLi9QdWJsaXNoVXJsSW5wdXQvdmlldy5qc3hcIjogODMsXG5cdFwiLi9TaG93QXNzZXREZXRhaWxzXCI6IDMyLFxuXHRcIi4vU2hvd0Fzc2V0RGV0YWlscy9cIjogMzIsXG5cdFwiLi9TaG93QXNzZXREZXRhaWxzL2luZGV4XCI6IDMyLFxuXHRcIi4vU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qc1wiOiAzMixcblx0XCIuL1Nob3dBc3NldERldGFpbHMvdmlld1wiOiA3Mixcblx0XCIuL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3hcIjogNzIsXG5cdFwiLi9TaG93QXNzZXRMaXRlXCI6IDMwLFxuXHRcIi4vU2hvd0Fzc2V0TGl0ZS9cIjogMzAsXG5cdFwiLi9TaG93QXNzZXRMaXRlL2luZGV4XCI6IDMwLFxuXHRcIi4vU2hvd0Fzc2V0TGl0ZS9pbmRleC5qc1wiOiAzMCxcblx0XCIuL1Nob3dBc3NldExpdGUvdmlld1wiOiA3MCxcblx0XCIuL1Nob3dBc3NldExpdGUvdmlldy5qc3hcIjogNzAsXG5cdFwiLi9TaG93Q2hhbm5lbFwiOiAzNSxcblx0XCIuL1Nob3dDaGFubmVsL1wiOiAzNSxcblx0XCIuL1Nob3dDaGFubmVsL2luZGV4XCI6IDM1LFxuXHRcIi4vU2hvd0NoYW5uZWwvaW5kZXguanNcIjogMzUsXG5cdFwiLi9TaG93Q2hhbm5lbC92aWV3XCI6IDc1LFxuXHRcIi4vU2hvd0NoYW5uZWwvdmlldy5qc3hcIjogNzUsXG5cdFwiLi9pbmRleFwiOiA1OCxcblx0XCIuL2luZGV4LmpzXCI6IDU4XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTkyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gMTkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=