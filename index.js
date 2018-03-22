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
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
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
      return console.log('No site config received.');
    }
    var analytics = config.analytics,
        assetDefaults = config.assetDefaults,
        auth = config.auth,
        customComponents = config.customComponents,
        details = config.details,
        publishing = config.publishing;

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

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(64);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(65);

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

var _publish_action_types = __webpack_require__(104);

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(66);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = request;

__webpack_require__(152);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sequelize = __webpack_require__(95);
var logger = __webpack_require__(2);

console.log('exporting sequelize models');

var _require = __webpack_require__(92),
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
var Certificate = __webpack_require__(132);
var Channel = __webpack_require__(133);
var Claim = __webpack_require__(134);
var File = __webpack_require__(135);
var Request = __webpack_require__(136);
var User = __webpack_require__(137);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(14);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveStatusBar = __webpack_require__(24);

var _ActiveStatusBar2 = _interopRequireDefault(_ActiveStatusBar);

var _InactiveStatusBar = __webpack_require__(25);

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

var _show_action_types = __webpack_require__(19);

var actions = _interopRequireWildcard(_show_action_types);

var _show_request_types = __webpack_require__(112);

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

var _propTypes = __webpack_require__(14);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NavBar = __webpack_require__(5);

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactGa = __webpack_require__(151);

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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(64);

var _view = __webpack_require__(68);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _channel = __webpack_require__(64);

var _view = __webpack_require__(69);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(72);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(11);

var _show2 = __webpack_require__(28);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(82);

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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(5);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _SEO = __webpack_require__(7);

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
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(67);

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
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(11);

var _view = __webpack_require__(70);

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(71);

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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(73);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(74);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(28);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(75);

var _view2 = _interopRequireDefault(_view);

var _show = __webpack_require__(28);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(76);

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _show = __webpack_require__(11);

var _view = __webpack_require__(77);

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
/* 34 */
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
  var defaultThumbnail = _ref.site.defaults.defaultThumbnail;

  return {
    defaultThumbnail: defaultThumbnail
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

var _view = __webpack_require__(79);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(14);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(14);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(14);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(81);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(83);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(84);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publish = __webpack_require__(6);

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(85);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(86);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(87);

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
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _publish = __webpack_require__(6);

var _view = __webpack_require__(89);

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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _view = __webpack_require__(90);

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
/* 48 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Path = __webpack_require__(51);

var _require = __webpack_require__(80),
    getSubDirectoryNames = _require.getSubDirectoryNames;

var thisFolder = Path.resolve(__dirname, 'client/components/');
var modules = {};

getSubDirectoryNames(thisFolder).forEach(function (name) {
  modules[name] = __webpack_require__(168)("./" + name).default;
});

module.exports = modules;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Path = __webpack_require__(51);

var _require = __webpack_require__(80),
    getSubDirectoryNames = _require.getSubDirectoryNames;

var thisFolder = Path.resolve(__dirname, 'client/containers/');

var modules = {};

getSubDirectoryNames(thisFolder).forEach(function (name) {
  modules[name] = __webpack_require__(169)("./" + name).default;
});

module.exports = modules;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Path = __webpack_require__(51);

var _require = __webpack_require__(80),
    getSubDirectoryNames = _require.getSubDirectoryNames;

var thisFolder = Path.resolve(__dirname, 'client/pages/');

var modules = {};

getSubDirectoryNames(thisFolder).forEach(function (name) {
  modules[name] = __webpack_require__(171)("./" + name).default;
});

module.exports = modules;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(7);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(5);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _PublishTool = __webpack_require__(47);

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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(129);
var logger = __webpack_require__(2);

var _require = __webpack_require__(130),
    _require$api = _require.api,
    apiHost = _require$api.apiHost,
    apiPort = _require$api.apiPort;

var lbryApiUri = 'http://' + apiHost + ':' + apiPort;

var _require2 = __webpack_require__(56),
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var ua = __webpack_require__(131);

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
/* 57 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(3),
    customComponents = _require.customComponents;

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
  if (!customComponents) {
    return __webpack_require__(109)("" + filePath);
  }
  // split out the file folders  // filter out any empty or white-space-only strings
  var folders = filePath.split('/').filter(function (folderName) {
    return folderName.replace(/\s/g, '').length;
  });
  // check for the component corresponding to file path in the site config object
  // i.e. customComponents[folders[0]][folders[2][...][folders[n]]
  var component = getDeepestChildValue(customComponents, folders);
  if (component) {
    return component; // return custom component
  } else {
    return __webpack_require__(109)("" + filePath);
  }
};

/***/ }),
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
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
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLoggedInChannel = updateLoggedInChannel;

var _channel_action_types = __webpack_require__(106);

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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Logo = __webpack_require__(21);

var _Logo2 = _interopRequireDefault(_Logo);

var _NavBarChannelOptionsDropdown = __webpack_require__(22);

var _NavBarChannelOptionsDropdown2 = _interopRequireDefault(_NavBarChannelOptionsDropdown);

var _request = __webpack_require__(8);

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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(48);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _propTypes = __webpack_require__(14);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pageTitle = __webpack_require__(63);

var _metaTags = __webpack_require__(62);

var _canonicalLink = __webpack_require__(59);

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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _SEO = __webpack_require__(7);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(5);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelLoginForm = __webpack_require__(15);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(16);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(8);

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
/* 69 */
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

var _request = __webpack_require__(8);

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
/* 70 */
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

var _ShowAssetLite = __webpack_require__(27);

var _ShowAssetLite2 = _interopRequireDefault(_ShowAssetLite);

var _ShowAssetDetails = __webpack_require__(29);

var _ShowAssetDetails2 = _interopRequireDefault(_ShowAssetDetails);

var _ShowChannel = __webpack_require__(32);

var _ShowChannel2 = _interopRequireDefault(_ShowChannel);

var _show_request_types = __webpack_require__(112);

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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(7);

var _SEO2 = _interopRequireDefault(_SEO);

var _reactRouterDom = __webpack_require__(4);

var _AssetDisplay = __webpack_require__(17);

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
/* 72 */
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

var _asset_display_states = __webpack_require__(107);

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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(7);

var _SEO2 = _interopRequireDefault(_SEO);

var _NavBar = __webpack_require__(5);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ErrorPage = __webpack_require__(12);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _AssetTitle = __webpack_require__(30);

var _AssetTitle2 = _interopRequireDefault(_AssetTitle);

var _AssetDisplay = __webpack_require__(17);

var _AssetDisplay2 = _interopRequireDefault(_AssetDisplay);

var _AssetInfo = __webpack_require__(31);

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
/* 74 */
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
/* 75 */
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SEO = __webpack_require__(7);

var _SEO2 = _interopRequireDefault(_SEO);

var _ErrorPage = __webpack_require__(12);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _NavBar = __webpack_require__(5);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ChannelClaimsDisplay = __webpack_require__(33);

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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AssetPreview = __webpack_require__(34);

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
/* 78 */
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NavBar = __webpack_require__(5);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _reactHelmet = __webpack_require__(48);

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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require = __webpack_require__(98),
    lstatSync = _require.lstatSync,
    readdirSync = _require.readdirSync;

var _require2 = __webpack_require__(51),
    join = _require2.join;

var getSubDirectoryNames = exports.getSubDirectoryNames = function getSubDirectoryNames(root) {
  return readdirSync(root).filter(function (name) {
    var fullPath = join(root, name);
    return lstatSync(fullPath).isDirectory();
  });
};

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

var _ChannelLoginForm = __webpack_require__(15);

var _ChannelLoginForm2 = _interopRequireDefault(_ChannelLoginForm);

var _ChannelCreateForm = __webpack_require__(16);

var _ChannelCreateForm2 = _interopRequireDefault(_ChannelCreateForm);

var _publish_channel_select_states = __webpack_require__(105);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _file = __webpack_require__(60);

var _PublishPreview = __webpack_require__(37);

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Dropzone = __webpack_require__(18);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishTitleInput = __webpack_require__(41);

var _PublishTitleInput2 = _interopRequireDefault(_PublishTitleInput);

var _PublishUrlInput = __webpack_require__(42);

var _PublishUrlInput2 = _interopRequireDefault(_PublishUrlInput);

var _PublishThumbnailInput = __webpack_require__(43);

var _PublishThumbnailInput2 = _interopRequireDefault(_PublishThumbnailInput);

var _PublishMetadataInputs = __webpack_require__(44);

var _PublishMetadataInputs2 = _interopRequireDefault(_PublishMetadataInputs);

var _ChannelSelect = __webpack_require__(39);

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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _request = __webpack_require__(8);

var _request2 = _interopRequireDefault(_request);

var _PublishUrlMiddleDisplay = __webpack_require__(38);

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
/* 86 */
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ExpandingTextArea = __webpack_require__(36);

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProgressBar = __webpack_require__(10);

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _publish_claim_states = __webpack_require__(170);

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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Dropzone = __webpack_require__(18);

var _Dropzone2 = _interopRequireDefault(_Dropzone);

var _PublishDetails = __webpack_require__(40);

var _PublishDetails2 = _interopRequireDefault(_PublishDetails);

var _PublishStatus = __webpack_require__(46);

var _PublishStatus2 = _interopRequireDefault(_PublishStatus);

var _PublishDisabledMessage = __webpack_require__(45);

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
/* 91 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 92 */
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
/* 93 */
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
/* 94 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 96 */
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var fs = __webpack_require__(98);

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
/* 98 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 99 */
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var db = __webpack_require__(9);
var logger = __webpack_require__(2);

var _require = __webpack_require__(145),
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(102);

var _redux = __webpack_require__(57);

var _reducers = __webpack_require__(103);

var _reducers2 = _interopRequireDefault(_reducers);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

var _GAListener = __webpack_require__(13);

var _GAListener2 = _interopRequireDefault(_GAListener);

var _app = __webpack_require__(108);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(113);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reactHelmet = __webpack_require__(48);

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
/* 102 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(57);

var _publish = __webpack_require__(147);

var _publish2 = _interopRequireDefault(_publish);

var _channel = __webpack_require__(148);

var _channel2 = _interopRequireDefault(_channel);

var _show = __webpack_require__(149);

var _show2 = _interopRequireDefault(_show);

var _site = __webpack_require__(150);

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  channel: _channel2.default,
  publish: _publish2.default,
  show: _show2.default,
  site: _site2.default
});

/***/ }),
/* 104 */
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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOGIN = exports.LOGIN = 'Existing';
var CREATE = exports.CREATE = 'New';

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL_UPDATE = exports.CHANNEL_UPDATE = 'CHANNEL_UPDATE';

/***/ }),
/* 107 */
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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _dynamicImport = __webpack_require__(58);

var _AboutPage = __webpack_require__(20);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _LoginPage = __webpack_require__(23);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _ShowPage = __webpack_require__(26);

var _ShowPage2 = _interopRequireDefault(_ShowPage);

var _FourOhFourPage = __webpack_require__(35);

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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./canonicalLink": 59,
	"./canonicalLink.js": 59,
	"./dynamicImport": 58,
	"./dynamicImport.js": 58,
	"./file": 60,
	"./file.js": 60,
	"./lbryUri": 61,
	"./lbryUri.js": 61,
	"./metaTags": 62,
	"./metaTags.js": 62,
	"./pageTitle": 63,
	"./pageTitle.js": 63,
	"./publish": 110,
	"./publish.js": 110,
	"./request": 8,
	"./request.js": 8,
	"./validate": 111,
	"./validate.js": 111
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
webpackContext.id = 109;

/***/ }),
/* 110 */
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
/* 111 */
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
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = exports.CHANNEL = 'CHANNEL';
var ASSET_LITE = exports.ASSET_LITE = 'ASSET_LITE';
var ASSET_DETAILS = exports.ASSET_DETAILS = 'ASSET_DETAILS';

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (helmet, html, preloadedState) {
    // take the html and preloadedState and return the full page
    return '\n    <!DOCTYPE html>\n    <html lang="en" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">\n        <head>\n            <meta charset="UTF-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">\n            <meta http-equiv="X-UA-Compatible" content="ie=edge">\n            <!--helmet-->\n            ' + helmet.title.toString() + '\n            ' + helmet.meta.toString() + '\n            ' + helmet.link.toString() + '\n            <!--style sheets-->\n            <link rel="stylesheet" href="/assets/css/reset.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/general.css" type="text/css">\n            <link rel="stylesheet" href="/assets/css/mediaQueries.css" type="text/css">\n            <!--google font-->\n            <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">\n        </head>\n        <body id="main-body">\n            <div class="row row--tall flex-container--column">\n                <div id="react-app" class="row row--tall flex-container--column">' + html + '</div>\n            </div>\n            <script>\n                window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\<') + '\n            </script>\n            <script src="/bundle/bundle.js"></script>\n        </body>\n    </html>\n  ';
};

/***/ }),
/* 114 */
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
__webpack_require__(117);
module.exports = __webpack_require__(118);


/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Server = __webpack_require__(119);
var Components = __webpack_require__(50);
var Containers = __webpack_require__(52);
var Pages = __webpack_require__(53);

var _exports = {
  Server: Server,
  Components: Components,
  Containers: Containers,
  Pages: Pages
};

module.exports = _exports;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// app dependencies
var express = __webpack_require__(120);
var bodyParser = __webpack_require__(121);
var expressHandlebars = __webpack_require__(122);
var Handlebars = __webpack_require__(123);
var helmet = __webpack_require__(124);
var passport = __webpack_require__(91);

var _require = __webpack_require__(125),
    serializeSpeechUser = _require.serializeSpeechUser,
    deserializeSpeechUser = _require.deserializeSpeechUser;

var cookieSession = __webpack_require__(126);
var http = __webpack_require__(127);
// logging dependencies
var logger = __webpack_require__(2);

function Server() {
  var _this = this;

  this.configureMysql = function (mysqlConfig) {
    __webpack_require__(92).configure(mysqlConfig);
  };
  this.configureSite = function (siteConfig) {
    __webpack_require__(3).configure(siteConfig);
    _this.sessionKey = siteConfig.auth.sessionKey;
    _this.PORT = siteConfig.details.port;
  };
  this.configureSlack = function (slackConfig) {
    __webpack_require__(93).configure(slackConfig);
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
    var localSignupStrategy = __webpack_require__(128);
    var localLoginStrategy = __webpack_require__(139);
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
    __webpack_require__(140)(app);
    __webpack_require__(141)(app);
    __webpack_require__(146)(app);
    __webpack_require__(153)(app);
    __webpack_require__(163)(app);

    _this.app = app;
  };
  this.initialize = function () {
    __webpack_require__(164)(logger);
    __webpack_require__(166)(logger);
    _this.createApp();
    _this.server = http.Server(_this.app);
  };
  this.start = function () {
    var db = __webpack_require__(9);
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
/* 120 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("handlebars");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

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
/* 126 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var PassportLocalStrategy = __webpack_require__(94).Strategy;
var lbryApi = __webpack_require__(55);
var logger = __webpack_require__(2);
var db = __webpack_require__(9);

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
/* 129 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 130 */
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
/* 131 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(96),
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
/* 133 */
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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(96),
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
/* 135 */
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
/* 136 */
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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bcrypt = __webpack_require__(138);
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
/* 138 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PassportLocalStrategy = __webpack_require__(94).Strategy;
var logger = __webpack_require__(2);
var db = __webpack_require__(9);

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
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);
var passport = __webpack_require__(91);

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
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var logger = __webpack_require__(2);
var multipart = __webpack_require__(142);

var _require = __webpack_require__(3),
    uploadDirectory = _require.publishing.uploadDirectory,
    host = _require.details.host;

var multipartMiddleware = multipart({ uploadDir: uploadDirectory });
var db = __webpack_require__(9);

var _require2 = __webpack_require__(143),
    claimNameIsAvailable = _require2.claimNameIsAvailable,
    checkChannelAvailability = _require2.checkChannelAvailability,
    publish = _require2.publish;

var _require3 = __webpack_require__(55),
    getClaimList = _require3.getClaimList,
    resolveUri = _require3.resolveUri,
    getClaim = _require3.getClaim;

var _require4 = __webpack_require__(97),
    addGetResultsToFileData = _require4.addGetResultsToFileData,
    createBasicPublishParams = _require4.createBasicPublishParams,
    createThumbnailPublishParams = _require4.createThumbnailPublishParams,
    parsePublishApiRequestBody = _require4.parsePublishApiRequestBody,
    parsePublishApiRequestFiles = _require4.parsePublishApiRequestFiles,
    createFileData = _require4.createFileData;

var errorHandlers = __webpack_require__(99);

var _require5 = __webpack_require__(56),
    sendGATimingEvent = _require5.sendGATimingEvent;

var _require6 = __webpack_require__(144),
    authenticateUser = _require6.authenticateUser;

var _require7 = __webpack_require__(100),
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
/* 142 */
/***/ (function(module, exports) {

module.exports = require("connect-multiparty");

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = __webpack_require__(2);
var db = __webpack_require__(9);
var lbryApi = __webpack_require__(55);
var publishHelpers = __webpack_require__(97);

var _require = __webpack_require__(3),
    _require$publishing = _require.publishing,
    primaryClaimAddress = _require$publishing.primaryClaimAddress,
    additionalClaimAddresses = _require$publishing.additionalClaimAddresses;

var Sequelize = __webpack_require__(95);
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(9);
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
/* 145 */
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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(3),
    host = _require.details;

var handlePageRender = __webpack_require__(101);

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
/* 147 */
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

var _publish_action_types = __webpack_require__(104);

var actions = _interopRequireWildcard(_publish_action_types);

var _publish_channel_select_states = __webpack_require__(105);

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
/* 148 */
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

var _channel_action_types = __webpack_require__(106);

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
/* 149 */
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

var _show_action_types = __webpack_require__(19);

var actions = _interopRequireWildcard(_show_action_types);

var _asset_display_states = __webpack_require__(107);

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
/* 150 */
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
/* 151 */
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = require("cross-fetch/polyfill");

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(56),
    sendGAServeEvent = _require.sendGAServeEvent;

var _require2 = __webpack_require__(154),
    determineResponseType = _require2.determineResponseType,
    flipClaimNameAndIdForBackwardsCompatibility = _require2.flipClaimNameAndIdForBackwardsCompatibility,
    logRequestData = _require2.logRequestData,
    getClaimIdAndServeAsset = _require2.getClaimIdAndServeAsset;

var lbryUri = __webpack_require__(155);
var handleShowRender = __webpack_require__(156);
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
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logger = __webpack_require__(2);

var _require = __webpack_require__(100),
    getClaimId = _require.getClaimId,
    getLocalFileRecord = _require.getLocalFileRecord;

var _require2 = __webpack_require__(99),
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
/* 155 */
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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(102);

var _redux = __webpack_require__(57);

var _index = __webpack_require__(103);

var _index2 = _interopRequireDefault(_index);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

var _index3 = __webpack_require__(13);

var _index4 = _interopRequireDefault(_index3);

var _app = __webpack_require__(108);

var _app2 = _interopRequireDefault(_app);

var _renderFullPage = __webpack_require__(113);

var _renderFullPage2 = _interopRequireDefault(_renderFullPage);

var _reduxSaga = __webpack_require__(157);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = __webpack_require__(49);

var _show_uri = __webpack_require__(158);

var _show = __webpack_require__(11);

var _reactHelmet = __webpack_require__(48);

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
/* 157 */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleShowPageUri = handleShowPageUri;
exports.watchHandleShowPageUri = watchHandleShowPageUri;

var _effects = __webpack_require__(49);

var _show_action_types = __webpack_require__(19);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(11);

var _show_asset = __webpack_require__(159);

var _show_channel = __webpack_require__(161);

var _lbryUri = __webpack_require__(61);

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
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAssetRequest = newAssetRequest;
exports.watchNewAssetRequest = watchNewAssetRequest;

var _effects = __webpack_require__(49);

var _show_action_types = __webpack_require__(19);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(11);

var _assetApi = __webpack_require__(160);

var _show2 = __webpack_require__(28);

var _site = __webpack_require__(114);

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
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongClaimId = getLongClaimId;
exports.getShortId = getShortId;
exports.getClaimData = getClaimData;

var _request = __webpack_require__(8);

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
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newChannelRequest = newChannelRequest;
exports.watchNewChannelRequest = watchNewChannelRequest;
exports.watchUpdateChannelClaims = watchUpdateChannelClaims;

var _effects = __webpack_require__(49);

var _show_action_types = __webpack_require__(19);

var actions = _interopRequireWildcard(_show_action_types);

var _show = __webpack_require__(11);

var _channelApi = __webpack_require__(162);

var _show2 = __webpack_require__(28);

var _site = __webpack_require__(114);

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
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelData = getChannelData;
exports.getChannelClaims = getChannelClaims;

var _request = __webpack_require__(8);

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
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlePageRender = __webpack_require__(101);

module.exports = function (app) {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', function (req, res) {
    // send response
    handlePageRender(req, res);
  });
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(165),
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
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var loggerConfig = {
  logLevel: 'debug' // options: silly, debug, verbose, info
};

module.exports = loggerConfig;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var winstonSlackWebHook = __webpack_require__(167).SlackWebHook;
var slackConfig = __webpack_require__(93);

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
/* 167 */
/***/ (function(module, exports) {

module.exports = require("winston-slack-webhook");

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 50,
	"./ActiveStatusBar": 24,
	"./ActiveStatusBar/": 24,
	"./ActiveStatusBar/index": 24,
	"./ActiveStatusBar/index.jsx": 24,
	"./AssetPreview": 34,
	"./AssetPreview/": 34,
	"./AssetPreview/index": 34,
	"./AssetPreview/index.js": 34,
	"./AssetPreview/view": 78,
	"./AssetPreview/view.jsx": 78,
	"./ExpandingTextArea": 36,
	"./ExpandingTextArea/": 36,
	"./ExpandingTextArea/index": 36,
	"./ExpandingTextArea/index.jsx": 36,
	"./GAListener": 13,
	"./GAListener/": 13,
	"./GAListener/index": 13,
	"./GAListener/index.jsx": 13,
	"./InactiveStatusBar": 25,
	"./InactiveStatusBar/": 25,
	"./InactiveStatusBar/index": 25,
	"./InactiveStatusBar/index.jsx": 25,
	"./Logo": 21,
	"./Logo/": 21,
	"./Logo/index": 21,
	"./Logo/index.jsx": 21,
	"./NavBarChannelOptionsDropdown": 22,
	"./NavBarChannelOptionsDropdown/": 22,
	"./NavBarChannelOptionsDropdown/index": 22,
	"./NavBarChannelOptionsDropdown/index.jsx": 22,
	"./ProgressBar": 10,
	"./ProgressBar/": 10,
	"./ProgressBar/index": 10,
	"./ProgressBar/index.jsx": 10,
	"./PublishPreview": 37,
	"./PublishPreview/": 37,
	"./PublishPreview/index": 37,
	"./PublishPreview/index.jsx": 37,
	"./PublishUrlMiddleDisplay": 38,
	"./PublishUrlMiddleDisplay/": 38,
	"./PublishUrlMiddleDisplay/index": 38,
	"./PublishUrlMiddleDisplay/index.jsx": 38,
	"./SEO": 7,
	"./SEO/": 7,
	"./SEO/index": 7,
	"./SEO/index.js": 7,
	"./SEO/view": 66,
	"./SEO/view.jsx": 66,
	"./index": 50,
	"./index.js": 50
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
webpackContext.id = 168;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 52,
	"./AssetDisplay": 17,
	"./AssetDisplay/": 17,
	"./AssetDisplay/index": 17,
	"./AssetDisplay/index.js": 17,
	"./AssetDisplay/view": 72,
	"./AssetDisplay/view.jsx": 72,
	"./AssetInfo": 31,
	"./AssetInfo/": 31,
	"./AssetInfo/index": 31,
	"./AssetInfo/index.js": 31,
	"./AssetInfo/view": 75,
	"./AssetInfo/view.jsx": 75,
	"./AssetTitle": 30,
	"./AssetTitle/": 30,
	"./AssetTitle/index": 30,
	"./AssetTitle/index.js": 30,
	"./AssetTitle/view": 74,
	"./AssetTitle/view.jsx": 74,
	"./ChannelClaimsDisplay": 33,
	"./ChannelClaimsDisplay/": 33,
	"./ChannelClaimsDisplay/index": 33,
	"./ChannelClaimsDisplay/index.js": 33,
	"./ChannelClaimsDisplay/view": 77,
	"./ChannelClaimsDisplay/view.jsx": 77,
	"./ChannelCreateForm": 16,
	"./ChannelCreateForm/": 16,
	"./ChannelCreateForm/index": 16,
	"./ChannelCreateForm/index.js": 16,
	"./ChannelCreateForm/view": 69,
	"./ChannelCreateForm/view.jsx": 69,
	"./ChannelLoginForm": 15,
	"./ChannelLoginForm/": 15,
	"./ChannelLoginForm/index": 15,
	"./ChannelLoginForm/index.js": 15,
	"./ChannelLoginForm/view": 68,
	"./ChannelLoginForm/view.jsx": 68,
	"./ChannelSelect": 39,
	"./ChannelSelect/": 39,
	"./ChannelSelect/index": 39,
	"./ChannelSelect/index.js": 39,
	"./ChannelSelect/view": 81,
	"./ChannelSelect/view.jsx": 81,
	"./Dropzone": 18,
	"./Dropzone/": 18,
	"./Dropzone/index": 18,
	"./Dropzone/index.js": 18,
	"./Dropzone/view": 82,
	"./Dropzone/view.jsx": 82,
	"./FourOhFourPage": 35,
	"./FourOhFourPage/": 35,
	"./FourOhFourPage/index": 35,
	"./FourOhFourPage/index.jsx": 35,
	"./FourOhFourPage/view": 79,
	"./FourOhFourPage/view.jsx": 79,
	"./NavBar": 5,
	"./NavBar/": 5,
	"./NavBar/index": 5,
	"./NavBar/index.js": 5,
	"./NavBar/view": 65,
	"./NavBar/view.jsx": 65,
	"./PublishDetails": 40,
	"./PublishDetails/": 40,
	"./PublishDetails/index": 40,
	"./PublishDetails/index.js": 40,
	"./PublishDetails/view": 83,
	"./PublishDetails/view.jsx": 83,
	"./PublishDisabledMessage": 45,
	"./PublishDisabledMessage/": 45,
	"./PublishDisabledMessage/index": 45,
	"./PublishDisabledMessage/index.js": 45,
	"./PublishDisabledMessage/view": 88,
	"./PublishDisabledMessage/view.jsx": 88,
	"./PublishMetadataInputs": 44,
	"./PublishMetadataInputs/": 44,
	"./PublishMetadataInputs/index": 44,
	"./PublishMetadataInputs/index.js": 44,
	"./PublishMetadataInputs/view": 87,
	"./PublishMetadataInputs/view.jsx": 87,
	"./PublishStatus": 46,
	"./PublishStatus/": 46,
	"./PublishStatus/index": 46,
	"./PublishStatus/index.js": 46,
	"./PublishStatus/view": 89,
	"./PublishStatus/view.jsx": 89,
	"./PublishThumbnailInput": 43,
	"./PublishThumbnailInput/": 43,
	"./PublishThumbnailInput/index": 43,
	"./PublishThumbnailInput/index.js": 43,
	"./PublishThumbnailInput/view": 86,
	"./PublishThumbnailInput/view.jsx": 86,
	"./PublishTitleInput": 41,
	"./PublishTitleInput/": 41,
	"./PublishTitleInput/index": 41,
	"./PublishTitleInput/index.js": 41,
	"./PublishTitleInput/view": 84,
	"./PublishTitleInput/view.jsx": 84,
	"./PublishTool": 47,
	"./PublishTool/": 47,
	"./PublishTool/index": 47,
	"./PublishTool/index.js": 47,
	"./PublishTool/view": 90,
	"./PublishTool/view.jsx": 90,
	"./PublishUrlInput": 42,
	"./PublishUrlInput/": 42,
	"./PublishUrlInput/index": 42,
	"./PublishUrlInput/index.js": 42,
	"./PublishUrlInput/view": 85,
	"./PublishUrlInput/view.jsx": 85,
	"./ShowAssetDetails": 29,
	"./ShowAssetDetails/": 29,
	"./ShowAssetDetails/index": 29,
	"./ShowAssetDetails/index.js": 29,
	"./ShowAssetDetails/view": 73,
	"./ShowAssetDetails/view.jsx": 73,
	"./ShowAssetLite": 27,
	"./ShowAssetLite/": 27,
	"./ShowAssetLite/index": 27,
	"./ShowAssetLite/index.js": 27,
	"./ShowAssetLite/view": 71,
	"./ShowAssetLite/view.jsx": 71,
	"./ShowChannel": 32,
	"./ShowChannel/": 32,
	"./ShowChannel/index": 32,
	"./ShowChannel/index.js": 32,
	"./ShowChannel/view": 76,
	"./ShowChannel/view.jsx": 76,
	"./index": 52,
	"./index.js": 52
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
webpackContext.id = 169;

/***/ }),
/* 170 */
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
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 53,
	"./AboutPage": 20,
	"./AboutPage/": 20,
	"./AboutPage/index": 20,
	"./AboutPage/index.jsx": 20,
	"./ErrorPage": 12,
	"./ErrorPage/": 12,
	"./ErrorPage/index": 12,
	"./ErrorPage/index.jsx": 12,
	"./HomePage": 54,
	"./HomePage/": 54,
	"./HomePage/index": 54,
	"./HomePage/index.jsx": 54,
	"./LoginPage": 23,
	"./LoginPage/": 23,
	"./LoginPage/index": 23,
	"./LoginPage/index.js": 23,
	"./LoginPage/view": 67,
	"./LoginPage/view.jsx": 67,
	"./ShowPage": 26,
	"./ShowPage/": 26,
	"./ShowPage/index": 26,
	"./ShowPage/index.js": 26,
	"./ShowPage/view": 70,
	"./ShowPage/view.jsx": 70,
	"./index": 53,
	"./index.js": 53
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
webpackContext.id = 171;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWIyNDhiOGE5NmE5NmIzY2U0MzEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbnN0b25cIiIsIndlYnBhY2s6Ly8vLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvU0VPL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9yZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Vycm9yUGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0Fib3V0UGFnZS9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTG9nby9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0xvZ2luUGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0luYWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvU2hvd1BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvc2VsZWN0b3JzL3Nob3cuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0Fzc2V0SW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9TaG93Q2hhbm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29tcG9uZW50cy9QdWJsaXNoUHJldmlldy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUb29sL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL0hvbWVQYWdlL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9keW5hbWljSW1wb3J0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9jYW5vbmljYWxMaW5rLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9maWxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9sYnJ5VXJpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvdXRpbHMvcGFnZVRpdGxlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hY3Rpb25zL2NoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxMb2dpbkZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldExpdGUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRUaXRsZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENsYWltc0Rpc3BsYXkvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMvQXNzZXRQcmV2aWV3L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2J1aWxkL2dldEZvbGRlck5hbWVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvdmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS92aWV3LmpzeCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL3ZpZXcuanN4Iiwid2VicGFjazovLy8uL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUb29sL3ZpZXcuanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcInBhc3Nwb3J0XCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL215c3FsQ29uZmlnLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXNzcG9ydC1sb2NhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvcHVibGlzaEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9lcnJvckhhbmRsZXJzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jaGFubmVsX3NlbGVjdF9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29uc3RhbnRzL2Fzc2V0X2Rpc3BsYXlfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzIF4uKiQiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3V0aWxzL3ZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiIiwid2VicGFjazovLy8uL3NwZWVjaC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhhbmRsZWJhcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJoZWxtZXRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWUtc2Vzc2lvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vLy4vY29uZmlnL2xicnlDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2VydGlmaWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvY2xhaW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL21vZGVscy9maWxlLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9hcGktcm91dGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbm5lY3QtbXVsdGlwYXJ0eVwiIiwid2VicGFjazovLy8uL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvYXV0aC9hdXRoZW50aWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9jaGFubmVsUGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL3BhZ2Utcm91dGVzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9jaGFubmVsLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaG93LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWdhXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGVzL2Fzc2V0LXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvbGJyeVVyaS5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NhZ2FzL3Nob3dfdXJpLmpzIiwid2VicGFjazovLy8uL2NsaWVudC9zYWdhcy9zaG93X2Fzc2V0LmpzIiwid2VicGFjazovLy8uL2NsaWVudC9hcGkvYXNzZXRBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3NhZ2FzL3Nob3dfY2hhbm5lbC5qcyIsIndlYnBhY2s6Ly8vLi9jbGllbnQvYXBpL2NoYW5uZWxBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay1yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY29uZmlndXJlTG9nZ2VyLmpzIiwid2VicGFjazovLy8uL2NvbmZpZy9sb2dnZXJDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2hlbHBlcnMvY29uZmlndXJlU2xhY2suanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luc3Rvbi1zbGFjay13ZWJob29rXCIiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L2NvbXBvbmVudHMgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi9jbGllbnQvY29udGFpbmVycyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9jbGFpbV9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L3BhZ2VzIF5cXC5cXC8uKiQiXSwibmFtZXMiOlsiU2l0ZUNvbmZpZyIsImFuYWx5dGljcyIsImdvb2dsZUlkIiwiYXNzZXREZWZhdWx0cyIsImRlc2NyaXB0aW9uIiwidGh1bWJuYWlsIiwidGl0bGUiLCJhdXRoIiwic2Vzc2lvbktleSIsImN1c3RvbUNvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiY29udGFpbmVycyIsInBhZ2VzIiwiZGV0YWlscyIsImhvc3QiLCJwb3J0IiwidHdpdHRlciIsInB1Ymxpc2hpbmciLCJhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMiLCJkaXNhYmxlZCIsImRpc2FibGVkTWVzc2FnZSIsInByaW1hcnlDbGFpbUFkZHJlc3MiLCJ0aHVtYm5haWxDaGFubmVsIiwidGh1bWJuYWlsQ2hhbm5lbElkIiwidXBsb2FkRGlyZWN0b3J5IiwiY29uZmlndXJlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsIm1vZHVsZSIsImV4cG9ydHMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJjaGFubmVsIiwic2l0ZSIsImNoYW5uZWxOYW1lIiwibG9nZ2VkSW5DaGFubmVsIiwibmFtZSIsImNoYW5uZWxTaG9ydElkIiwic2hvcnRJZCIsImNoYW5uZWxMb25nSWQiLCJsb25nSWQiLCJzaXRlRGVzY3JpcHRpb24iLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJvbkNoYW5uZWxMb2dpbiIsImRpc3BhdGNoIiwib25DaGFubmVsTG9nb3V0Iiwic2VsZWN0RmlsZSIsImNsZWFyRmlsZSIsInVwZGF0ZU1ldGFkYXRhIiwidXBkYXRlQ2xhaW0iLCJzZXRQdWJsaXNoSW5DaGFubmVsIiwidXBkYXRlUHVibGlzaFN0YXR1cyIsInVwZGF0ZUVycm9yIiwidXBkYXRlU2VsZWN0ZWRDaGFubmVsIiwidG9nZ2xlTWV0YWRhdGFJbnB1dHMiLCJvbk5ld1RodW1ibmFpbCIsInN0YXJ0UHVibGlzaCIsImFjdGlvbnMiLCJmaWxlIiwidHlwZSIsIkZJTEVfU0VMRUNURUQiLCJkYXRhIiwiRklMRV9DTEVBUiIsInZhbHVlIiwiTUVUQURBVEFfVVBEQVRFIiwiQ0xBSU1fVVBEQVRFIiwiU0VUX1BVQkxJU0hfSU5fQ0hBTk5FTCIsInN0YXR1cyIsIm1lc3NhZ2UiLCJQVUJMSVNIX1NUQVRVU19VUERBVEUiLCJFUlJPUl9VUERBVEUiLCJTRUxFQ1RFRF9DSEFOTkVMX1VQREFURSIsInNob3dNZXRhZGF0YUlucHV0cyIsIlRPR0dMRV9NRVRBREFUQV9JTlBVVFMiLCJUSFVNQk5BSUxfTkVXIiwiaGlzdG9yeSIsIlBVQkxJU0hfU1RBUlQiLCJkZWZhdWx0RGVzY3JpcHRpb24iLCJkZWZhdWx0VGh1bWJuYWlsIiwic2l0ZUhvc3QiLCJzaXRlVGl0bGUiLCJzaXRlVHdpdHRlciIsInJlcXVlc3QiLCJwYXJzZUpTT04iLCJyZXNwb25zZSIsImpzb24iLCJjaGVja1N0YXR1cyIsImpzb25SZXNwb25zZSIsImVycm9yIiwiRXJyb3IiLCJ1cmwiLCJvcHRpb25zIiwiZmV0Y2giLCJ0aGVuIiwiUHJvbWlzZSIsImFsbCIsIlNlcXVlbGl6ZSIsInJlcXVpcmUiLCJsb2dnZXIiLCJkYXRhYmFzZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJkYiIsInNlcXVlbGl6ZSIsImRpYWxlY3QiLCJkaWFsZWN0T3B0aW9ucyIsImRlY2ltYWxOdW1iZXJzIiwibG9nZ2luZyIsInBvb2wiLCJtYXgiLCJtaW4iLCJpZGxlIiwiYWNxdWlyZSIsImF1dGhlbnRpY2F0ZSIsImluZm8iLCJjYXRjaCIsImVyciIsIkNlcnRpZmljYXRlIiwiQ2hhbm5lbCIsIkNsYWltIiwiRmlsZSIsIlJlcXVlc3QiLCJVc2VyIiwiaW1wb3J0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJtb2RlbE5hbWUiLCJhc3NvY2lhdGUiLCJ1cHNlcnQiLCJNb2RlbCIsInZhbHVlcyIsImNvbmRpdGlvbiIsInRhYmxlTmFtZSIsImZpbmRPbmUiLCJ3aGVyZSIsIm9iaiIsImRlYnVnIiwidXBkYXRlIiwiY3JlYXRlIiwiUHJvZ3Jlc3NCYXIiLCJwcm9wcyIsInN0YXRlIiwiYmFycyIsImluZGV4IiwiaW5jcmVtZW50ZXIiLCJjcmVhdGVCYXJzIiwiYmluZCIsInN0YXJ0UHJvZ3Jlc3NCYXIiLCJ1cGRhdGVQcm9ncmVzc0JhciIsInN0b3BQcm9ncmVzc0JhciIsImkiLCJzaXplIiwicHVzaCIsImlzQWN0aXZlIiwic2V0U3RhdGUiLCJ1cGRhdGVJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm1hcCIsImJhciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJvbkhhbmRsZVNob3dQYWdlVXJpIiwib25SZXF1ZXN0RXJyb3IiLCJvbk5ld0NoYW5uZWxSZXF1ZXN0Iiwib25OZXdBc3NldFJlcXVlc3QiLCJvblJlcXVlc3RVcGRhdGUiLCJhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCIsImFkZEFzc2V0VG9Bc3NldExpc3QiLCJhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdCIsIm9uVXBkYXRlQ2hhbm5lbENsYWltcyIsInVwZGF0ZUNoYW5uZWxDbGFpbXMiLCJmaWxlUmVxdWVzdGVkIiwidXBkYXRlRmlsZUF2YWlsYWJpbGl0eSIsInVwZGF0ZURpc3BsYXlBc3NldEVycm9yIiwicGFyYW1zIiwiSEFORExFX1NIT1dfVVJJIiwiUkVRVUVTVF9FUlJPUiIsImNoYW5uZWxJZCIsInJlcXVlc3RUeXBlIiwicmVxdWVzdElkIiwiQ0hBTk5FTF9SRVFVRVNUX05FVyIsImlkIiwiZXh0ZW5zaW9uIiwiQVNTRVRfUkVRVUVTVF9ORVciLCJtb2RpZmllciIsIlJFUVVFU1RfVVBEQVRFIiwia2V5IiwiUkVRVUVTVF9MSVNUX0FERCIsImNsYWltSWQiLCJjbGFpbURhdGEiLCJBU1NFVF9BREQiLCJjbGFpbXNEYXRhIiwiQ0hBTk5FTF9BREQiLCJjaGFubmVsS2V5IiwicGFnZSIsIkNIQU5ORUxfQ0xBSU1TX1VQREFURV9BU1lOQyIsImNoYW5uZWxMaXN0SWQiLCJDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyIsIkZJTEVfUkVRVUVTVEVEIiwiRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFIiwiRElTUExBWV9BU1NFVF9FUlJPUiIsIkVycm9yUGFnZSIsInN0cmluZyIsImluaXRpYWxpemUiLCJHQUxpc3RlbmVyIiwic2VuZFBhZ2VWaWV3IiwibG9jYXRpb24iLCJsaXN0ZW4iLCJzZXQiLCJwYXRobmFtZSIsInBhZ2V2aWV3IiwiY2hpbGRyZW4iLCJzaG93IiwiZGlzcGxheUFzc2V0IiwiYXNzZXQiLCJvbkZpbGVSZXF1ZXN0IiwicHVibGlzaCIsImZpbGVFcnJvciIsInNldEZpbGVFcnJvciIsIkFib3V0UGFnZSIsIkxvZ28iLCJOYXZCYXJDaGFubmVsRHJvcGRvd24iLCJoYW5kbGVTZWxlY3Rpb24iLCJkZWZhdWx0U2VsZWN0aW9uIiwiVklFVyIsIkxPR09VVCIsImxvZ2dlZEluQ2hhbm5lbE5hbWUiLCJBY3RpdmVTdGF0dXNCYXIiLCJJbmFjdGl2ZVN0YXR1c0JhciIsInJlcXVlc3RMaXN0IiwiYXNzZXRMaXN0IiwiYXNzZXRLZXkiLCJzZWxlY3RBc3NldCIsInNlbGVjdFNob3dTdGF0ZSIsInByZXZpb3VzUmVxdWVzdCIsImNoYW5uZWxMaXN0IiwiZGVmYXVsdHMiLCJFeHBhbmRpbmdUZXh0YXJlYSIsIl9oYW5kbGVDaGFuZ2UiLCJhZGp1c3RUZXh0YXJlYSIsImV2ZW50Iiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJlbCIsInN0eWxlIiwiaGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwicmVzdCIsIngiLCJmdW5jIiwiUHVibGlzaFByZXZpZXciLCJpbWdTb3VyY2UiLCJzZXRQcmV2aWV3SW1hZ2VTb3VyY2UiLCJuZXdQcm9wcyIsInNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlIiwicHJldmlld1JlYWRlciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNEYXRhVVJMIiwib25sb2FkZW5kIiwicmVzdWx0IiwiZGltUHJldmlldyIsImJvb2wiLCJvYmplY3QiLCJVcmxNaWRkbGUiLCJwdWJsaXNoSW5DaGFubmVsIiwic2VsZWN0ZWRDaGFubmVsIiwibG9nZ2VkSW5DaGFubmVsU2hvcnRJZCIsImNoYW5uZWxFcnJvciIsIm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZSIsIm9uQ2hhbm5lbFNlbGVjdCIsIm1ldGFkYXRhIiwib25NZXRhZGF0YUNoYW5nZSIsImZpbGVOYW1lIiwiY2xhaW0iLCJ1cmxFcnJvciIsIm9uQ2xhaW1DaGFuZ2UiLCJvblVybEVycm9yIiwibGljZW5zZSIsIm5zZnciLCJvblRvZ2dsZU1ldGFkYXRhSW5wdXRzIiwiUGF0aCIsImdldFN1YkRpcmVjdG9yeU5hbWVzIiwidGhpc0ZvbGRlciIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJtb2R1bGVzIiwiZGVmYXVsdCIsIkhvbWVQYWdlIiwiYXhpb3MiLCJhcGkiLCJhcGlIb3N0IiwiYXBpUG9ydCIsImxicnlBcGlVcmkiLCJjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwiLCJzZW5kR0FUaW1pbmdFdmVudCIsImhhbmRsZUxicnluZXRSZXNwb25zZSIsInJlamVjdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdWJsaXNoQ2xhaW0iLCJwdWJsaXNoUGFyYW1zIiwiZ2FTdGFydFRpbWUiLCJEYXRlIiwibm93IiwicG9zdCIsIm1ldGhvZCIsImdldENsYWltIiwidXJpIiwidGltZW91dCIsImdldENsYWltTGlzdCIsImNsYWltTmFtZSIsInJlc29sdmVVcmkiLCJnZXREb3dubG9hZERpcmVjdG9yeSIsImRvd25sb2FkX2RpcmVjdG9yeSIsImNyZWF0ZUNoYW5uZWwiLCJjaGFubmVsX25hbWUiLCJhbW91bnQiLCJ1YSIsImNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMiLCJoZWFkZXJzIiwiaXAiLCJvcmlnaW5hbFVybCIsImV2ZW50Q2F0ZWdvcnkiLCJldmVudEFjdGlvbiIsImV2ZW50TGFiZWwiLCJpcE92ZXJyaWRlIiwidXNlckFnZW50T3ZlcnJpZGUiLCJjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMiLCJjYXRlZ29yeSIsInZhcmlhYmxlIiwibGFiZWwiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiZHVyYXRpb24iLCJ1c2VyVGltaW5nQ2F0ZWdvcnkiLCJ1c2VyVGltaW5nVmFyaWFibGVOYW1lIiwidXNlclRpbWluZ1RpbWUiLCJ1c2VyVGltaW5nTGFiZWwiLCJzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQiLCJ2aXNpdG9ySWQiLCJyZXBsYWNlIiwidmlzaXRvciIsInN0cmljdENpZEZvcm1hdCIsImh0dHBzIiwic2VuZEdvb2dsZUFuYWx5dGljc1RpbWluZyIsInRpbWluZyIsInNlbmRHQVNlcnZlRXZlbnQiLCJjaGFubmVsX2lkIiwiZ2V0RGVlcGVzdENoaWxkVmFsdWUiLCJwYXJlbnQiLCJjaGlsZHJlbktleXMiLCJjaGlsZEtleSIsInNoaWZ0IiwiY2hpbGQiLCJsZW5ndGgiLCJkeW5hbWljSW1wb3J0IiwiZmlsZVBhdGgiLCJmb2xkZXJzIiwic3BsaXQiLCJmaWx0ZXIiLCJmb2xkZXJOYW1lIiwiY29tcG9uZW50IiwiY3JlYXRlQmFzaWNDYW5vbmljYWxMaW5rIiwiY3JlYXRlQXNzZXRDYW5vbmljYWxMaW5rIiwiY2VydGlmaWNhdGVJZCIsImNyZWF0ZUNoYW5uZWxDYW5vbmljYWxMaW5rIiwiY3JlYXRlQ2Fub25pY2FsTGluayIsInZhbGlkYXRlRmlsZSIsInRlc3QiLCJSRUdFWFBfSU5WQUxJRF9DTEFJTSIsIlJFR0VYUF9JTlZBTElEX0NIQU5ORUwiLCJSRUdFWFBfQUREUkVTUyIsIkNIQU5ORUxfQ0hBUiIsInBhcnNlSWRlbnRpZmllciIsImlkZW50aWZpZXIiLCJjb21wb25lbnRzUmVnZXgiLCJSZWdFeHAiLCJleGVjIiwibWF0Y2giLCJwcm90byIsIm1vZGlmaWVyU2VwZXJhdG9yIiwiaXNDaGFubmVsIiwic3RhcnRzV2l0aCIsIm5hbWVCYWRDaGFycyIsImpvaW4iLCJjaGFubmVsQ2xhaW1JZCIsInBhcnNlQ2xhaW0iLCJleHRlbnNpb25TZXBlcmF0b3IiLCJkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlIiwiZmlsZUV4dCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwiY3JlYXRlQmFzaWNNZXRhVGFncyIsInByb3BlcnR5IiwiY29udGVudCIsImNyZWF0ZUNoYW5uZWxNZXRhVGFncyIsImNyZWF0ZUFzc2V0TWV0YVRhZ3MiLCJjb250ZW50VHlwZSIsImVtYmVkVXJsIiwic2hvd1VybCIsInNvdXJjZSIsIm9nVGl0bGUiLCJvZ0Rlc2NyaXB0aW9uIiwib2dUaHVtYm5haWxDb250ZW50VHlwZSIsIm9nVGh1bWJuYWlsIiwibWV0YVRhZ3MiLCJjcmVhdGVNZXRhVGFncyIsImNyZWF0ZVBhZ2VUaXRsZSIsInBhZ2VUaXRsZSIsInVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCIsIkNIQU5ORUxfVVBEQVRFIiwiTmF2QmFyIiwiY2hlY2tGb3JMb2dnZWRJblVzZXIiLCJsb2dvdXRVc2VyIiwiY3JlZGVudGlhbHMiLCJzaG9ydENoYW5uZWxJZCIsInNlbGVjdGVkT3B0aW9ucyIsIlNFTyIsInBhZ2VVcmkiLCJjYW5vbmljYWxMaW5rIiwicmVsIiwiaHJlZiIsIkxvZ2luUGFnZSIsIkNoYW5uZWxMb2dpbkZvcm0iLCJoYW5kbGVJbnB1dCIsImxvZ2luVG9DaGFubmVsIiwicHJldmVudERlZmF1bHQiLCJib2R5IiwiSGVhZGVycyIsInN1Y2Nlc3MiLCJjaGFubmVsUGFzc3dvcmQiLCJDaGFubmVsQ3JlYXRlRm9ybSIsImhhbmRsZUNoYW5uZWxJbnB1dCIsImlucHV0IiwiY2xlYW5zZUNoYW5uZWxJbnB1dCIsInVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSIsImNoYW5uZWxXaXRoQXRTeW1ib2wiLCJjaGVja0lzUGFzc3dvcmRQcm92aWRlZCIsImNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIiwibWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCIsIlNob3dQYWdlIiwibmV4dFByb3BzIiwiU2hvd0xpdGUiLCJBc3NldERpc3BsYXkiLCJTaG93QXNzZXREZXRhaWxzIiwiQXNzZXRUaXRsZSIsIkFzc2V0SW5mbyIsImNvcHlUb0NsaXBib2FyZCIsImVsZW1lbnRUb0NvcHkiLCJkYXRhc2V0IiwiZWxlbWVudHRvY29weSIsImVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0IiwiZXhlY0NvbW1hbmQiLCJTaG93Q2hhbm5lbCIsIkNoYW5uZWxDbGFpbXNEaXNwbGF5Iiwic2hvd05leHRSZXN1bHRzUGFnZSIsInNob3dQcmV2aW91c1Jlc3VsdHNQYWdlIiwiY3VycmVudFBhZ2UiLCJwcmV2aW91c1BhZ2UiLCJwYXJzZUludCIsInNob3dOZXdQYWdlIiwibmV4dFBhZ2UiLCJjbGFpbXMiLCJ0b3RhbFBhZ2VzIiwiQXNzZXRQcmV2aWV3IiwiZGlyZWN0U291cmNlTGluayIsInNob3dVcmxMaW5rIiwiRm91ck9oRm9yUGFnZSIsImxzdGF0U3luYyIsInJlYWRkaXJTeW5jIiwicm9vdCIsImZ1bGxQYXRoIiwiaXNEaXJlY3RvcnkiLCJzdGF0ZXMiLCJDaGFubmVsU2VsZWN0IiwidG9nZ2xlQW5vbnltb3VzUHVibGlzaCIsInNlbGVjdGVkT3B0aW9uIiwiTE9HSU4iLCJDUkVBVEUiLCJEcm9wem9uZSIsImRyYWdPdmVyIiwibW91c2VPdmVyIiwiaGFuZGxlRHJvcCIsImhhbmRsZURyYWdPdmVyIiwiaGFuZGxlRHJhZ0VuZCIsImhhbmRsZURyYWdFbnRlciIsImhhbmRsZURyYWdMZWF2ZSIsImhhbmRsZU1vdXNlRW50ZXIiLCJoYW5kbGVNb3VzZUxlYXZlIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVGaWxlSW5wdXQiLCJjaG9vc2VGaWxlIiwiZHQiLCJkYXRhVHJhbnNmZXIiLCJpdGVtcyIsImtpbmQiLCJkcm9wcGVkRmlsZSIsImdldEFzRmlsZSIsInJlbW92ZSIsImNsZWFyRGF0YSIsImNsaWNrIiwiZmlsZUxpc3QiLCJmaWxlcyIsIlB1Ymxpc2hEZXRhaWxzIiwib25QdWJsaXNoU3VibWl0IiwiUHVibGlzaFRpdGxlSW5wdXQiLCJlIiwiUHVibGlzaFVybElucHV0Iiwic2V0Q2xhaW1OYW1lIiwidmFsaWRhdGVDbGFpbSIsImNsZWFuc2VJbnB1dCIsImZpbGVOYW1lV2l0aG91dEVuZGluZyIsImNsZWFuQ2xhaW1OYW1lIiwiZGF0YVVSSXRvQmxvYiIsImRhdGFVUkkiLCJieXRlU3RyaW5nIiwiYXRvYiIsIm1pbWVTdHJpbmciLCJpYSIsIlVpbnQ4QXJyYXkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsIlB1Ymxpc2hUaHVtYm5haWxJbnB1dCIsInZpZGVvU291cmNlIiwic2xpZGVyTWluUmFuZ2UiLCJzbGlkZXJNYXhSYW5nZSIsInNsaWRlclZhbHVlIiwiaGFuZGxlVmlkZW9Mb2FkZWREYXRhIiwiaGFuZGxlU2xpZGVyQ2hhbmdlIiwiY3JlYXRlVGh1bWJuYWlsIiwic2V0VmlkZW9Tb3VyY2UiLCJkYXRhVXJpIiwiYmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInRvdGFsTWludXRlcyIsIk1hdGgiLCJmbG9vciIsInRvdGFsU2Vjb25kcyIsInZpZGVvIiwiY3VycmVudFRpbWUiLCJjYW52YXMiLCJjcmVhdGVFbGVtZW50Iiwid2lkdGgiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiZGF0YVVybCIsInRvRGF0YVVSTCIsInNuYXBzaG90IiwiZGlzcGxheSIsIlB1Ymxpc2hNZXRhZGF0YUlucHV0cyIsInRvZ2dsZVNob3dJbnB1dHMiLCJoYW5kbGVTZWxlY3QiLCJjaGVja2VkIiwibWF4SGVpZ2h0IiwiUHVibGlzaERpc2FibGVkTWVzc2FnZSIsInB1Ymxpc2hTdGF0ZXMiLCJQdWJsaXNoU3RhdHVzIiwiTE9BRF9TVEFSVCIsIkxPQURJTkciLCJQVUJMSVNISU5HIiwiU1VDQ0VTUyIsIkZBSUxFRCIsIlB1Ymxpc2hUb29sIiwiTXlzcWxDb25maWciLCJTbGFja0NvbmZpZyIsInNsYWNrV2ViSG9vayIsInNsYWNrRXJyb3JDaGFubmVsIiwic2xhY2tJbmZvQ2hhbm5lbCIsInJldHVyblNob3J0SWQiLCJjbGFpbXNBcnJheSIsImNsYWltSW5kZXgiLCJzaG9ydElkTGVuZ3RoIiwiZmluZEluZGV4IiwicG9zc2libGVNYXRjaGVzIiwic2xpY2UiLCJmcyIsInBhcnNlUHVibGlzaEFwaVJlcXVlc3RCb2R5IiwiaW52YWxpZE5hbWVDaGFyYWN0ZXJzIiwicGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzIiwicGF0aCIsInZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIiwiZmlsZVR5cGUiLCJ0aHVtYm5haWxGaWxlTmFtZSIsInRodW1ibmFpbEZpbGVQYXRoIiwidGh1bWJuYWlsRmlsZVR5cGUiLCJjcmVhdGVCYXNpY1B1Ymxpc2hQYXJhbXMiLCJ0cmltIiwiZmlsZV9wYXRoIiwiYmlkIiwiYXV0aG9yIiwibGFuZ3VhZ2UiLCJjbGFpbV9hZGRyZXNzIiwiY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyIsImRlbGV0ZVRlbXBvcmFyeUZpbGUiLCJ1bmxpbmsiLCJhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSIsImZpbGVJbmZvIiwiZ2V0UmVzdWx0IiwiZmlsZV9uYW1lIiwiZG93bmxvYWRfcGF0aCIsImNyZWF0ZUZpbGVEYXRhIiwib3V0cG9pbnQiLCJhZGRyZXNzIiwiaGFuZGxlRXJyb3JSZXNwb25zZSIsInJlcyIsInVzZU9iamVjdFByb3BlcnRpZXNJZk5vS2V5cyIsInJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyIsImNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkIiwiY29kZSIsIm5ld0Vycm9yT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMiLCJOT19DSEFOTkVMIiwiTk9fQ0xBSU0iLCJOT19GSUxFIiwiZ2V0Q2xhaW1JZCIsImdldENsYWltSWRCeUNoYW5uZWwiLCJnZXRDbGFpbUlkQnlDbGFpbSIsImdldExvbmdDbGFpbUlkIiwibG9uZ0NsYWltSWQiLCJnZXRMb25nQ2hhbm5lbElkIiwibG9uZ0NoYW5uZWxJZCIsImdldENsYWltSWRCeUxvbmdDaGFubmVsSWQiLCJnZXRDaGFubmVsRGF0YSIsImxvbmdDaGFubmVsQ2xhaW1JZCIsImdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQiLCJzaG9ydENoYW5uZWxDbGFpbUlkIiwiZ2V0Q2hhbm5lbENsYWltcyIsImdldEFsbENoYW5uZWxDbGFpbXMiLCJjaGFubmVsQ2xhaW1zQXJyYXkiLCJwYWdpbmF0ZWRDaGFubmVsVmlld0RhdGEiLCJnZXRMb2NhbEZpbGVSZWNvcmQiLCJkYXRhVmFsdWVzIiwicmVxIiwiY29udGV4dCIsInN0b3JlIiwiaHRtbCIsImhlbG1ldCIsInJlbmRlclN0YXRpYyIsInJlZGlyZWN0IiwicHJlbG9hZGVkU3RhdGUiLCJnZXRTdGF0ZSIsInNlbmQiLCJMT0NBTF9DSEVDSyIsIlVOQVZBSUxBQkxFIiwiRVJST1IiLCJBVkFJTEFCTEUiLCJBcHAiLCJjcmVhdGVQdWJsaXNoTWV0YWRhdGEiLCJjcmVhdGVQdWJsaXNoRm9ybURhdGEiLCJmZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiaGFzT3duUHJvcGVydHkiLCJjcmVhdGVUaHVtYm5haWxVcmwiLCJ2YWxpZGF0ZUNoYW5uZWxTZWxlY3Rpb24iLCJ2YWxpZGF0ZVB1Ymxpc2hQYXJhbXMiLCJDSEFOTkVMIiwiQVNTRVRfTElURSIsIkFTU0VUX0RFVEFJTFMiLCJ0b1N0cmluZyIsIm1ldGEiLCJsaW5rIiwic2VsZWN0U2l0ZVN0YXRlIiwic2VsZWN0U2l0ZUhvc3QiLCJTZXJ2ZXIiLCJDb21wb25lbnRzIiwiQ29udGFpbmVycyIsIlBhZ2VzIiwiZXhwcmVzcyIsImJvZHlQYXJzZXIiLCJleHByZXNzSGFuZGxlYmFycyIsIkhhbmRsZWJhcnMiLCJwYXNzcG9ydCIsInNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJkZXNlcmlhbGl6ZVNwZWVjaFVzZXIiLCJjb29raWVTZXNzaW9uIiwiaHR0cCIsImNvbmZpZ3VyZU15c3FsIiwibXlzcWxDb25maWciLCJjb25maWd1cmVTaXRlIiwic2l0ZUNvbmZpZyIsIlBPUlQiLCJjb25maWd1cmVTbGFjayIsInNsYWNrQ29uZmlnIiwiY3JlYXRlQXBwIiwiYXBwIiwiZW5hYmxlIiwidXNlIiwic3RhdGljIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwibmV4dCIsInZlcmJvc2UiLCJzZXJpYWxpemVVc2VyIiwiZGVzZXJpYWxpemVVc2VyIiwibG9jYWxTaWdudXBTdHJhdGVneSIsImxvY2FsTG9naW5TdHJhdGVneSIsIm1heEFnZSIsInNlc3Npb24iLCJoYnMiLCJkZWZhdWx0TGF5b3V0IiwiaGFuZGxlYmFycyIsImVuZ2luZSIsInNlcnZlciIsInN0YXJ0Iiwic3luYyIsInVzZXIiLCJkb25lIiwiUGFzc3BvcnRMb2NhbFN0cmF0ZWd5IiwiU3RyYXRlZ3kiLCJsYnJ5QXBpIiwidXNlcm5hbWVGaWVsZCIsInBhc3N3b3JkRmllbGQiLCJ1c2VySW5mbyIsInVzZXJEYXRhIiwidXNlck5hbWUiLCJjaGFubmVsRGF0YSIsInR4IiwiY2xhaW1faWQiLCJjZXJ0aWZpY2F0ZURhdGEiLCJuZXdVc2VyIiwibmV3Q2hhbm5lbCIsIm5ld0NlcnRpZmljYXRlIiwic2V0Q2hhbm5lbCIsInNldFVzZXIiLCJsYnJ5Q29uZmlnIiwiU1RSSU5HIiwiQk9PTEVBTiIsIklOVEVHRVIiLCJURVhUIiwiREVDSU1BTCIsImRlZmluZSIsImNsYWltU2VxdWVuY2UiLCJkZWNvZGVkQ2xhaW0iLCJkZXB0aCIsImVmZmVjdGl2ZUFtb3VudCIsImhhc1NpZ25hdHVyZSIsImhleCIsIm5vdXQiLCJ0eGlkIiwidmFsaWRBdEhlaWdodCIsInZhbHVlVmVyc2lvbiIsImNsYWltVHlwZSIsImNlcnRpZmljYXRlVmVyc2lvbiIsImtleVR5cGUiLCJwdWJsaWNLZXkiLCJmcmVlemVUYWJsZU5hbWUiLCJiZWxvbmdzVG8iLCJmb3JlaWduS2V5IiwiYWxsb3dOdWxsIiwiZmluZEFsbCIsIm9yZGVyIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCIsIiRsaWtlIiwiZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZSIsInZhbGlkYXRlTG9uZ0NoYW5uZWxJZCIsImhhc09uZSIsImRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUiLCJkZXRlcm1pbmVUaHVtYm5haWwiLCJzdG9yZWRUaHVtYm5haWwiLCJwcmVwYXJlQ2xhaW1EYXRhIiwibGljZW5zZVVybCIsInByZXZpZXciLCJtZXRhZGF0YVZlcnNpb24iLCJzb3VyY2VUeXBlIiwic291cmNlVmVyc2lvbiIsInN0cmVhbVZlcnNpb24iLCJnZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQiLCJyYXciLCJnZXRMb25nQ2xhaW1JZEZyb21TaG9ydENsYWltSWQiLCJnZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lIiwidmFsaWRhdGVMb25nQ2xhaW1JZCIsInJlc29sdmVDbGFpbSIsImNsYWltQXJyYXkiLCJkZWZhdWx0VmFsdWUiLCJ0cmVuZGluZ0VsaWdpYmxlIiwiaGFzTWFueSIsImdldFJlY2VudENsYWltcyIsImxpbWl0IiwiYWN0aW9uIiwiaXBBZGRyZXNzIiwiYmNyeXB0IiwicHJvdG90eXBlIiwiY29tcGFyZVBhc3N3b3JkIiwiY29tcGFyZSIsImNoYW5nZVBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJnZW5TYWx0Iiwic2FsdEVycm9yIiwic2FsdCIsImhhc2giLCJoYXNoRXJyb3IiLCJob29rIiwicmV0dXJuVXNlckFuZENoYW5uZWxJbmZvIiwidXNlckluc3RhbmNlIiwiZ2V0Q2hhbm5lbCIsImlzTWF0Y2giLCJsb2dJbiIsImdldCIsImxvZ291dCIsIm11bHRpcGFydCIsIm11bHRpcGFydE1pZGRsZXdhcmUiLCJ1cGxvYWREaXIiLCJjbGFpbU5hbWVJc0F2YWlsYWJsZSIsImNoZWNrQ2hhbm5lbEF2YWlsYWJpbGl0eSIsImVycm9ySGFuZGxlcnMiLCJhdXRoZW50aWNhdGVVc2VyIiwiYXZhaWxhYmxlTmFtZSIsImNsYWltc0xpc3QiLCJyZXNvbHZlUmVzdWx0IiwiZmlsZURhdGEiLCJmaWxlUmVjb3JkIiwiY29tcGxldGVkIiwicmVzb2x2ZWRVcmkiLCJ2YWxpZGF0ZWRDbGFpbU5hbWUiLCJ0aHVtYm5haWxQdWJsaXNoUGFyYW1zIiwibGJyeVR4IiwiY2xhaW1JbmZvIiwicHVibGlzaEhlbHBlcnMiLCJPcCIsInB1Ymxpc2hSZXN1bHRzIiwiY2xhaW1SZWNvcmQiLCJ1cHNlcnRDcml0ZXJpYSIsInNldENsYWltIiwic2V0RmlsZSIsImNsYWltQWRkcmVzc2VzIiwiYXR0cmlidXRlcyIsIm9yIiwiYXV0aGVudGljYXRlQ2hhbm5lbENyZWRlbnRpYWxzIiwidXNlclBhc3N3b3JkIiwiY2hhbm5lbEZpbmRQYXJhbXMiLCJDTEFJTVNfUEVSX1BBR0UiLCJkZXRlcm1pbmVUb3RhbFBhZ2VzIiwicGFnaW5hdGlvblBhZ2UiLCJnZXRQYWdlRnJvbVF1ZXJ5Iiwidmlld0RhdGEiLCJleHRyYWN0UGFnZUZyb21DbGFpbXMiLCJkZXRlcm1pbmVQcmV2aW91c1BhZ2UiLCJkZXRlcm1pbmVOZXh0UGFnZSIsInRvdGFsUmVzdWx0cyIsImRldGVybWluZVRvdGFsQ2xhaW1zIiwicGFnZU51bWJlciIsImNsYWltU3RhcnRJbmRleCIsImNsYWltRW5kSW5kZXgiLCJwYWdlT2ZDbGFpbXMiLCJ0b3RhbENsYWltcyIsImZ1bGxQYWdlcyIsInJlbWFpbmRlciIsImhhbmRsZVBhZ2VSZW5kZXIiLCJyZW5kZXIiLCJsYXlvdXQiLCJpbml0aWFsU3RhdGUiLCJhc3NpZ24iLCJwdWJsaXNoU3VibWl0IiwiZ29vZ2xlQW5hbHl0aWNzSWQiLCJkZXRlcm1pbmVSZXNwb25zZVR5cGUiLCJmbGlwQ2xhaW1OYW1lQW5kSWRGb3JCYWNrd2FyZHNDb21wYXRpYmlsaXR5IiwibG9nUmVxdWVzdERhdGEiLCJnZXRDbGFpbUlkQW5kU2VydmVBc3NldCIsImxicnlVcmkiLCJoYW5kbGVTaG93UmVuZGVyIiwiU0VSVkUiLCJoYXNGaWxlRXh0ZW5zaW9uIiwicGFyc2VNb2RpZmllciIsInJlc3BvbnNlVHlwZSIsIlNIT1ciLCJjbGllbnRBY2NlcHRzSHRtbCIsImFjY2VwdCIsInJlcXVlc3RJc0Zyb21Ccm93c2VyIiwiY2xpZW50V2FudHNBc3NldCIsInJhbmdlIiwiaW1hZ2VJc1dhbnRlZCIsInZpZGVvSXNXYW50ZWQiLCJpc1ZhbGlkQ2xhaW1JZCIsImlzVmFsaWRTaG9ydElkIiwiaXNWYWxpZFNob3J0SWRPckNsYWltSWQiLCJzZXJ2ZUFzc2V0VG9DbGllbnQiLCJzZW5kRmlsZU9wdGlvbnMiLCJzZW5kRmlsZSIsImZ1bGxDbGFpbUlkIiwidGVtcE5hbWUiLCJyZXR1cm5TYWdhV2l0aFBhcmFtcyIsInNhZ2EiLCJzYWdhTWlkZGxld2FyZSIsIm1pZGRsZXdhcmUiLCJydW4iLCJoYW5kbGVTaG93UGFnZVVyaSIsIndhdGNoSGFuZGxlU2hvd1BhZ2VVcmkiLCJwYXJzZUFuZFVwZGF0ZUlkZW50aWZpZXJBbmRDbGFpbSIsInBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5IiwibmV3QXNzZXRSZXF1ZXN0Iiwid2F0Y2hOZXdBc3NldFJlcXVlc3QiLCJnZXRTaG9ydElkIiwiZ2V0Q2xhaW1EYXRhIiwibmV3Q2hhbm5lbFJlcXVlc3QiLCJ3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0Iiwid2F0Y2hVcGRhdGVDaGFubmVsQ2xhaW1zIiwiZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCIsImxvZ0xldmVsIiwid2luc3RvbiIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJjb2xvcml6ZSIsInByZXR0eVByaW50IiwiaGFuZGxlRXhjZXB0aW9ucyIsImh1bWFuUmVhZGFibGVVbmhhbmRsZWRFeGNlcHRpb24iLCJ3YXJuIiwic2lsbHkiLCJsb2dnZXJDb25maWciLCJ3aW5zdG9uU2xhY2tXZWJIb29rIiwiU2xhY2tXZWJIb29rIiwiYWRkIiwid2ViaG9va1VybCIsImljb25FbW9qaSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7Ozs7Ozs7QUNqSk8sSUFBTWhXLGtDQUFhLFlBQW5CO0FBQ0EsSUFBTUMsNEJBQVUsU0FBaEI7QUFDQSxJQUFNQyxrQ0FBYSxZQUFuQjtBQUNBLElBQU1DLDRCQUFVLFNBQWhCO0FBQ0EsSUFBTUMsMEJBQVMsUUFBZixDOzs7Ozs7QUNKUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWIyNDhiOGE5NmE5NmIzY2U0MzEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b25cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5zdG9uXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gU2l0ZUNvbmZpZyAoKSB7XG4gIHRoaXMuYW5hbHl0aWNzID0ge1xuICAgIGdvb2dsZUlkOiAnZGVmYXVsdCcsXG4gIH07XG4gIHRoaXMuYXNzZXREZWZhdWx0cyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ0FuIGFzc2V0IHB1Ymxpc2hlZCBvbiBTcGVlLmNoJyxcbiAgICB0aHVtYm5haWwgIDogJ2h0dHBzOi8vc3BlZS5jaC9hc3NldHMvaW1nL3ZpZGVvX3RodW1iX2RlZmF1bHQucG5nJyxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICB9O1xuICB0aGlzLmF1dGggPSB7XG4gICAgc2Vzc2lvbktleTogJ2RlZmF1bHQnLFxuICB9O1xuICB0aGlzLmN1c3RvbUNvbXBvbmVudHMgPSB7XG4gICAgY29tcG9uZW50czoge30sXG4gICAgY29udGFpbmVyczoge30sXG4gICAgcGFnZXMgICAgIDoge30sXG4gIH07XG4gIHRoaXMuZGV0YWlscyA9IHtcbiAgICBkZXNjcmlwdGlvbjogJ09wZW4tc291cmNlLCBkZWNlbnRyYWxpemVkIGltYWdlIGFuZCB2aWRlbyBzaGFyaW5nLicsXG4gICAgaG9zdCAgICAgICA6ICdkZWZhdWx0JyxcbiAgICBwb3J0ICAgICAgIDogMzAwMCxcbiAgICB0aXRsZSAgICAgIDogJ1NwZWUuY2gnLFxuICAgIHR3aXR0ZXIgICAgOiAnQHNwZWVfY2gnLFxuICB9O1xuICB0aGlzLnB1Ymxpc2hpbmcgPSB7XG4gICAgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzOiBbXSxcbiAgICBkaXNhYmxlZCAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgIGRpc2FibGVkTWVzc2FnZSAgICAgICAgIDogJ1BsZWFzZSBjaGVjayBiYWNrIHNvb24uJyxcbiAgICBwcmltYXJ5Q2xhaW1BZGRyZXNzICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsICAgICAgICA6ICdkZWZhdWx0JyxcbiAgICB0aHVtYm5haWxDaGFubmVsSWQgICAgICA6ICdkZWZhdWx0JyxcbiAgICB1cGxvYWREaXJlY3RvcnkgICAgICAgICA6ICcvaG9tZS9sYnJ5L1VwbG9hZHMnLFxuICB9O1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBzaXRlIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3QgeyBhbmFseXRpY3MsIGFzc2V0RGVmYXVsdHMsIGF1dGgsIGN1c3RvbUNvbXBvbmVudHMsIGRldGFpbHMsIHB1Ymxpc2hpbmcgfSA9IGNvbmZpZztcbiAgICB0aGlzLmFuYWx5dGljcyA9IGFuYWx5dGljcztcbiAgICB0aGlzLmFzc2V0RGVmYXVsdHMgPSBhc3NldERlZmF1bHRzO1xuICAgIHRoaXMuYXV0aCA9IGF1dGg7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB0aGlzLnB1Ymxpc2hpbmcgPSBwdWJsaXNoaW5nO1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50cyA9IGN1c3RvbUNvbXBvbmVudHM7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBTaXRlQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvc2l0ZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHNpdGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxOYW1lICAgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIGNoYW5uZWxTaG9ydElkOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5zaG9ydElkLFxuICAgIGNoYW5uZWxMb25nSWQgOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5sb25nSWQsXG4gICAgc2l0ZURlc2NyaXB0aW9uOiBzaXRlLmRlc2NyaXB0aW9uLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsTG9nb3V0OiAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobnVsbCwgbnVsbCwgbnVsbCkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL05hdkJhci9pbmRleC5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcblxuLy8gZXhwb3J0IGFjdGlvbiBjcmVhdG9yc1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbGUgKGZpbGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfU0VMRUNURUQsXG4gICAgZGF0YTogZmlsZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckZpbGUgKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9DTEVBUixcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVNZXRhZGF0YSAobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLk1FVEFEQVRBX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgdmFsdWUsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFpbSAodmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNMQUlNX1VQREFURSxcbiAgICBkYXRhOiB2YWx1ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQdWJsaXNoSW5DaGFubmVsIChjaGFubmVsKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5TRVRfUFVCTElTSF9JTl9DSEFOTkVMLFxuICAgIGNoYW5uZWwsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHVibGlzaFN0YXR1cyAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVRVU19VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUVycm9yIChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRVJST1JfVVBEQVRFLFxuICAgIGRhdGE6IHtcbiAgICAgIG5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCAoY2hhbm5lbE5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFLFxuICAgIGRhdGE6IGNoYW5uZWxOYW1lLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1ldGFkYXRhSW5wdXRzIChzaG93TWV0YWRhdGFJbnB1dHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlRPR0dMRV9NRVRBREFUQV9JTlBVVFMsXG4gICAgZGF0YTogc2hvd01ldGFkYXRhSW5wdXRzLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3VGh1bWJuYWlsIChmaWxlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5USFVNQk5BSUxfTkVXLFxuICAgIGRhdGE6IGZpbGUsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRQdWJsaXNoIChoaXN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5QVUJMSVNIX1NUQVJULFxuICAgIGRhdGE6IHsgaGlzdG9yeSB9LFxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvcHVibGlzaC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaXRlIH0pID0+IHtcbiAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIGRlc2NyaXB0aW9uOiBzaXRlRGVzY3JpcHRpb24sIGhvc3Q6IHNpdGVIb3N0LCB0aXRsZTogc2l0ZVRpdGxlLCB0d2l0dGVyOiBzaXRlVHdpdHRlciB9ID0gc2l0ZTtcbiAgcmV0dXJuIHtcbiAgICBkZWZhdWx0RGVzY3JpcHRpb24sXG4gICAgZGVmYXVsdFRodW1ibmFpbCxcbiAgICBzaXRlRGVzY3JpcHRpb24sXG4gICAgc2l0ZUhvc3QsXG4gICAgc2l0ZVRpdGxlLFxuICAgIHNpdGVUd2l0dGVyLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvU0VPL2luZGV4LmpzIiwiaW1wb3J0ICdjcm9zcy1mZXRjaC9wb2x5ZmlsbCc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBKU09OIHJldHVybmVkIGJ5IGEgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSByZXNwb25zZSBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBwYXJzZWQgSlNPTiBmcm9tIHRoZSByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSlNPTiAocmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0IHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA1KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIHN0YXR1cyByZXR1cm5lZCBieSBhIG5ldHdvcmsgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBBIHJlc3BvbnNlIGZyb20gYSBuZXR3b3JrIHJlcXVlc3RcbiAqIEBwYXJhbSAge29iamVjdH0gcmVzcG9uc2UgICBUaGUgcGFyc2VkIEpTT04gZnJvbSB0aGUgbmV0d29yayByZXF1ZXN0XG4gKlxuICogQHJldHVybiB7b2JqZWN0IHwgdW5kZWZpbmVkfSBSZXR1cm5zIG9iamVjdCB3aXRoIHN0YXR1cyBhbmQgc3RhdHVzVGV4dCwgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzIChyZXNwb25zZSwganNvblJlc3BvbnNlKSB7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XG4gIH1cbiAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoanNvblJlc3BvbnNlLm1lc3NhZ2UpO1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0cyBhIFVSTCwgcmV0dXJuaW5nIGEgcHJvbWlzZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsICAgICAgIFRoZSBVUkwgd2Ugd2FudCB0byByZXF1ZXN0XG4gKiBAcGFyYW0gIHtvYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyB3ZSB3YW50IHRvIHBhc3MgdG8gXCJmZXRjaFwiXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICAgVGhlIHJlc3BvbnNlIGRhdGFcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1ZXN0ICh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoKHVybCwgb3B0aW9ucylcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3Jlc3BvbnNlLCBwYXJzZUpTT04ocmVzcG9uc2UpXSk7XG4gICAgfSlcbiAgICAudGhlbigoW3Jlc3BvbnNlLCBqc29uUmVzcG9uc2VdKSA9PiB7XG4gICAgICByZXR1cm4gY2hlY2tTdGF0dXMocmVzcG9uc2UsIGpzb25SZXNwb25zZSk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvcmVxdWVzdC5qcyIsImNvbnN0IFNlcXVlbGl6ZSA9IHJlcXVpcmUoJ3NlcXVlbGl6ZScpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5jb25zb2xlLmxvZygnZXhwb3J0aW5nIHNlcXVlbGl6ZSBtb2RlbHMnKTtcbmNvbnN0IHsgZGF0YWJhc2UsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL215c3FsQ29uZmlnJyk7XG5jb25zdCBkYiA9IHt9O1xuLy8gc2V0IHNlcXVlbGl6ZSBvcHRpb25zXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGRhdGFiYXNlLCB1c2VybmFtZSwgcGFzc3dvcmQsIHtcbiAgaG9zdCAgICAgICAgICA6ICdsb2NhbGhvc3QnLFxuICBkaWFsZWN0ICAgICAgIDogJ215c3FsJyxcbiAgZGlhbGVjdE9wdGlvbnM6IHtkZWNpbWFsTnVtYmVyczogdHJ1ZX0sIC8vIGZpeCB0byBlbnN1cmUgREVDSU1BTCB3aWxsIG5vdCBiZSBzdG9yZWQgYXMgYSBzdHJpbmdcbiAgbG9nZ2luZyAgICAgICA6IGZhbHNlLFxuICBwb29sICAgICAgICAgIDoge1xuICAgIG1heCAgICA6IDUsXG4gICAgbWluICAgIDogMCxcbiAgICBpZGxlICAgOiAxMDAwMCxcbiAgICBhY3F1aXJlOiAxMDAwMCxcbiAgfSxcbn0pO1xuXG4vLyBlc3RhYmxpc2ggbXlzcWwgY29ubmVjdGlvblxuc2VxdWVsaXplXG4gIC5hdXRoZW50aWNhdGUoKVxuICAudGhlbigoKSA9PiB7XG4gICAgbG9nZ2VyLmluZm8oJ1NlcXVlbGl6ZSBoYXMgZXN0YWJsaXNoZWQgbXlzcWwgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkuJyk7XG4gIH0pXG4gIC5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcignU2VxdWVsaXplIHdhcyB1bmFibGUgdG8gY29ubmVjdCB0byB0aGUgZGF0YWJhc2U6JywgZXJyKTtcbiAgfSk7XG5cbi8vIG1hbnVhbGx5IGFkZCBlYWNoIG1vZGVsIHRvIHRoZSBkYiBvYmplY3RcbmNvbnN0IENlcnRpZmljYXRlID0gcmVxdWlyZSgnLi9jZXJ0aWZpY2F0ZS5qcycpO1xuY29uc3QgQ2hhbm5lbCA9IHJlcXVpcmUoJy4vY2hhbm5lbC5qcycpO1xuY29uc3QgQ2xhaW0gPSByZXF1aXJlKCcuL2NsYWltLmpzJyk7XG5jb25zdCBGaWxlID0gcmVxdWlyZSgnLi9maWxlLmpzJyk7XG5jb25zdCBSZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0LmpzJyk7XG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi91c2VyLmpzJyk7XG5kYlsnQ2VydGlmaWNhdGUnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NlcnRpZmljYXRlJywgQ2VydGlmaWNhdGUpO1xuZGJbJ0NoYW5uZWwnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ0NoYW5uZWwnLCBDaGFubmVsKTtcbmRiWydDbGFpbSddID0gc2VxdWVsaXplLmltcG9ydCgnQ2xhaW0nLCBDbGFpbSk7XG5kYlsnRmlsZSddID0gc2VxdWVsaXplLmltcG9ydCgnRmlsZScsIEZpbGUpO1xuZGJbJ1JlcXVlc3QnXSA9IHNlcXVlbGl6ZS5pbXBvcnQoJ1JlcXVlc3QnLCBSZXF1ZXN0KTtcbmRiWydVc2VyJ10gPSBzZXF1ZWxpemUuaW1wb3J0KCdVc2VyJywgVXNlcik7XG5cbi8vIHJ1biBtb2RlbC5hc3NvY2lhdGlvbiBmb3IgZWFjaCBtb2RlbCBpbiB0aGUgZGIgb2JqZWN0IHRoYXQgaGFzIGFuIGFzc29jaWF0aW9uXG5PYmplY3Qua2V5cyhkYikuZm9yRWFjaChtb2RlbE5hbWUgPT4ge1xuICBpZiAoZGJbbW9kZWxOYW1lXS5hc3NvY2lhdGUpIHtcbiAgICBsb2dnZXIuaW5mbygnQXNzb2NpYXRpbmcgbW9kZWw6JywgbW9kZWxOYW1lKTtcbiAgICBkYlttb2RlbE5hbWVdLmFzc29jaWF0ZShkYik7XG4gIH1cbn0pO1xuXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XG5kYi5TZXF1ZWxpemUgPSBTZXF1ZWxpemU7XG5cbi8vIGFkZCBhbiAndXBzZXJ0JyBtZXRob2QgdG8gdGhlIGRiIG9iamVjdFxuZGIudXBzZXJ0ID0gKE1vZGVsLCB2YWx1ZXMsIGNvbmRpdGlvbiwgdGFibGVOYW1lKSA9PiB7XG4gIHJldHVybiBNb2RlbFxuICAgIC5maW5kT25lKHtcbiAgICAgIHdoZXJlOiBjb25kaXRpb24sXG4gICAgfSlcbiAgICAudGhlbihvYmogPT4ge1xuICAgICAgaWYgKG9iaikgeyAgLy8gdXBkYXRlXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgdXBkYXRpbmcgcmVjb3JkIGluIGRiLiR7dGFibGVOYW1lfWApO1xuICAgICAgICByZXR1cm4gb2JqLnVwZGF0ZSh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHsgIC8vIGluc2VydFxuICAgICAgICBsb2dnZXIuZGVidWcoYGNyZWF0aW5nIHJlY29yZCBpbiBkYi4ke3RhYmxlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIE1vZGVsLmNyZWF0ZSh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGAke3RhYmxlTmFtZX0udXBzZXJ0IGVycm9yYCwgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFjdGl2ZVN0YXR1c0JhciBmcm9tICdjb21wb25lbnRzL0FjdGl2ZVN0YXR1c0Jhcic7XG5pbXBvcnQgSW5hY3RpdmVTdGF0dXNCYXIgZnJvbSAnY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhcic7XG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBiYXJzICAgICAgIDogW10sXG4gICAgICBpbmRleCAgICAgIDogMCxcbiAgICAgIGluY3JlbWVudGVyOiAxLFxuICAgIH07XG4gICAgdGhpcy5jcmVhdGVCYXJzID0gdGhpcy5jcmVhdGVCYXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFydFByb2dyZXNzQmFyID0gdGhpcy5zdGFydFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhciA9IHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhciA9IHRoaXMuc3RvcFByb2dyZXNzQmFyLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuY3JlYXRlQmFycygpO1xuICAgIHRoaXMuc3RhcnRQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLnN0b3BQcm9ncmVzc0JhcigpO1xuICB9XG4gIGNyZWF0ZUJhcnMgKCkge1xuICAgIGNvbnN0IGJhcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLnByb3BzLnNpemU7IGkrKykge1xuICAgICAgYmFycy5wdXNoKHtpc0FjdGl2ZTogZmFsc2V9KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGJhcnMgfSk7XG4gIH1cbiAgc3RhcnRQcm9ncmVzc0JhciAoKSB7XG4gICAgdGhpcy51cGRhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIuYmluZCh0aGlzKSwgMzAwKTtcbiAgfTtcbiAgdXBkYXRlUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuc3RhdGUuaW5kZXg7XG4gICAgbGV0IGluY3JlbWVudGVyID0gdGhpcy5zdGF0ZS5pbmNyZW1lbnRlcjtcbiAgICBsZXQgYmFycyA9IHRoaXMuc3RhdGUuYmFycztcbiAgICAvLyBmbGlwIGluY3JlbWVudGVyIGlmIG5lY2Vzc2FyeSwgdG8gc3RheSBpbiBib3VuZHNcbiAgICBpZiAoKGluZGV4IDwgMCkgfHwgKGluZGV4ID4gdGhpcy5wcm9wcy5zaXplKSkge1xuICAgICAgaW5jcmVtZW50ZXIgPSBpbmNyZW1lbnRlciAqIC0xO1xuICAgICAgaW5kZXggKz0gaW5jcmVtZW50ZXI7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSB0aGUgaW5kZXhlZCBiYXJcbiAgICBpZiAoaW5jcmVtZW50ZXIgPiAwKSB7XG4gICAgICBiYXJzW2luZGV4XS5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhcnNbaW5kZXhdLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfTtcbiAgICAvLyBpbmNyZW1lbnQgaW5kZXhcbiAgICBpbmRleCArPSBpbmNyZW1lbnRlcjtcbiAgICAvLyB1cGRhdGUgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGJhcnMsXG4gICAgICBpbmNyZW1lbnRlcixcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9O1xuICBzdG9wUHJvZ3Jlc3NCYXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVJbnRlcnZhbCk7XG4gIH07XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHt0aGlzLnN0YXRlLmJhcnMubWFwKChiYXIsIGluZGV4KSA9PiBiYXIuaXNBY3RpdmUgPyA8QWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9IC8+IDogPEluYWN0aXZlU3RhdHVzQmFyIGtleT17aW5kZXh9Lz4pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuUHJvZ3Jlc3NCYXIucHJvcFR5cGVzID0ge1xuICBzaXplOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQcm9ncmVzc0JhcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1Byb2dyZXNzQmFyL2luZGV4LmpzeCIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcblxuaW1wb3J0IHsgQ0hBTk5FTCwgQVNTRVRfTElURSwgQVNTRVRfREVUQUlMUyB9IGZyb20gJ2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMnO1xuXG4vLyBiYXNpYyByZXF1ZXN0IHBhcnNpbmdcbmV4cG9ydCBmdW5jdGlvbiBvbkhhbmRsZVNob3dQYWdlVXJpIChwYXJhbXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSxcbiAgICBkYXRhOiBwYXJhbXMsXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25SZXF1ZXN0RXJyb3IgKGVycm9yKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5SRVFVRVNUX0VSUk9SLFxuICAgIGRhdGE6IGVycm9yLFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uTmV3Q2hhbm5lbFJlcXVlc3QgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBDSEFOTkVMO1xuICBjb25zdCByZXF1ZXN0SWQgPSBgY3IjJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsXG4gICAgZGF0YTogeyByZXF1ZXN0VHlwZSwgcmVxdWVzdElkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb25OZXdBc3NldFJlcXVlc3QgKG5hbWUsIGlkLCBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBleHRlbnNpb24pIHtcbiAgY29uc3QgcmVxdWVzdFR5cGUgPSBleHRlbnNpb24gPyBBU1NFVF9MSVRFIDogQVNTRVRfREVUQUlMUztcbiAgY29uc3QgcmVxdWVzdElkID0gYGFyIyR7bmFtZX0jJHtpZH0jJHtjaGFubmVsTmFtZX0jJHtjaGFubmVsSWR9YDtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX1JFUVVFU1RfTkVXLFxuICAgIGRhdGE6IHtcbiAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgcmVxdWVzdElkLFxuICAgICAgbmFtZSxcbiAgICAgIG1vZGlmaWVyOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBjaGFubmVsOiB7XG4gICAgICAgICAgbmFtZTogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgaWQgIDogY2hhbm5lbElkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVxdWVzdFVwZGF0ZSAocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuUkVRVUVTVF9VUERBVEUsXG4gICAgZGF0YToge1xuICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICByZXF1ZXN0SWQsXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCAoaWQsIGVycm9yLCBrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQsXG4gICAgZGF0YTogeyBpZCwgZXJyb3IsIGtleSB9LFxuICB9O1xufTtcblxuLy8gYXNzZXQgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXNzZXRUb0Fzc2V0TGlzdCAoaWQsIGVycm9yLCBuYW1lLCBjbGFpbUlkLCBzaG9ydElkLCBjbGFpbURhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkFTU0VUX0FERCxcbiAgICBkYXRhOiB7IGlkLCBlcnJvciwgbmFtZSwgY2xhaW1JZCwgc2hvcnRJZCwgY2xhaW1EYXRhIH0sXG4gIH07XG59XG5cbi8vIGNoYW5uZWwgYWN0aW9uc1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTmV3Q2hhbm5lbFRvQ2hhbm5lbExpc3QgKGlkLCBuYW1lLCBzaG9ydElkLCBsb25nSWQsIGNsYWltc0RhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkNIQU5ORUxfQURELFxuICAgIGRhdGE6IHsgaWQsIG5hbWUsIHNob3J0SWQsIGxvbmdJZCwgY2xhaW1zRGF0YSB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMsXG4gICAgZGF0YToge2NoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZX0sXG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2hhbm5lbENsYWltcyAoY2hhbm5lbExpc3RJZCwgY2xhaW1zRGF0YSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX1NVQ0NFU1MsXG4gICAgZGF0YToge2NoYW5uZWxMaXN0SWQsIGNsYWltc0RhdGF9LFxuICB9O1xufTtcblxuLy8gZGlzcGxheSBhIGZpbGVcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVSZXF1ZXN0ZWQgKG5hbWUsIGNsYWltSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkZJTEVfUkVRVUVTVEVELFxuICAgIGRhdGE6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZpbGVBdmFpbGFiaWxpdHkgKHN0YXR1cykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFLFxuICAgIGRhdGE6IHN0YXR1cyxcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5QXNzZXRFcnJvciAoZXJyb3IpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBhY3Rpb25zLkRJU1BMQVlfQVNTRVRfRVJST1IsXG4gICAgZGF0YTogZXJyb3IsXG4gIH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FjdGlvbnMvc2hvdy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5cbmNsYXNzIEVycm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8cD57ZXJyb3J9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbkVycm9yUGFnZS5wcm9wVHlwZXMgPSB7XG4gIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvclBhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvRXJyb3JQYWdlL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgR29vZ2xlQW5hbHl0aWNzIGZyb20gJ3JlYWN0LWdhJztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmNvbnN0IHsgYW5hbHl0aWNzOiB7IGdvb2dsZUlkIH0gfSA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbkdvb2dsZUFuYWx5dGljcy5pbml0aWFsaXplKGdvb2dsZUlkKTtcblxuY2xhc3MgR0FMaXN0ZW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnNlbmRQYWdlVmlldyh0aGlzLnByb3BzLmhpc3RvcnkubG9jYXRpb24pO1xuICAgIHRoaXMucHJvcHMuaGlzdG9yeS5saXN0ZW4odGhpcy5zZW5kUGFnZVZpZXcpO1xuICB9XG5cbiAgc2VuZFBhZ2VWaWV3IChsb2NhdGlvbikge1xuICAgIEdvb2dsZUFuYWx5dGljcy5zZXQoeyBwYWdlOiBsb2NhdGlvbi5wYXRobmFtZSB9KTtcbiAgICBHb29nbGVBbmFseXRpY3MucGFnZXZpZXcobG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEdBTGlzdGVuZXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvR0FMaXN0ZW5lci9pbmRleC5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicHJvcC10eXBlc1wiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlTG9nZ2VkSW5DaGFubmVsIH0gZnJvbSAnYWN0aW9ucy9jaGFubmVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge3VwZGF0ZVNlbGVjdGVkQ2hhbm5lbH0gZnJvbSAnLi4vLi4vYWN0aW9ucy9wdWJsaXNoJztcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbm5lbExvZ2luOiAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVMb2dnZWRJbkNoYW5uZWwobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVTZWxlY3RlZENoYW5uZWwobmFtZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG51bGwsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCB9IGZyb20gJ2FjdGlvbnMvY2hhbm5lbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHt1cGRhdGVTZWxlY3RlZENoYW5uZWx9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNoYW5uZWxMb2dpbjogKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTG9nZ2VkSW5DaGFubmVsKG5hbWUsIHNob3J0SWQsIGxvbmdJZCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKG5hbWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IGZpbGVSZXF1ZXN0ZWQgfSBmcm9tICdhY3Rpb25zL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0QXNzZXQgfSBmcm9tICdzZWxlY3RvcnMvc2hvdyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgZXJyb3IgYW5kIHN0YXR1c1xuICBjb25zdCBlcnJvciAgPSBzaG93LmRpc3BsYXlBc3NldC5lcnJvcjtcbiAgY29uc3Qgc3RhdHVzID0gc2hvdy5kaXNwbGF5QXNzZXQuc3RhdHVzO1xuICAvLyBzZWxlY3QgYXNzZXRcbiAgY29uc3QgYXNzZXQgPSBzZWxlY3RBc3NldChzaG93KTtcbiAgLy8gIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGVycm9yLFxuICAgIHN0YXR1cyxcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkZpbGVSZXF1ZXN0OiAobmFtZSwgY2xhaW1JZCkgPT4ge1xuICAgICAgZGlzcGF0Y2goZmlsZVJlcXVlc3RlZChuYW1lLCBjbGFpbUlkKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5L2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHNlbGVjdEZpbGUsIHVwZGF0ZUVycm9yLCBjbGVhckZpbGUgfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZSAgICAgOiBwdWJsaXNoLmZpbGUsXG4gICAgdGh1bWJuYWlsOiBwdWJsaXNoLnRodW1ibmFpbCxcbiAgICBmaWxlRXJyb3I6IHB1Ymxpc2guZXJyb3IuZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzZWxlY3RGaWxlOiAoZmlsZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goc2VsZWN0RmlsZShmaWxlKSk7XG4gICAgfSxcbiAgICBzZXRGaWxlRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2goY2xlYXJGaWxlKCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ2ZpbGUnLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0Ryb3B6b25lL2luZGV4LmpzIiwiLy8gcmVxdWVzdCBhY3Rpb25zXG5leHBvcnQgY29uc3QgSEFORExFX1NIT1dfVVJJID0gJ0hBTkRMRV9TSE9XX1VSSSc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9FUlJPUiA9ICdSRVFVRVNUX0VSUk9SJztcbmV4cG9ydCBjb25zdCBSRVFVRVNUX1VQREFURSA9ICdSRVFVRVNUX1VQREFURSc7XG5leHBvcnQgY29uc3QgQVNTRVRfUkVRVUVTVF9ORVcgPSAnQVNTRVRfUkVRVUVTVF9ORVcnO1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfUkVRVUVTVF9ORVcgPSAnQ0hBTk5FTF9SRVFVRVNUX05FVyc7XG5leHBvcnQgY29uc3QgUkVRVUVTVF9MSVNUX0FERCA9ICdSRVFVRVNUX0xJU1RfQUREJztcblxuLy8gYXNzZXQgYWN0aW9uc1xuZXhwb3J0IGNvbnN0IEFTU0VUX0FERCA9IGBBU1NFVF9BRERgO1xuXG4vLyBjaGFubmVsIGFjdGlvbnNcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0FERCA9ICdDSEFOTkVMX0FERCc7XG5cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfQVNZTkMgPSAnQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DJztcbmV4cG9ydCBjb25zdCBDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyA9ICdDSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUyc7XG5cbi8vIGFzc2V0L2ZpbGUgZGlzcGxheSBhY3Rpb25zXG5leHBvcnQgY29uc3QgRklMRV9SRVFVRVNURUQgPSAnRklMRV9SRVFVRVNURUQnO1xuZXhwb3J0IGNvbnN0IEZJTEVfQVZBSUxBQklMSVRZX1VQREFURSA9ICdGSUxFX0FWQUlMQUJJTElUWV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQVNTRVRfRVJST1IgPSAnRElTUExBWV9BU1NFVF9FUlJPUic7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5cbmNsYXNzIEFib3V0UGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxTRU8gcGFnZVRpdGxlPXsnQWJvdXQnfSBwYWdlVXJpPXsnYWJvdXQnfSAvPlxuICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdwdWxsLXF1b3RlJz5TcGVlLmNoIGlzIGFuIG9wZW4tc291cmNlIHByb2plY3QuICBQbGVhc2UgY29udHJpYnV0ZSB0byB0aGUgZXhpc3Rpbmcgc2l0ZSwgb3IgZm9yayBpdCBhbmQgbWFrZSB5b3VyIG93bi48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vdHdpdHRlci5jb20vc3BlZV9jaCc+VFdJVFRFUjwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaCc+R0lUSFVCPC9hPjwvcD5cbiAgICAgICAgICAgICAgPHA+PGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPkRJU0NPUkQgQ0hBTk5FTDwvYT48L3A+XG4gICAgICAgICAgICAgIDxwPjxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9ibG9iL21hc3Rlci9SRUFETUUubWQnPkRPQ1VNRU5UQVRJT048L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5TcGVlLmNoIGlzIGEgbWVkaWEtaG9zdGluZyBzaXRlIHRoYXQgcmVhZHMgZnJvbSBhbmQgcHVibGlzaGVzIGNvbnRlbnQgdG8gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvJz5MQlJZPC9hPiBibG9ja2NoYWluLjwvcD5cbiAgICAgICAgICAgICAgPHA+U3BlZS5jaCBpcyBhIGhvc3Rpbmcgc2VydmljZSwgYnV0IHdpdGggdGhlIGFkZGVkIGJlbmVmaXQgdGhhdCBpdCBzdG9yZXMgeW91ciBjb250ZW50IG9uIGEgZGVjZW50cmFsaXplZCBuZXR3b3JrIG9mIGNvbXB1dGVycyAtLSB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2xicnkuaW8vZ2V0Jz5MQlJZPC9hPiBuZXR3b3JrLiAgVGhpcyBtZWFucyB0aGF0IHlvdXIgaW1hZ2VzIGFyZSBzdG9yZWQgaW4gbXVsdGlwbGUgbG9jYXRpb25zIHdpdGhvdXQgYSBzaW5nbGUgcG9pbnQgb2YgZmFpbHVyZS48L3A+XG4gICAgICAgICAgICAgIDxoMz5Db250cmlidXRlPC9oMz5cbiAgICAgICAgICAgICAgPHA+SWYgeW91IGhhdmUgYW4gaWRlYSBmb3IgeW91ciBvd24gc3BlZS5jaC1saWtlIHNpdGUgb24gdG9wIG9mIExCUlksIGZvcmsgb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL2xicnlpby9zcGVlLmNoJz5naXRodWIgcmVwbzwvYT4gYW5kIGdvIHRvIHRvd24hPC9wPlxuICAgICAgICAgICAgICA8cD5JZiB5b3Ugd2FudCB0byBpbXByb3ZlIHNwZWUuY2gsIGpvaW4gb3VyIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnPmRpc2NvcmQgY2hhbm5lbDwvYT4gb3Igc29sdmUgb25lIG9mIG91ciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9sYnJ5aW8vc3BlZS5jaC9pc3N1ZXMnPmdpdGh1YiBpc3N1ZXM8L2E+LjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0UGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9BYm91dFBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuZnVuY3Rpb24gTG9nbyAoKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2ZXJzaW9uPScxLjEnIGlkPSdMYXllcl8xJyB4PScwcHgnIHk9JzBweCcgaGVpZ2h0PScyNHB4JyB2aWV3Qm94PScwIDAgODAgMzEnIGVuYWJsZUJhY2tncm91bmQ9J25ldyAwIDAgODAgMzEnIGNsYXNzTmFtZT0nbmF2LWJhci1sb2dvJz5cbiAgICAgIDxMaW5rIHRvPScvJz5cbiAgICAgICAgPHRpdGxlPkxvZ288L3RpdGxlPlxuICAgICAgICA8ZGVzYz5TcGVlLmNoIGxvZ288L2Rlc2M+XG4gICAgICAgIDxnIGlkPSdBYm91dCc+XG4gICAgICAgICAgPGcgaWQ9J1B1Ymxpc2gtRm9ybS1WMi1feDI4X2ZpbGxlZF94MjlfJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNDIuMDAwMDAwLCAtMjMuMDAwMDAwKSc+XG4gICAgICAgICAgICA8ZyBpZD0nR3JvdXAtMTcnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQyLjAwMDAwMCwgMjIuMDAwMDAwKSc+XG4gICAgICAgICAgICAgIDx0ZXh0IHRyYW5zZm9ybT0nbWF0cml4KDEgMCAwIDEgMCAyMCknIGZvbnRTaXplPScyNScgZm9udEZhbWlseT0nUm9ib3RvJz5TcGVlJmx0O2g8L3RleHQ+XG4gICAgICAgICAgICAgIDxnIGlkPSdHcm91cC0xNicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDMwLjAwMDAwMCknPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzA5RjkxMScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTAuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5JyBmaWxsPSdub25lJyBzdHJva2U9JyMwMjlENzQnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J00xNi41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgICA8cGF0aCBpZD0nTGluZS04LUNvcHktMicgZmlsbD0nbm9uZScgc3Ryb2tlPScjRTM1QkQ4JyBzdHJva2VXaWR0aD0nMScgc3Ryb2tlTGluZWNhcD0nc3F1YXJlJyBkPSdNMzIuNSwxLjVoMTUnIC8+XG4gICAgICAgICAgICAgICAgPHBhdGggaWQ9J0xpbmUtOC1Db3B5LTMnIGZpbGw9J25vbmUnIHN0cm9rZT0nIzQxNTZDNScgc3Ryb2tlV2lkdGg9JzEnIHN0cm9rZUxpbmVjYXA9J3NxdWFyZScgZD0nTTQ4LjUsMS41aDE1JyAvPlxuICAgICAgICAgICAgICAgIDxwYXRoIGlkPSdMaW5lLTgtQ29weS00JyBmaWxsPSdub25lJyBzdHJva2U9JyM2MzU2ODgnIHN0cm9rZVdpZHRoPScxJyBzdHJva2VMaW5lY2FwPSdzcXVhcmUnIGQ9J002NC41LDEuNWgxNScgLz5cbiAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9MaW5rPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nbztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0xvZ28vaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZnVuY3Rpb24gTmF2QmFyQ2hhbm5lbERyb3Bkb3duICh7IGNoYW5uZWxOYW1lLCBoYW5kbGVTZWxlY3Rpb24sIGRlZmF1bHRTZWxlY3Rpb24sIFZJRVcsIExPR09VVCB9KSB7XG4gIHJldHVybiAoXG4gICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nbmF2LWJhci1jaGFubmVsLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdyBsaW5rLS1uYXYnIG9uQ2hhbmdlPXtoYW5kbGVTZWxlY3Rpb259IHZhbHVlPXtkZWZhdWx0U2VsZWN0aW9ufT5cbiAgICAgIDxvcHRpb24gaWQ9J25hdi1iYXItY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPntjaGFubmVsTmFtZX08L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e1ZJRVd9PlZpZXc8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9e0xPR09VVH0+TG9nb3V0PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZCYXJDaGFubmVsRHJvcGRvd247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4LmpzeCIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgY2hhbm5lbCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgbG9nZ2VkSW5DaGFubmVsTmFtZTogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwubmFtZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Mb2dpblBhZ2UvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBY3RpdmVTdGF0dXNCYXIgPSAoKSA9PiB7XG4gIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J3Byb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItLWFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWN0aXZlU3RhdHVzQmFyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvQWN0aXZlU3RhdHVzQmFyL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEluYWN0aXZlU3RhdHVzQmFyID0gKCkgPT4ge1xuICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLS1pbmFjdGl2ZSc+fCA8L3NwYW4+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5hY3RpdmVTdGF0dXNCYXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3giLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvciAgICAgIDogc2hvdy5yZXF1ZXN0LmVycm9yLFxuICAgIHJlcXVlc3RUeXBlOiBzaG93LnJlcXVlc3QudHlwZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25IYW5kbGVTaG93UGFnZVVyaSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHNob3cgfSkgPT4ge1xuICAvLyBzZWxlY3QgcmVxdWVzdCBpbmZvXG4gIGNvbnN0IHJlcXVlc3RJZCA9IHNob3cucmVxdWVzdC5pZDtcbiAgLy8gc2VsZWN0IGFzc2V0IGluZm9cbiAgbGV0IGFzc2V0O1xuICBjb25zdCByZXF1ZXN0ID0gc2hvdy5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdIHx8IG51bGw7XG4gIGNvbnN0IGFzc2V0TGlzdCA9IHNob3cuYXNzZXRMaXN0O1xuICBpZiAocmVxdWVzdCAmJiBhc3NldExpc3QpIHtcbiAgICBjb25zdCBhc3NldEtleSA9IHJlcXVlc3Qua2V5OyAgLy8gbm90ZToganVzdCBzdG9yZSB0aGlzIGluIHRoZSByZXF1ZXN0XG4gICAgYXNzZXQgPSBhc3NldExpc3RbYXNzZXRLZXldIHx8IG51bGw7XG4gIH07XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGFzc2V0LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RBc3NldCA9IChzaG93KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGFzc2V0S2V5ID0gcmVxdWVzdC5rZXk7XG4gIHJldHVybiBzaG93LmFzc2V0TGlzdFthc3NldEtleV07XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U2hvd1N0YXRlID0gKHN0YXRlKSA9PiB7XG4gIHJldHVybiBzdGF0ZS5zaG93O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2hvdy5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IHJlcXVlc3QgaW5mb1xuICBjb25zdCByZXF1ZXN0SWQgPSBzaG93LnJlcXVlc3QuaWQ7XG4gIC8vIHNlbGVjdCBhc3NldCBpbmZvXG4gIGxldCBhc3NldDtcbiAgY29uc3QgcmVxdWVzdCA9IHNob3cucmVxdWVzdExpc3RbcmVxdWVzdElkXSB8fCBudWxsO1xuICBjb25zdCBhc3NldExpc3QgPSBzaG93LmFzc2V0TGlzdDtcbiAgaWYgKHJlcXVlc3QgJiYgYXNzZXRMaXN0KSB7XG4gICAgY29uc3QgYXNzZXRLZXkgPSByZXF1ZXN0LmtleTsgIC8vIG5vdGU6IGp1c3Qgc3RvcmUgdGhpcyBpbiB0aGUgcmVxdWVzdFxuICAgIGFzc2V0ID0gYXNzZXRMaXN0W2Fzc2V0S2V5XSB8fCBudWxsO1xuICB9O1xuICAvLyByZXR1cm4gcHJvcHNcbiAgcmV0dXJuIHtcbiAgICBhc3NldCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dBc3NldERldGFpbHMvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IHNlbGVjdEFzc2V0IH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgY29uc3QgeyBjbGFpbURhdGE6IHsgdGl0bGUgfSB9ID0gc2VsZWN0QXNzZXQoc2hvdyk7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBzZWxlY3RBc3NldCB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCBhc3NldFxuICBjb25zdCBhc3NldCA9IHNlbGVjdEFzc2V0KHNob3cpO1xuICAvLyAgcmV0dXJuIHByb3BzXG4gIHJldHVybiB7XG4gICAgYXNzZXQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldEluZm8vaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2hvdyB9KSA9PiB7XG4gIC8vIHNlbGVjdCByZXF1ZXN0IGluZm9cbiAgY29uc3QgcmVxdWVzdElkID0gc2hvdy5yZXF1ZXN0LmlkO1xuICAvLyBzZWxlY3QgcmVxdWVzdFxuICBjb25zdCBwcmV2aW91c1JlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3JlcXVlc3RJZF0gfHwgbnVsbDtcbiAgLy8gc2VsZWN0IGNoYW5uZWxcbiAgbGV0IGNoYW5uZWw7XG4gIGlmIChwcmV2aW91c1JlcXVlc3QpIHtcbiAgICBjb25zdCBjaGFubmVsS2V5ID0gcHJldmlvdXNSZXF1ZXN0LmtleTtcbiAgICBjaGFubmVsID0gc2hvdy5jaGFubmVsTGlzdFtjaGFubmVsS2V5XSB8fCBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBudWxsKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1Nob3dDaGFubmVsL2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uVXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBzaG93IH0pID0+IHtcbiAgLy8gc2VsZWN0IGNoYW5uZWwga2V5XG4gIGNvbnN0IHJlcXVlc3QgPSBzaG93LnJlcXVlc3RMaXN0W3Nob3cucmVxdWVzdC5pZF07XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSByZXF1ZXN0LmtleTtcbiAgLy8gc2VsZWN0IGNoYW5uZWwgY2xhaW1zXG4gIGNvbnN0IGNoYW5uZWwgPSBzaG93LmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldIHx8IG51bGw7XG4gIC8vIHJldHVybiBwcm9wc1xuICByZXR1cm4ge1xuICAgIGNoYW5uZWxLZXksXG4gICAgY2hhbm5lbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgb25VcGRhdGVDaGFubmVsQ2xhaW1zLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoe3NpdGU6IHtkZWZhdWx0czogeyBkZWZhdWx0VGh1bWJuYWlsIH19fSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRlZmF1bHRUaHVtYm5haWwsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29tcG9uZW50cy9Bc3NldFByZXZpZXcvaW5kZXguanMiLCJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgc2l0ZTogeyBob3N0LCB0aXRsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob3N0LFxuICAgIHRpdGxlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIEV4cGFuZGluZ1RleHRhcmVhIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX2hhbmRsZUNoYW5nZSA9IHRoaXMuX2hhbmRsZUNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmFkanVzdFRleHRhcmVhKHt9KTtcbiAgfVxuICBfaGFuZGxlQ2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShldmVudCk7XG4gICAgdGhpcy5hZGp1c3RUZXh0YXJlYShldmVudCk7XG4gIH1cbiAgYWRqdXN0VGV4dGFyZWEgKHsgdGFyZ2V0ID0gdGhpcy5lbCB9KSB7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IDA7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5zY3JvbGxIZWlnaHR9cHhgO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyAuLi5yZXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgey4uLnJlc3R9XG4gICAgICAgIHJlZj17eCA9PiB0aGlzLmVsID0geH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUNoYW5nZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuXG5FeHBhbmRpbmdUZXh0YXJlYS5wcm9wVHlwZXMgPSB7XG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGluZ1RleHRhcmVhO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvRXhwYW5kaW5nVGV4dEFyZWEvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIFB1Ymxpc2hQcmV2aWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbWdTb3VyY2UgICAgICAgOiAnJyxcbiAgICAgIGRlZmF1bHRUaHVtYm5haWw6ICcvYXNzZXRzL2ltZy92aWRlb190aHVtYl9kZWZhdWx0LnBuZycsXG4gICAgfTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2UodGhpcy5wcm9wcy5maWxlKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIGlmIChuZXdQcm9wcy5maWxlICE9PSB0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgIHRoaXMuc2V0UHJldmlld0ltYWdlU291cmNlKG5ld1Byb3BzLmZpbGUpO1xuICAgIH1cbiAgICBpZiAobmV3UHJvcHMudGh1bWJuYWlsICE9PSB0aGlzLnByb3BzLnRodW1ibmFpbCkge1xuICAgICAgaWYgKG5ld1Byb3BzLnRodW1ibmFpbCkge1xuICAgICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKG5ld1Byb3BzLnRodW1ibmFpbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHRoaXMuc3RhdGUuZGVmYXVsdFRodW1ibmFpbH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSAoZmlsZSkge1xuICAgIGNvbnN0IHByZXZpZXdSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHByZXZpZXdSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICBwcmV2aWV3UmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2ltZ1NvdXJjZTogcHJldmlld1JlYWRlci5yZXN1bHR9KTtcbiAgICB9O1xuICB9XG4gIHNldFByZXZpZXdJbWFnZVNvdXJjZSAoZmlsZSkge1xuICAgIGlmIChmaWxlLnR5cGUgIT09ICd2aWRlby9tcDQnKSB7XG4gICAgICB0aGlzLnNldFByZXZpZXdJbWFnZVNvdXJjZUZyb21GaWxlKGZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy50aHVtYm5haWwpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aWV3SW1hZ2VTb3VyY2VGcm9tRmlsZSh0aGlzLnByb3BzLnRodW1ibmFpbCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHtpbWdTb3VyY2U6IHRoaXMuc3RhdGUuZGVmYXVsdFRodW1ibmFpbH0pO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8aW1nXG4gICAgICAgIGlkPSdkcm9wem9uZS1wcmV2aWV3J1xuICAgICAgICBzcmM9e3RoaXMuc3RhdGUuaW1nU291cmNlfVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuZGltUHJldmlldyA/ICdkaW0nIDogJyd9XG4gICAgICAgIGFsdD0ncHVibGlzaCBwcmV2aWV3J1xuICAgICAgLz5cbiAgICApO1xuICB9XG59O1xuXG5QdWJsaXNoUHJldmlldy5wcm9wVHlwZXMgPSB7XG4gIGRpbVByZXZpZXc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZpbGUgICAgICA6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgdGh1bWJuYWlsIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hQcmV2aWV3O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFByZXZpZXcvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmZ1bmN0aW9uIFVybE1pZGRsZSAoe3B1Ymxpc2hJbkNoYW5uZWwsIHNlbGVjdGVkQ2hhbm5lbCwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0pIHtcbiAgaWYgKHB1Ymxpc2hJbkNoYW5uZWwpIHtcbiAgICBpZiAoc2VsZWN0ZWRDaGFubmVsID09PSBsb2dnZWRJbkNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gPHNwYW4gaWQ9J3VybC1jaGFubmVsJyBjbGFzc05hbWU9J3VybC10ZXh0LS1zZWNvbmRhcnknPntsb2dnZWRJbkNoYW5uZWxOYW1lfTp7bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH0gLzwvc3Bhbj47XG4gICAgfVxuICAgIHJldHVybiA8c3BhbiBpZD0ndXJsLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz5AY2hhbm5lbDxzcGFuXG4gICAgICBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+U2VsZWN0IGEgY2hhbm5lbCBiZWxvdzwvc3Bhbj4gLzwvc3Bhbj47XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8c3BhbiBpZD0ndXJsLW5vLWNoYW5uZWwtcGxhY2Vob2xkZXInIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSB0b29sdGlwJz54eXo8c3BhbiBjbGFzc05hbWU9J3Rvb2x0aXAtdGV4dCc+VGhpcyB3aWxsIGJlIGEgcmFuZG9tIGlkPC9zcGFuPiAvPC9zcGFuPlxuICApO1xufVxuXG5VcmxNaWRkbGUucHJvcFR5cGVzID0ge1xuICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBsb2dnZWRJbkNoYW5uZWxOYW1lICAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBsb2dnZWRJbkNoYW5uZWxTaG9ydElkOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVXJsTWlkZGxlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXguanN4IiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3NldFB1Ymxpc2hJbkNoYW5uZWwsIHVwZGF0ZVNlbGVjdGVkQ2hhbm5lbCwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBjaGFubmVsLCBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBsb2dnZWRJbkNoYW5uZWxOYW1lOiBjaGFubmVsLmxvZ2dlZEluQ2hhbm5lbC5uYW1lLFxuICAgIHB1Ymxpc2hJbkNoYW5uZWwgICA6IHB1Ymxpc2gucHVibGlzaEluQ2hhbm5lbCxcbiAgICBzZWxlY3RlZENoYW5uZWwgICAgOiBwdWJsaXNoLnNlbGVjdGVkQ2hhbm5lbCxcbiAgICBjaGFubmVsRXJyb3IgICAgICAgOiBwdWJsaXNoLmVycm9yLmNoYW5uZWwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2goc2V0UHVibGlzaEluQ2hhbm5lbCh2YWx1ZSkpO1xuICAgIH0sXG4gICAgb25DaGFubmVsU2VsZWN0OiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUVycm9yKCdjaGFubmVsJywgbnVsbCkpO1xuICAgICAgZGlzcGF0Y2godXBkYXRlU2VsZWN0ZWRDaGFubmVsKHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbFNlbGVjdC9pbmRleC5qcyIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGUsIHN0YXJ0UHVibGlzaH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGU6IHB1Ymxpc2guZmlsZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxuICBzdGFydFB1Ymxpc2gsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hEZXRhaWxzL2luZGV4LmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhfSBmcm9tICdhY3Rpb25zL3B1Ymxpc2gnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcHVibGlzaCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IHB1Ymxpc2gubWV0YWRhdGEudGl0bGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgb25NZXRhZGF0YUNoYW5nZTogKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVNZXRhZGF0YShuYW1lLCB2YWx1ZSkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShWaWV3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L2luZGV4LmpzIiwiaW1wb3J0IHt1cGRhdGVDbGFpbSwgdXBkYXRlRXJyb3J9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IGNoYW5uZWwsIHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGxvZ2dlZEluQ2hhbm5lbE5hbWUgICA6IGNoYW5uZWwubG9nZ2VkSW5DaGFubmVsLm5hbWUsXG4gICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZDogY2hhbm5lbC5sb2dnZWRJbkNoYW5uZWwuc2hvcnRJZCxcbiAgICBmaWxlTmFtZSAgICAgICAgICAgICAgOiBwdWJsaXNoLmZpbGUubmFtZSxcbiAgICBwdWJsaXNoSW5DaGFubmVsICAgICAgOiBwdWJsaXNoLnB1Ymxpc2hJbkNoYW5uZWwsXG4gICAgc2VsZWN0ZWRDaGFubmVsICAgICAgIDogcHVibGlzaC5zZWxlY3RlZENoYW5uZWwsXG4gICAgY2xhaW0gICAgICAgICAgICAgICAgIDogcHVibGlzaC5jbGFpbSxcbiAgICB1cmxFcnJvciAgICAgICAgICAgICAgOiBwdWJsaXNoLmVycm9yLnVybCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkNsYWltQ2hhbmdlOiAodmFsdWUpID0+IHtcbiAgICAgIGRpc3BhdGNoKHVwZGF0ZUNsYWltKHZhbHVlKSk7XG4gICAgICBkaXNwYXRjaCh1cGRhdGVFcnJvcigncHVibGlzaFN1Ym1pdCcsIG51bGwpKTtcbiAgICB9LFxuICAgIG9uVXJsRXJyb3I6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlRXJyb3IoJ3VybCcsIHZhbHVlKSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFVybElucHV0L2luZGV4LmpzIiwiaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG9uTmV3VGh1bWJuYWlsIH0gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2g6IHsgZmlsZSB9IH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlLFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0ge1xuICBvbk5ld1RodW1ibmFpbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L2luZGV4LmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge3VwZGF0ZU1ldGFkYXRhLCB0b2dnbGVNZXRhZGF0YUlucHV0c30gZnJvbSAnYWN0aW9ucy9wdWJsaXNoJztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHNob3dNZXRhZGF0YUlucHV0czogcHVibGlzaC5zaG93TWV0YWRhdGFJbnB1dHMsXG4gICAgZGVzY3JpcHRpb24gICAgICAgOiBwdWJsaXNoLm1ldGFkYXRhLmRlc2NyaXB0aW9uLFxuICAgIGxpY2Vuc2UgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5saWNlbnNlLFxuICAgIG5zZncgICAgICAgICAgICAgIDogcHVibGlzaC5tZXRhZGF0YS5uc2Z3LFxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4ge1xuICAgIG9uTWV0YWRhdGFDaGFuZ2U6IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godXBkYXRlTWV0YWRhdGEobmFtZSwgdmFsdWUpKTtcbiAgICB9LFxuICAgIG9uVG9nZ2xlTWV0YWRhdGFJbnB1dHM6ICh2YWx1ZSkgPT4ge1xuICAgICAgZGlzcGF0Y2godG9nZ2xlTWV0YWRhdGFJbnB1dHModmFsdWUpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanMiLCJpbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHB1Ymxpc2ggfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIG1lc3NhZ2U6IHB1Ymxpc2guZGlzYWJsZWRNZXNzYWdlLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG51bGwpKFZpZXcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS9pbmRleC5qcyIsImltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtjbGVhckZpbGV9IGZyb20gJ2FjdGlvbnMvcHVibGlzaCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0dXMgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gICAgbWVzc2FnZTogcHVibGlzaC5zdGF0dXMubWVzc2FnZSxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHtcbiAgY2xlYXJGaWxlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoU3RhdHVzL2luZGV4LmpzIiwiaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBwdWJsaXNoIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICBkaXNhYmxlZDogcHVibGlzaC5kaXNhYmxlZCxcbiAgICBmaWxlICAgIDogcHVibGlzaC5maWxlLFxuICAgIHN0YXR1cyAgOiBwdWJsaXNoLnN0YXR1cy5zdGF0dXMsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbnVsbCkoVmlldyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHsgZ2V0U3ViRGlyZWN0b3J5TmFtZXMgfSA9IHJlcXVpcmUoJ2J1aWxkL2dldEZvbGRlck5hbWVzLmpzJyk7XG5cbmNvbnN0IHRoaXNGb2xkZXIgPSBQYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnY2xpZW50L2NvbXBvbmVudHMvJyk7XG5sZXQgbW9kdWxlcyA9IHt9O1xuXG5nZXRTdWJEaXJlY3RvcnlOYW1lcyh0aGlzRm9sZGVyKVxuICAuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgIG1vZHVsZXNbbmFtZV0gPSByZXF1aXJlKGAuLyR7bmFtZX1gKS5kZWZhdWx0O1xuICB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbXBvbmVudHMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgeyBnZXRTdWJEaXJlY3RvcnlOYW1lcyB9ID0gcmVxdWlyZSgnYnVpbGQvZ2V0Rm9sZGVyTmFtZXMuanMnKTtcbmNvbnN0IHRoaXNGb2xkZXIgPSBQYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnY2xpZW50L2NvbnRhaW5lcnMvJyk7XG5cbmxldCBtb2R1bGVzID0ge307XG5cbmdldFN1YkRpcmVjdG9yeU5hbWVzKHRoaXNGb2xkZXIpXG4gIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgbW9kdWxlc1tuYW1lXSA9IHJlcXVpcmUoYC4vJHtuYW1lfWApLmRlZmF1bHQ7XG4gIH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9pbmRleC5qcyIsImNvbnN0IFBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB7IGdldFN1YkRpcmVjdG9yeU5hbWVzIH0gPSByZXF1aXJlKCdidWlsZC9nZXRGb2xkZXJOYW1lcy5qcycpO1xuY29uc3QgdGhpc0ZvbGRlciA9IFBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdjbGllbnQvcGFnZXMvJyk7XG5cbmxldCBtb2R1bGVzID0ge307XG5cbmdldFN1YkRpcmVjdG9yeU5hbWVzKHRoaXNGb2xkZXIpXG4gIC5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgbW9kdWxlc1tuYW1lXSA9IHJlcXVpcmUoYC4vJHtuYW1lfWApLmRlZmF1bHQ7XG4gIH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZXM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBQdWJsaXNoVG9vbCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hUb29sJztcblxuY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J3JvdyByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbid9PlxuICAgICAgICA8U0VPIC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eydyb3cgcm93LS10YWxsIHJvdy0tcGFkZGVkIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nfT5cbiAgICAgICAgICA8UHVibGlzaFRvb2wgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9wYWdlcy9Ib21lUGFnZS9pbmRleC5qc3giLCJjb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IGFwaTogeyBhcGlIb3N0LCBhcGlQb3J0IH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9sYnJ5Q29uZmlnLmpzJyk7XG5jb25zdCBsYnJ5QXBpVXJpID0gJ2h0dHA6Ly8nICsgYXBpSG9zdCArICc6JyArIGFwaVBvcnQ7XG5jb25zdCB7IGNob29zZUdhTGJyeW5ldFB1Ymxpc2hMYWJlbCwgc2VuZEdBVGltaW5nRXZlbnQgfSA9IHJlcXVpcmUoJy4vZ29vZ2xlQW5hbHl0aWNzLmpzJyk7XG5cbmNvbnN0IGhhbmRsZUxicnluZXRSZXNwb25zZSA9ICh7IGRhdGEgfSwgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGxvZ2dlci5kZWJ1ZygnbGJyeSBhcGkgZGF0YTonLCBkYXRhKTtcbiAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgLy8gY2hlY2sgZm9yIGFuIGVycm9yXG4gICAgaWYgKGRhdGEucmVzdWx0LmVycm9yKSB7XG4gICAgICBsb2dnZXIuZGVidWcoJ0xicnluZXQgYXBpIGVycm9yOicsIGRhdGEucmVzdWx0LmVycm9yKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoZGF0YS5yZXN1bHQuZXJyb3IpKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBmYWxsYmFjayBpbiBjYXNlIGl0IGp1c3QgdGltZWQgb3V0XG4gIHJlamVjdChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaENsYWltIChwdWJsaXNoUGFyYW1zKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFB1Ymxpc2hpbmcgY2xhaW0gdG8gXCIke3B1Ymxpc2hQYXJhbXMubmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ3B1Ymxpc2gnLFxuICAgICAgICAgIHBhcmFtczogcHVibGlzaFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3B1Ymxpc2gnLCBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwocHVibGlzaFBhcmFtcyksIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltICh1cmkpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gR2V0dGluZyBDbGFpbSBmb3IgXCIke3VyaX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgcGFyYW1zOiB7IHVyaSwgdGltZW91dDogMjAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltJywgJ0dFVCcsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBoYW5kbGVMYnJ5bmV0UmVzcG9uc2UocmVzcG9uc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENsYWltTGlzdCAoY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IEdldHRpbmcgY2xhaW1fbGlzdCBmb3IgXCIke2NsYWltTmFtZX1cImApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NsYWltX2xpc3QnLFxuICAgICAgICAgIHBhcmFtczogeyBuYW1lOiBjbGFpbU5hbWUgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ2dldENsYWltTGlzdCcsICdDTEFJTV9MSVNUJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgcmVzb2x2ZVVyaSAodXJpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBsYnJ5QXBpID4+IFJlc29sdmluZyBVUkkgZm9yIFwiJHt1cml9XCJgKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdyZXNvbHZlJyxcbiAgICAgICAgICBwYXJhbXM6IHsgdXJpIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xuICAgICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdsYnJ5bmV0JywgJ3Jlc29sdmVVcmknLCAnUkVTT0xWRScsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgICAgICBpZiAoZGF0YS5yZXN1bHRbdXJpXS5lcnJvcikgeyAgLy8gY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEucmVzdWx0W3VyaV0uZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7ICAvLyBpZiBubyBlcnJvcnMsIHJlc29sdmVcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHRbdXJpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXREb3dubG9hZERpcmVjdG9yeSAoKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdsYnJ5QXBpID4+IFJldHJpZXZpbmcgdGhlIGRvd25sb2FkIGRpcmVjdG9yeSBwYXRoIGZyb20gbGJyeSBkYWVtb24uLi4nKTtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5wb3N0KGxicnlBcGlVcmksIHtcbiAgICAgICAgICBtZXRob2Q6ICdzZXR0aW5nc19nZXQnLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdnZXREb3dubG9hZERpcmVjdG9yeScsICdTRVRUSU5HU19HRVQnLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICAgICAgaWYgKGRhdGEucmVzdWx0KSB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0LmRvd25sb2FkX2RpcmVjdG9yeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1N1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgdG8gbGJyeSBkYWVtb24sIGJ1dCB1bmFibGUgdG8gcmV0cmlldmUgdGhlIGRvd25sb2FkIGRpcmVjdG9yeS4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdMYnJ5bmV0IEVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXNvbHZlKCcvaG9tZS9sYnJ5L0Rvd25sb2Fkcy8nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZUNoYW5uZWwgKG5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGxicnlBcGkgPj4gQ3JlYXRpbmcgY2hhbm5lbCBmb3IgJHtuYW1lfS4uLmApO1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXhpb3NcbiAgICAgICAgLnBvc3QobGJyeUFwaVVyaSwge1xuICAgICAgICAgIG1ldGhvZDogJ2NoYW5uZWxfbmV3JyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGNoYW5uZWxfbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGFtb3VudCAgICAgIDogMC4xLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnbGJyeW5ldCcsICdjcmVhdGVDaGFubmVsJywgJ0NIQU5ORUxfTkVXJywgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgICAgIGhhbmRsZUxicnluZXRSZXNwb25zZShyZXNwb25zZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9sYnJ5QXBpLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgdWEgPSByZXF1aXJlKCd1bml2ZXJzYWwtYW5hbHl0aWNzJyk7XG5jb25zdCB7IGFuYWx5dGljcyA6IHsgZ29vZ2xlSWQgfSwgZGV0YWlsczogeyB0aXRsZSB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGVTZXJ2ZUV2ZW50UGFyYW1zIChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpIHtcbiAgcmV0dXJuIHtcbiAgICBldmVudENhdGVnb3J5ICAgIDogJ2NsaWVudCByZXF1ZXN0cycsXG4gICAgZXZlbnRBY3Rpb24gICAgICA6ICdzZXJ2ZSByZXF1ZXN0JyxcbiAgICBldmVudExhYmVsICAgICAgIDogb3JpZ2luYWxVcmwsXG4gICAgaXBPdmVycmlkZSAgICAgICA6IGlwLFxuICAgIHVzZXJBZ2VudE92ZXJyaWRlOiBoZWFkZXJzWyd1c2VyLWFnZW50J10sXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMgKGNhdGVnb3J5LCB2YXJpYWJsZSwgbGFiZWwsIHN0YXJ0VGltZSwgZW5kVGltZSkge1xuICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiB7XG4gICAgdXNlclRpbWluZ0NhdGVnb3J5ICAgIDogY2F0ZWdvcnksXG4gICAgdXNlclRpbWluZ1ZhcmlhYmxlTmFtZTogdmFyaWFibGUsXG4gICAgdXNlclRpbWluZ1RpbWUgICAgICAgIDogZHVyYXRpb24sXG4gICAgdXNlclRpbWluZ0xhYmVsICAgICAgIDogbGFiZWwsXG4gIH07XG59O1xuXG5mdW5jdGlvbiBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQgKGlwLCBwYXJhbXMpIHtcbiAgY29uc3QgdmlzaXRvcklkID0gaXAucmVwbGFjZSgvXFwuL2csICctJyk7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLmV2ZW50KHBhcmFtcywgKGVycikgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGxvZ2dlci5lcnJvcignR29vZ2xlIEFuYWx5dGljcyBFdmVudCBFcnJvciA+PicsIGVycik7XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNlbmRHb29nbGVBbmFseXRpY3NUaW1pbmcgKHZpc2l0b3JJZCwgcGFyYW1zKSB7XG4gIGNvbnN0IHZpc2l0b3IgPSB1YShnb29nbGVJZCwgdmlzaXRvcklkLCB7IHN0cmljdENpZEZvcm1hdDogZmFsc2UsIGh0dHBzOiB0cnVlIH0pO1xuICB2aXNpdG9yLnRpbWluZyhwYXJhbXMsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ0dvb2dsZSBBbmFseXRpY3MgRXZlbnQgRXJyb3IgPj4nLCBlcnIpO1xuICAgIH1cbiAgICBsb2dnZXIuZGVidWcoYFRpbWluZyBldmVudCBzdWNjZXNzZnVsbHkgc2VudCB0byBnb29nbGUgYW5hbHl0aWNzYCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlbmRHQVNlcnZlRXZlbnQgKGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IGNyZWF0ZVNlcnZlRXZlbnRQYXJhbXMoaGVhZGVycywgaXAsIG9yaWdpbmFsVXJsKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzRXZlbnQoaXAsIHBhcmFtcyk7XG4gIH0sXG4gIHNlbmRHQVRpbWluZ0V2ZW50IChjYXRlZ29yeSwgdmFyaWFibGUsIGxhYmVsLCBzdGFydFRpbWUsIGVuZFRpbWUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBjcmVhdGVQdWJsaXNoVGltaW5nRXZlbnRQYXJhbXMoY2F0ZWdvcnksIHZhcmlhYmxlLCBsYWJlbCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICBzZW5kR29vZ2xlQW5hbHl0aWNzVGltaW5nKHRpdGxlLCBwYXJhbXMpO1xuICB9LFxuICBjaG9vc2VHYUxicnluZXRQdWJsaXNoTGFiZWwgKHsgY2hhbm5lbF9uYW1lOiBjaGFubmVsTmFtZSwgY2hhbm5lbF9pZDogY2hhbm5lbElkIH0pIHtcbiAgICByZXR1cm4gKGNoYW5uZWxOYW1lIHx8IGNoYW5uZWxJZCA/ICdQVUJMSVNIX0lOX0NIQU5ORUxfQ0xBSU0nIDogJ1BVQkxJU0hfQU5PTllNT1VTX0NMQUlNJyk7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvZ29vZ2xlQW5hbHl0aWNzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IGN1c3RvbUNvbXBvbmVudHMgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5cbmZ1bmN0aW9uIGdldERlZXBlc3RDaGlsZFZhbHVlIChwYXJlbnQsIGNoaWxkcmVuS2V5cykge1xuICBsZXQgY2hpbGRLZXkgPSBjaGlsZHJlbktleXMuc2hpZnQoKTsgLy8gLnNoaWZ0KCkgcmV0cmlldmVzIHRoZSBmaXJzdCBlbGVtZW50IG9mIGFycmF5IGFuZCByZW1vdmVzIGl0IGZyb20gYXJyYXlcbiAgbGV0IGNoaWxkID0gcGFyZW50W2NoaWxkS2V5XTtcbiAgaWYgKGNoaWxkcmVuS2V5cy5sZW5ndGggPj0gMSkge1xuICAgIHJldHVybiBnZXREZWVwZXN0Q2hpbGRWYWx1ZShjaGlsZCwgY2hpbGRyZW5LZXlzKTtcbiAgfVxuICByZXR1cm4gY2hpbGQ7XG59XG5cbmV4cG9ydCBjb25zdCBkeW5hbWljSW1wb3J0ID0gKGZpbGVQYXRoKSA9PiB7XG4gIC8vIHZhbGlkYXRlIGlucHV0c1xuICBpZiAoIWZpbGVQYXRoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHBhdGggcHJvdmlkZWQgdG8gZHluYW1pY0ltcG9ydCgpJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBmaWxlUGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICBjb25zb2xlLmxvZygnZHluYW1pY0ltcG9ydCA+IGZpbGVQYXRoOicsIGZpbGVQYXRoKTtcbiAgICBjb25zb2xlLmxvZygnZHluYW1pY0ltcG9ydCA+IGZpbGVQYXRoIHR5cGU6JywgdHlwZW9mIGZpbGVQYXRoKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZpbGUgcGF0aCBwcm92aWRlZCB0byBkeW5hbWljSW1wb3J0KCkgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG4gIGlmICghY3VzdG9tQ29tcG9uZW50cykge1xuICAgIHJldHVybiByZXF1aXJlKGAke2ZpbGVQYXRofWApO1xuICB9XG4gIC8vIHNwbGl0IG91dCB0aGUgZmlsZSBmb2xkZXJzICAvLyBmaWx0ZXIgb3V0IGFueSBlbXB0eSBvciB3aGl0ZS1zcGFjZS1vbmx5IHN0cmluZ3NcbiAgY29uc3QgZm9sZGVycyA9IGZpbGVQYXRoLnNwbGl0KCcvJykuZmlsdGVyKGZvbGRlck5hbWUgPT4gZm9sZGVyTmFtZS5yZXBsYWNlKC9cXHMvZywgJycpLmxlbmd0aCk7XG4gIC8vIGNoZWNrIGZvciB0aGUgY29tcG9uZW50IGNvcnJlc3BvbmRpbmcgdG8gZmlsZSBwYXRoIGluIHRoZSBzaXRlIGNvbmZpZyBvYmplY3RcbiAgLy8gaS5lLiBjdXN0b21Db21wb25lbnRzW2ZvbGRlcnNbMF1dW2ZvbGRlcnNbMl1bLi4uXVtmb2xkZXJzW25dXVxuICBjb25zdCBjb21wb25lbnQgPSBnZXREZWVwZXN0Q2hpbGRWYWx1ZShjdXN0b21Db21wb25lbnRzLCBmb2xkZXJzKTtcbiAgaWYgKGNvbXBvbmVudCkge1xuICAgIHJldHVybiBjb21wb25lbnQ7ICAvLyByZXR1cm4gY3VzdG9tIGNvbXBvbmVudFxuICB9IGVsc2Uge1xuICAgIHJldHVybiByZXF1aXJlKGAke2ZpbGVQYXRofWApO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2R5bmFtaWNJbXBvcnQuanMiLCJjb25zdCBjcmVhdGVCYXNpY0Nhbm9uaWNhbExpbmsgPSAocGFnZSwgc2l0ZUhvc3QpID0+IHtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke3BhZ2V9YDtcbn07XG5cbmNvbnN0IGNyZWF0ZUFzc2V0Q2Fub25pY2FsTGluayA9IChhc3NldCwgc2l0ZUhvc3QpID0+IHtcbiAgbGV0IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBuYW1lLCBjbGFpbUlkO1xuICBpZiAoYXNzZXQuY2xhaW1EYXRhKSB7XG4gICAgKHsgY2hhbm5lbE5hbWUsIGNlcnRpZmljYXRlSWQsIG5hbWUsIGNsYWltSWQgfSA9IGFzc2V0LmNsYWltRGF0YSk7XG4gIH07XG4gIGlmIChjaGFubmVsTmFtZSkge1xuICAgIHJldHVybiBgJHtzaXRlSG9zdH0vJHtjaGFubmVsTmFtZX06JHtjZXJ0aWZpY2F0ZUlkfS8ke25hbWV9YDtcbiAgfTtcbiAgcmV0dXJuIGAke3NpdGVIb3N0fS8ke2NsYWltSWR9LyR7bmFtZX1gO1xufTtcblxuY29uc3QgY3JlYXRlQ2hhbm5lbENhbm9uaWNhbExpbmsgPSAoY2hhbm5lbCwgc2l0ZUhvc3QpID0+IHtcbiAgY29uc3QgeyBuYW1lLCBsb25nSWQgfSA9IGNoYW5uZWw7XG4gIHJldHVybiBgJHtzaXRlSG9zdH0vJHtuYW1lfToke2xvbmdJZH1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbm9uaWNhbExpbmsgPSAoYXNzZXQsIGNoYW5uZWwsIHBhZ2UsIHNpdGVIb3N0KSA9PiB7XG4gIGlmIChhc3NldCkge1xuICAgIHJldHVybiBjcmVhdGVBc3NldENhbm9uaWNhbExpbmsoYXNzZXQsIHNpdGVIb3N0KTtcbiAgfVxuICBpZiAoY2hhbm5lbCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFubmVsQ2Fub25pY2FsTGluayhjaGFubmVsLCBzaXRlSG9zdCk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJhc2ljQ2Fub25pY2FsTGluayhwYWdlLCBzaXRlSG9zdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2Nhbm9uaWNhbExpbmsuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmFsaWRhdGVGaWxlIChmaWxlKSB7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgcHJvdmlkZWQnKTtcbiAgICB9XG4gICAgaWYgKC8nLy50ZXN0KGZpbGUubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXBvc3Ryb3BoZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgc2l6ZSBhbmQgdHlwZVxuICAgIHN3aXRjaCAoZmlsZS50eXBlKSB7XG4gICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gMTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCBpbWFnZXMgYXJlIGxpbWl0ZWQgdG8gMTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgR0lGcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnJ5LCB2aWRlb3MgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZpbGUudHlwZSArICcgaXMgbm90IGEgc3VwcG9ydGVkIGZpbGUgdHlwZS4gT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvdXRpbHMvZmlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBSRUdFWFBfSU5WQUxJRF9DTEFJTSAgOiAvW15BLVphLXowLTktXS9nLFxuICBSRUdFWFBfSU5WQUxJRF9DSEFOTkVMOiAvW15BLVphLXowLTktQF0vZyxcbiAgUkVHRVhQX0FERFJFU1MgICAgICAgIDogL15iKD89W14wT0lsXXszMiwzM30pWzAtOUEtWmEtel17MzIsMzN9JC8sXG4gIENIQU5ORUxfQ0hBUiAgICAgICAgICA6ICdAJyxcbiAgcGFyc2VJZGVudGlmaWVyICAgICAgIDogZnVuY3Rpb24gKGlkZW50aWZpZXIpIHtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy9dKiknICsgLy8gdmFsdWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICAgJyhbOiQjXT8pKFteL10qKScgLy8gbW9kaWZpZXIgc2VwYXJhdG9yLCBtb2RpZmllciAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgdmFsdWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXggIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAgIC5leGVjKGlkZW50aWZpZXIpXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrIHlvdXIgVVJMLiAgTm8gY2hhbm5lbCBuYW1lIGFmdGVyIFwiQFwiLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjaGFubmVsIG5hbWU6IFwiJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX1cIi5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgTm8gbW9kaWZpZXIgcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgICAgfVxuXG4gICAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IgPT09ICc6Jykge1xuICAgICAgICBjaGFubmVsQ2xhaW1JZCA9IG1vZGlmaWVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIFRoZSBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCIgbW9kaWZpZXIgaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ2hhbm5lbCxcbiAgICAgIGNoYW5uZWxOYW1lLFxuICAgICAgY2hhbm5lbENsYWltSWQ6IGNoYW5uZWxDbGFpbUlkIHx8IG51bGwsXG4gICAgICBjbGFpbUlkICAgICAgIDogY2xhaW1JZCB8fCBudWxsLFxuICAgIH07XG4gIH0sXG4gIHBhcnNlQ2xhaW06IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uc3QgY29tcG9uZW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICcoW146JCMvLl0qKScgKyAvLyBuYW1lIChzdG9wcyBhdCB0aGUgZmlyc3QgZXh0ZW5zaW9uKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIGV4dGVuc2lvbiBzZXBhcmF0b3IsIGV4dGVuc2lvbiAoc3RvcHMgYXQgdGhlIGZpcnN0IHBhdGggc2VwYXJhdG9yIG9yIGVuZClcbiAgICApO1xuICAgIGNvbnN0IFtwcm90bywgY2xhaW1OYW1lLCBleHRlbnNpb25TZXBlcmF0b3IsIGV4dGVuc2lvbl0gPSBjb21wb25lbnRzUmVnZXggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgLmV4ZWMobmFtZSlcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2sgeW91ciBVUkwuICBObyBjbGFpbSBuYW1lIHByb3ZpZGVkIGJlZm9yZSBcIi5cIicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGVjayB5b3VyIFVSTC4gIEludmFsaWQgY2hhcmFjdGVycyBpbiBjbGFpbSBuYW1lOiBcIiR7bmFtZUJhZENoYXJzLmpvaW4oJywgJyl9XCIuYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIGV4dGVuc2lvblxuICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IpIHtcbiAgICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciBVUkwuICBObyBmaWxlIGV4dGVuc2lvbiBwcm92aWRlZCBhZnRlciBzZXBhcmF0b3IgXCIke2V4dGVuc2lvblNlcGVyYXRvcn1cIi5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHRlbnNpb25TZXBlcmF0b3IgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoZWNrIHlvdXIgVVJMLiAgVGhlIFwiJHtleHRlbnNpb25TZXBlcmF0b3J9XCIgc2VwYXJhdG9yIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGNsYWltIG5hbWUuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgICBleHRlbnNpb246IGV4dGVuc2lvbiB8fCBudWxsLFxuICAgIH07XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL2xicnlVcmkuanMiLCJjb25zdCBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlID0gKHRodW1ibmFpbCkgPT4ge1xuICBpZiAodGh1bWJuYWlsKSB7XG4gICAgY29uc3QgZmlsZUV4dCA9IHRodW1ibmFpbC5zdWJzdHJpbmcodGh1bWJuYWlsLmxhc3RJbmRleE9mKCcuJykpO1xuICAgIHN3aXRjaCAoZmlsZUV4dCkge1xuICAgICAgY2FzZSAnanBlZyc6XG4gICAgICBjYXNlICdqcGcnOlxuICAgICAgICByZXR1cm4gJ2ltYWdlL2pwZWcnO1xuICAgICAgY2FzZSAncG5nJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9wbmcnO1xuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9naWYnO1xuICAgICAgY2FzZSAnbXA0JzpcbiAgICAgICAgcmV0dXJuICd2aWRlby9tcDQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdpbWFnZS9qcGVnJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3QgY3JlYXRlQmFzaWNNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZURlc2NyaXB0aW9uLCBzaXRlVGl0bGUsIHNpdGVUd2l0dGVyKSA9PiB7XG4gIHJldHVybiBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHNpdGVIb3N0fSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogc2l0ZURlc2NyaXB0aW9ufSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOnNpdGUnLCBjb250ZW50OiBzaXRlVHdpdHRlcn0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnknfSxcbiAgXTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNoYW5uZWxNZXRhVGFncyA9IChzaXRlVGl0bGUsIHNpdGVIb3N0LCBzaXRlVHdpdHRlciwgY2hhbm5lbCkgPT4ge1xuICBjb25zdCB7IG5hbWUsIGxvbmdJZCB9ID0gY2hhbm5lbDtcbiAgcmV0dXJuIFtcbiAgICB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IGAke25hbWV9IG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IGAke3NpdGVIb3N0fS8ke25hbWV9OiR7bG9uZ0lkfWB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6IHNpdGVUaXRsZX0sXG4gICAge3Byb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLCBjb250ZW50OiBgJHtuYW1lfSwgYSBjaGFubmVsIG9uICR7c2l0ZVRpdGxlfWB9LFxuICAgIHtwcm9wZXJ0eTogJ3R3aXR0ZXI6c2l0ZScsIGNvbnRlbnQ6IHNpdGVUd2l0dGVyfSxcbiAgICB7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeSd9LFxuICBdO1xufTtcblxuY29uc3QgY3JlYXRlQXNzZXRNZXRhVGFncyA9IChzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBjb25zdCB7IGNsYWltRGF0YSB9ID0gYXNzZXQ7XG4gIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGNsYWltRGF0YTtcbiAgY29uc3QgZW1iZWRVcmwgPSBgJHtzaXRlSG9zdH0vJHtjbGFpbURhdGEuY2xhaW1JZH0vJHtjbGFpbURhdGEubmFtZX1gO1xuICBjb25zdCBzaG93VXJsID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9YDtcbiAgY29uc3Qgc291cmNlID0gYCR7c2l0ZUhvc3R9LyR7Y2xhaW1EYXRhLmNsYWltSWR9LyR7Y2xhaW1EYXRhLm5hbWV9LiR7Y2xhaW1EYXRhLmZpbGVFeHR9YDtcbiAgY29uc3Qgb2dUaXRsZSA9IGNsYWltRGF0YS50aXRsZSB8fCBjbGFpbURhdGEubmFtZTtcbiAgY29uc3Qgb2dEZXNjcmlwdGlvbiA9IGNsYWltRGF0YS5kZXNjcmlwdGlvbiB8fCBkZWZhdWx0RGVzY3JpcHRpb247XG4gIGNvbnN0IG9nVGh1bWJuYWlsQ29udGVudFR5cGUgPSBkZXRlcm1pbmVPZ1RodW1ibmFpbENvbnRlbnRUeXBlKGNsYWltRGF0YS50aHVtYm5haWwpO1xuICBjb25zdCBvZ1RodW1ibmFpbCA9IGNsYWltRGF0YS50aHVtYm5haWwgfHwgZGVmYXVsdFRodW1ibmFpbDtcbiAgY29uc3QgbWV0YVRhZ3MgPSBbXG4gICAge3Byb3BlcnR5OiAnb2c6dGl0bGUnLCBjb250ZW50OiBvZ1RpdGxlfSxcbiAgICB7cHJvcGVydHk6ICdvZzp1cmwnLCBjb250ZW50OiBzaG93VXJsfSxcbiAgICB7cHJvcGVydHk6ICdvZzpzaXRlX25hbWUnLCBjb250ZW50OiBzaXRlVGl0bGV9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogb2dEZXNjcmlwdGlvbn0sXG4gICAge3Byb3BlcnR5OiAnb2c6aW1hZ2U6d2lkdGgnLCBjb250ZW50OiA2MDB9LFxuICAgIHtwcm9wZXJ0eTogJ29nOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6IDMxNX0sXG4gICAge3Byb3BlcnR5OiAndHdpdHRlcjpzaXRlJywgY29udGVudDogc2l0ZVR3aXR0ZXJ9LFxuICBdO1xuICBpZiAoY29udGVudFR5cGUgPT09ICd2aWRlby9tcDQnIHx8IGNvbnRlbnRUeXBlID09PSAndmlkZW8vd2VibScpIHtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOnZpZGVvJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzpzZWN1cmVfdXJsJywgY29udGVudDogc291cmNlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp2aWRlbzp0eXBlJywgY29udGVudDogY29udGVudFR5cGV9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogb2dUaHVtYm5haWx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiBvZ1RodW1ibmFpbENvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ3ZpZGVvJ30pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3BsYXllcid9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyJywgY29udGVudDogZW1iZWRVcmx9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOndpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnRleHQ6cGxheWVyX3dpZHRoJywgY29udGVudDogNjAwfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOnBsYXllcjpoZWlnaHQnLCBjb250ZW50OiAzMzd9KTtcbiAgICBtZXRhVGFncy5wdXNoKHtwcm9wZXJ0eTogJ3R3aXR0ZXI6cGxheWVyOnN0cmVhbScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAndHdpdHRlcjpwbGF5ZXI6c3RyZWFtOmNvbnRlbnRfdHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gIH0gZWxzZSB7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IHNvdXJjZX0pO1xuICAgIG1ldGFUYWdzLnB1c2goe3Byb3BlcnR5OiAnb2c6aW1hZ2U6dHlwZScsIGNvbnRlbnQ6IGNvbnRlbnRUeXBlfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICdvZzp0eXBlJywgY29udGVudDogJ2FydGljbGUnfSk7XG4gICAgbWV0YVRhZ3MucHVzaCh7cHJvcGVydHk6ICd0d2l0dGVyOmNhcmQnLCBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZSd9KTtcbiAgfVxuICByZXR1cm4gbWV0YVRhZ3M7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTWV0YVRhZ3MgPSAoc2l0ZURlc2NyaXB0aW9uLCBzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGNoYW5uZWwsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCkgPT4ge1xuICBpZiAoYXNzZXQpIHtcbiAgICByZXR1cm4gY3JlYXRlQXNzZXRNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgYXNzZXQsIGRlZmF1bHREZXNjcmlwdGlvbiwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIH07XG4gIGlmIChjaGFubmVsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYW5uZWxNZXRhVGFncyhzaXRlSG9zdCwgc2l0ZVRpdGxlLCBzaXRlVHdpdHRlciwgY2hhbm5lbCk7XG4gIH07XG4gIHJldHVybiBjcmVhdGVCYXNpY01ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9tZXRhVGFncy5qcyIsImV4cG9ydCBjb25zdCBjcmVhdGVQYWdlVGl0bGUgPSAoc2l0ZVRpdGxlLCBwYWdlVGl0bGUpID0+IHtcbiAgaWYgKCFwYWdlVGl0bGUpIHtcbiAgICByZXR1cm4gYCR7c2l0ZVRpdGxlfWA7XG4gIH1cbiAgcmV0dXJuIGAke3NpdGVUaXRsZX0gLSAke3BhZ2VUaXRsZX1gO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9wYWdlVGl0bGUuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9jaGFubmVsX2FjdGlvbl90eXBlcyc7XG5cbi8vIGV4cG9ydCBhY3Rpb24gY3JlYXRvcnNcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUxvZ2dlZEluQ2hhbm5lbCAobmFtZSwgc2hvcnRJZCwgbG9uZ0lkKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogYWN0aW9ucy5DSEFOTkVMX1VQREFURSxcbiAgICBkYXRhOiB7XG4gICAgICBuYW1lLFxuICAgICAgc2hvcnRJZCxcbiAgICAgIGxvbmdJZCxcbiAgICB9LFxuICB9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hY3Rpb25zL2NoYW5uZWwuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluaywgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IExvZ28gZnJvbSAnY29tcG9uZW50cy9Mb2dvJztcbmltcG9ydCBOYXZCYXJDaGFubmVsRHJvcGRvd24gZnJvbSAnY29tcG9uZW50cy9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jb25zdCBWSUVXID0gJ1ZJRVcnO1xuY29uc3QgTE9HT1VUID0gJ0xPR09VVCc7XG5cbmNsYXNzIE5hdkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoZWNrRm9yTG9nZ2VkSW5Vc2VyID0gdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nb3V0VXNlciA9IHRoaXMubG9nb3V0VXNlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uID0gdGhpcy5oYW5kbGVTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXG4gICAgdGhpcy5jaGVja0ZvckxvZ2dlZEluVXNlcigpO1xuICB9XG4gIGNoZWNrRm9yTG9nZ2VkSW5Vc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL3VzZXInLCBwYXJhbXMpXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dpbihkYXRhLmNoYW5uZWxOYW1lLCBkYXRhLnNob3J0Q2hhbm5lbElkLCBkYXRhLmNoYW5uZWxDbGFpbUlkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL3VzZXIgZXJyb3I6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxuICBsb2dvdXRVc2VyICgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB7Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ307XG4gICAgcmVxdWVzdCgnL2xvZ291dCcsIHBhcmFtcylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5uZWxMb2dvdXQoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnL2xvZ291dCBlcnJvcicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlIExPR09VVDpcbiAgICAgICAgdGhpcy5sb2dvdXRVc2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWSUVXOlxuICAgICAgICAvLyByZWRpcmVjdCB0byBjaGFubmVsIHBhZ2VcbiAgICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC8ke3RoaXMucHJvcHMuY2hhbm5lbE5hbWV9OiR7dGhpcy5wcm9wcy5jaGFubmVsTG9uZ0lkfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2l0ZURlc2NyaXB0aW9uIH0gPSAgdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgbmF2LWJhcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1zaG9ydCBmbGV4LWNvbnRhaW5lci0tcm93IGZsZXgtY29udGFpbmVyLS1zcGFjZS1iZXR3ZWVuLWNlbnRlcic+XG4gICAgICAgICAgPExvZ28gLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tY2VudGVyJz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbmF2LWJhci10YWdsaW5lJz57c2l0ZURlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2LWJhci0tcmlnaHQnPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvJyBleGFjdD5QdWJsaXNoPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyAgYWN0aXZlQ2xhc3NOYW1lPSdsaW5rLS1uYXYtYWN0aXZlJyB0bz0nL2Fib3V0Jz5BYm91dDwvTmF2TGluaz5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGFubmVsTmFtZSA/IChcbiAgICAgICAgICAgICAgPE5hdkJhckNoYW5uZWxEcm9wZG93blxuICAgICAgICAgICAgICAgIGNoYW5uZWxOYW1lPXt0aGlzLnByb3BzLmNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGlvbj17dGhpcy5wcm9wcy5jaGFubmVsTmFtZX1cbiAgICAgICAgICAgICAgICBWSUVXPXtWSUVXfVxuICAgICAgICAgICAgICAgIExPR09VVD17TE9HT1VUfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPE5hdkxpbmsgaWQ9J25hdi1iYXItbG9naW4tbGluaycgY2xhc3NOYW1lPSduYXYtYmFyLWxpbmsgbGluay0tbmF2JyBhY3RpdmVDbGFzc05hbWU9J2xpbmstLW5hdi1hY3RpdmUnIHRvPScvbG9naW4nPkNoYW5uZWw8L05hdkxpbms+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihOYXZCYXIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvTmF2QmFyL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVBhZ2VUaXRsZSB9IGZyb20gJ3V0aWxzL3BhZ2VUaXRsZSc7XG5pbXBvcnQgeyBjcmVhdGVNZXRhVGFncyB9IGZyb20gJ3V0aWxzL21ldGFUYWdzJztcbmltcG9ydCB7IGNyZWF0ZUNhbm9uaWNhbExpbmsgfSBmcm9tICd1dGlscy9jYW5vbmljYWxMaW5rJztcblxuY2xhc3MgU0VPIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICAvLyBwcm9wcyBmcm9tIHN0YXRlXG4gICAgY29uc3QgeyBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwsIHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gcHJvcHMgZnJvbSBwYXJlbnRcbiAgICBjb25zdCB7IGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCB7IHBhZ2VUaXRsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAvLyBjcmVhdGUgcGFnZSB0aXRsZSwgdGFncywgYW5kIGNhbm9uaWNhbCBsaW5rXG4gICAgcGFnZVRpdGxlID0gY3JlYXRlUGFnZVRpdGxlKHNpdGVUaXRsZSwgcGFnZVRpdGxlKTtcbiAgICBjb25zdCBtZXRhVGFncyA9IGNyZWF0ZU1ldGFUYWdzKHNpdGVEZXNjcmlwdGlvbiwgc2l0ZUhvc3QsIHNpdGVUaXRsZSwgc2l0ZVR3aXR0ZXIsIGFzc2V0LCBjaGFubmVsLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgIGNvbnN0IGNhbm9uaWNhbExpbmsgPSBjcmVhdGVDYW5vbmljYWxMaW5rKGFzc2V0LCBjaGFubmVsLCBwYWdlVXJpLCBzaXRlSG9zdCk7XG4gICAgLy8gcmVuZGVyIHJlc3VsdHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlbG1ldFxuICAgICAgICB0aXRsZT17cGFnZVRpdGxlfVxuICAgICAgICBtZXRhPXttZXRhVGFnc31cbiAgICAgICAgbGluaz17W3tyZWw6ICdjYW5vbmljYWwnLCBocmVmOiBjYW5vbmljYWxMaW5rfV19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn07XG5cblNFTy5wcm9wVHlwZXMgPSB7XG4gIHBhZ2VUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGFnZVVyaSAgOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjaGFubmVsICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIGFzc2V0ICAgIDogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNFTztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL1NFTy92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgU0VPIGZyb20gJ2NvbXBvbmVudHMvU0VPJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnY29udGFpbmVycy9OYXZCYXInO1xuaW1wb3J0IENoYW5uZWxMb2dpbkZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtJztcbmltcG9ydCBDaGFubmVsQ3JlYXRlRm9ybSBmcm9tICdjb250YWluZXJzL0NoYW5uZWxDcmVhdGVGb3JtJztcblxuY2xhc3MgTG9naW5QYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV3UHJvcHMpIHtcbiAgICAvLyByZS1yb3V0ZSB0aGUgdXNlciB0byB0aGUgaG9tZXBhZ2UgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgaWYgKG5ld1Byb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWUgIT09IHRoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZSkge1xuICAgICAgdGhpcy5wcm9wcy5oaXN0b3J5LnB1c2goYC9gKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNFTyBwYWdlVGl0bGU9eydMb2dpbid9IHBhZ2VVcmk9eydsb2dpbid9IC8+XG4gICAgICAgIDxOYXZCYXIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1tZWQtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8cD5DaGFubmVscyBhbGxvdyB5b3UgdG8gcHVibGlzaCBhbmQgZ3JvdXAgY29udGVudCB1bmRlciBhbiBpZGVudGl0eS4gWW91IGNhbiBjcmVhdGUgYSBjaGFubmVsIGZvciB5b3Vyc2VsZiwgb3Igc2hhcmUgb25lIHdpdGggbGlrZS1taW5kZWQgZnJpZW5kcy4gIFlvdSBjYW4gY3JlYXRlIDEgY2hhbm5lbCwgb3IgMTAwLCBzbyB3aGV0aGVyIHlvdSdyZSA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdGFsb25pYTIwMTc6NDNkY2Y0NzE2M2NhYTIxZDg0MDRkOWZlOWIzMGY3OGVmM2UxNDZhOCc+ZG9jdW1lbnRpbmcgaW1wb3J0YW50IGV2ZW50czwvYT4sIG9yIG1ha2luZyBhIHB1YmxpYyByZXBvc2l0b3J5IGZvciA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPScvQGNhdEdpZnMnPmNhdCBnaWZzPC9hPiAocGFzc3dvcmQ6ICcxMjM0JyksIHRyeSBjcmVhdGluZyBhIGNoYW5uZWwgZm9yIGl0ITwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS01IGNvbHVtbi0tbWVkLTEwIGFsaWduLWNvbnRlbnQtdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+TG9nIGluIHRvIGFuIGV4aXN0aW5nIGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxMb2dpbkZvcm0gLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT0naDMtLW5vLWJvdHRvbSc+Q3JlYXRlIGEgYnJhbmQgbmV3IGNoYW5uZWw6PC9oMz5cbiAgICAgICAgICAgICAgPENoYW5uZWxDcmVhdGVGb3JtIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKExvZ2luUGFnZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcGFnZXMvTG9naW5QYWdlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsTG9naW5Gb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBlcnJvciAgIDogbnVsbCxcbiAgICAgIG5hbWUgICAgOiAnJyxcbiAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dpblRvQ2hhbm5lbCA9IHRoaXMubG9naW5Ub0NoYW5uZWwuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIGxvZ2luVG9DaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lOiB0aGlzLnN0YXRlLm5hbWUsIHBhc3N3b3JkOiB0aGlzLnN0YXRlLnBhc3N3b3JkfSksXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9KSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfTtcbiAgICByZXF1ZXN0KCdsb2dpbicsIHBhcmFtcylcbiAgICAgIC50aGVuKCh7c3VjY2VzcywgY2hhbm5lbE5hbWUsIHNob3J0Q2hhbm5lbElkLCBjaGFubmVsQ2xhaW1JZCwgbWVzc2FnZX0pID0+IHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKGNoYW5uZWxOYW1lLCBzaG9ydENoYW5uZWxJZCwgY2hhbm5lbENsYWltSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG1lc3NhZ2V9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvcn0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBpZD0nY2hhbm5lbC1sb2dpbi1mb3JtJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbG9naW4tbmFtZS1pbnB1dCc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS02IGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnB1dC10ZXh0LS1wcmltYXJ5IGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLWxlZnQtYm90dG9tJz5cbiAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdjaGFubmVsLWxvZ2luLW5hbWUtaW5wdXQnIGNsYXNzTmFtZT0naW5wdXQtdGV4dCcgbmFtZT0nbmFtZScgcGxhY2Vob2xkZXI9J1lvdXIgQ2hhbm5lbCBOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsTmFtZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xhYmVsJyBodG1sRm9yPSdjaGFubmVsLWxvZ2luLXBhc3N3b3JkLWlucHV0JyA+UGFzc3dvcmQ6PC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtdGV4dC0tcHJpbWFyeSc+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdwYXNzd29yZCcgaWQ9J2NoYW5uZWwtbG9naW4tcGFzc3dvcmQtaW5wdXQnIG5hbWU9J3Bhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnIHBsYWNlaG9sZGVyPScnIHZhbHVlPXt0aGlzLnN0YXRlLmNoYW5uZWxQYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHsgdGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSc+e3RoaXMuc3RhdGUuZXJyb3J9PC9wPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5FbnRlciB0aGUgbmFtZSBhbmQgcGFzc3dvcmQgZm9yIHlvdXIgY2hhbm5lbDwvcD5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUnPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnknIG9uQ2xpY2s9e3RoaXMubG9naW5Ub0NoYW5uZWx9PkF1dGhlbnRpY2F0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxMb2dpbkZvcm07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9DaGFubmVsTG9naW5Gb3JtL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICdjb21wb25lbnRzL1Byb2dyZXNzQmFyJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuXG5jbGFzcyBDaGFubmVsQ3JlYXRlRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZXJyb3IgICA6IG51bGwsXG4gICAgICBjaGFubmVsIDogJycsXG4gICAgICBwYXNzd29yZDogJycsXG4gICAgICBzdGF0dXMgIDogbnVsbCxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQ2hhbm5lbElucHV0ID0gdGhpcy5oYW5kbGVDaGFubmVsSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUlucHV0ID0gdGhpcy5oYW5kbGVJbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY3JlYXRlQ2hhbm5lbCA9IHRoaXMuY3JlYXRlQ2hhbm5lbC5iaW5kKHRoaXMpO1xuICB9XG4gIGNsZWFuc2VDaGFubmVsSW5wdXQgKGlucHV0KSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMrL2csICctJyk7IC8vIHJlcGxhY2Ugc3BhY2VzIHdpdGggZGFzaGVzXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOS1dL2csICcnKTsgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgb3IgJy0nXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIGhhbmRsZUNoYW5uZWxJbnB1dCAoZXZlbnQpIHtcbiAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmNsZWFuc2VDaGFubmVsSW5wdXQodmFsdWUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2NoYW5uZWw6IHZhbHVlfSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiAnUGxlYXNlIGVudGVyIGEgY2hhbm5lbCBuYW1lJ30pO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnB1dCAoZXZlbnQpIHtcbiAgICBjb25zdCBuYW1lID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgY29uc3QgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7W25hbWVdOiB2YWx1ZX0pO1xuICB9XG4gIHVwZGF0ZUlzQ2hhbm5lbEF2YWlsYWJsZSAoY2hhbm5lbCkge1xuICAgIGNvbnN0IGNoYW5uZWxXaXRoQXRTeW1ib2wgPSBgQCR7Y2hhbm5lbH1gO1xuICAgIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IG51bGx9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeydlcnJvcic6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgIH0pO1xuICB9XG4gIGNoZWNrSXNDaGFubmVsQXZhaWxhYmxlIChjaGFubmVsKSB7XG4gICAgY29uc3QgY2hhbm5lbFdpdGhBdFN5bWJvbCA9IGBAJHtjaGFubmVsfWA7XG4gICAgcmV0dXJuIHJlcXVlc3QoYC9hcGkvY2hhbm5lbC9hdmFpbGFiaWxpdHkvJHtjaGFubmVsV2l0aEF0U3ltYm9sfWApO1xuICB9XG4gIGNoZWNrSXNQYXNzd29yZFByb3ZpZGVkIChwYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXBhc3N3b3JkIHx8IHBhc3N3b3JkLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgcGFzc3dvcmQnKSk7XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbiAgbWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoe3VzZXJuYW1lLCBwYXNzd29yZH0pLFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3QoJy9zaWdudXAnLCBwYXJhbXMpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBVbmZvcnR1bmF0ZWx5LCB3ZSBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBjcmVhdGluZyB5b3VyIGNoYW5uZWwuIFBsZWFzZSBsZXQgdXMga25vdyBpbiBEaXNjb3JkISAke2Vycm9yLm1lc3NhZ2V9YCkpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBjcmVhdGVDaGFubmVsIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jaGVja0lzUGFzc3dvcmRQcm92aWRlZCh0aGlzLnN0YXRlLnBhc3N3b3JkKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0lzQ2hhbm5lbEF2YWlsYWJsZSh0aGlzLnN0YXRlLmNoYW5uZWwpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOiAnV2UgYXJlIHB1Ymxpc2hpbmcgeW91ciBuZXcgY2hhbm5lbC4gIFNpdCB0aWdodC4uLid9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZVB1Ymxpc2hDaGFubmVsUmVxdWVzdCh0aGlzLnN0YXRlLmNoYW5uZWwsIHRoaXMuc3RhdGUucGFzc3dvcmQpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czogbnVsbH0pO1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbm5lbExvZ2luKHJlc3VsdC5jaGFubmVsTmFtZSwgcmVzdWx0LnNob3J0Q2hhbm5lbElkLCByZXN1bHQuY2hhbm5lbENsYWltSWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvci5tZXNzYWdlLCBzdGF0dXM6IG51bGx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsnZXJyb3InOiBlcnJvciwgc3RhdHVzOiBudWxsfSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7ICF0aGlzLnN0YXRlLnN0YXR1cyA/IChcbiAgICAgICAgICA8Zm9ybSBpZD0ncHVibGlzaC1jaGFubmVsLWZvcm0nPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgcm93LS1zaG9ydCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCcgaHRtbEZvcj0nbmV3LWNoYW5uZWwtbmFtZSc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tbGVmdC1ib3R0b20gc3Bhbi0tcmVsYXRpdmUnPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBuYW1lPSdjaGFubmVsJyBpZD0nbmV3LWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBwbGFjZWhvbGRlcj0nZXhhbXBsZUNoYW5uZWxOYW1lJyB2YWx1ZT17dGhpcy5zdGF0ZS5jaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFubmVsSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgICB7ICh0aGlzLnN0YXRlLmNoYW5uZWwgJiYgIXRoaXMuc3RhdGUuZXJyb3IpICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLXN1Y2Nlc3Mgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxMyd9PC9zcGFuPiB9XG4gICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuZXJyb3IgJiYgPHNwYW4gaWQ9J2lucHV0LXN1Y2Nlc3MtY2hhbm5lbC1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tZmFpbHVyZSBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzE2J308L3NwYW4+IH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlIHJvdy0tc2hvcnQnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J25ldy1jaGFubmVsLXBhc3N3b3JkJz5QYXNzd29yZDo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNiBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnknPlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBuYW1lPSdwYXNzd29yZCcgaWQ9J25ldy1jaGFubmVsLXBhc3N3b3JkJyBjbGFzc05hbWU9J2lucHV0LXRleHQnICBwbGFjZWhvbGRlcj0nJyB2YWx1ZT17dGhpcy5zdGF0ZS5wYXNzd29yZH0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciA/IChcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt0aGlzLnN0YXRlLmVycm9yfTwvcD5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5DaG9vc2UgYSBuYW1lIGFuZCBwYXNzd29yZCBmb3IgeW91ciBjaGFubmVsPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeScgb25DbGljaz17dGhpcy5jcmVhdGVDaGFubmVsfT5DcmVhdGUgQ2hhbm5lbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPnt0aGlzLnN0YXRlLnN0YXR1c308L3A+XG4gICAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYW5uZWxDcmVhdGVGb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQ2hhbm5lbENyZWF0ZUZvcm0vdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IFNob3dBc3NldExpdGUgZnJvbSAnY29udGFpbmVycy9TaG93QXNzZXRMaXRlJztcbmltcG9ydCBTaG93QXNzZXREZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvU2hvd0Fzc2V0RGV0YWlscyc7XG5pbXBvcnQgU2hvd0NoYW5uZWwgZnJvbSAnY29udGFpbmVycy9TaG93Q2hhbm5lbCc7XG5cbmltcG9ydCB7IENIQU5ORUwsIEFTU0VUX0xJVEUsIEFTU0VUX0RFVEFJTFMgfSBmcm9tICdjb25zdGFudHMvc2hvd19yZXF1ZXN0X3R5cGVzJztcblxuY2xhc3MgU2hvd1BhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkhhbmRsZVNob3dQYWdlVXJpKHRoaXMucHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgfVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLm1hdGNoLnBhcmFtcyAhPT0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMpIHtcbiAgICAgIHRoaXMucHJvcHMub25IYW5kbGVTaG93UGFnZVVyaShuZXh0UHJvcHMubWF0Y2gucGFyYW1zKTtcbiAgICB9XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGVycm9yLCByZXF1ZXN0VHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvclBhZ2UgZXJyb3I9e2Vycm9yfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgc3dpdGNoIChyZXF1ZXN0VHlwZSkge1xuICAgICAgY2FzZSBDSEFOTkVMOlxuICAgICAgICByZXR1cm4gPFNob3dDaGFubmVsIC8+O1xuICAgICAgY2FzZSBBU1NFVF9MSVRFOlxuICAgICAgICByZXR1cm4gPFNob3dBc3NldExpdGUgLz47XG4gICAgICBjYXNlIEFTU0VUX0RFVEFJTFM6XG4gICAgICAgIHJldHVybiA8U2hvd0Fzc2V0RGV0YWlscyAvPjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8cD5sb2FkaW5nLi4uPC9wPjtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3BhZ2VzL1Nob3dQYWdlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFzc2V0RGlzcGxheSBmcm9tICdjb250YWluZXJzL0Fzc2V0RGlzcGxheSc7XG5cbmNsYXNzIFNob3dMaXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBuYW1lLCBjbGFpbUlkIH0gPSBhc3NldC5jbGFpbURhdGE7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uIGZsZXgtY29udGFpbmVyLS1jZW50ZXItY2VudGVyIHNob3ctbGl0ZS1jb250YWluZXInPlxuICAgICAgICAgIDxTRU8gcGFnZVRpdGxlPXtuYW1lfSBhc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgPEFzc2V0RGlzcGxheSAvPlxuICAgICAgICAgIDxMaW5rIGlkPSdhc3NldC1ib2lsZXJwYXRlJyBjbGFzc05hbWU9J2xpbmstLXByaW1hcnkgZmluZS1wcmludCcgdG89e2AvJHtjbGFpbUlkfS8ke25hbWV9YH0+aG9zdGVkXG4gICAgICAgICAgICB2aWEgU3BlZS5jaDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwPmxvYWRpbmcgYXNzZXQgZGF0YS4uLjwvcD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dMaXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgVU5BVkFJTEFCTEUsIEVSUk9SLCBBVkFJTEFCTEUgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jbGFzcyBBc3NldERpc3BsYXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5wcm9wcy5vbkZpbGVSZXF1ZXN0KG5hbWUsIGNsYWltSWQpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBzdGF0dXMsIGVycm9yLCBhc3NldDogeyBjbGFpbURhdGE6IHsgbmFtZSwgY2xhaW1JZCwgY29udGVudFR5cGUsIGZpbGVFeHQsIHRodW1ibmFpbCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9J2Fzc2V0LWRpc3BsYXktY29tcG9uZW50Jz5cbiAgICAgICAgeyhzdGF0dXMgPT09IExPQ0FMX0NIRUNLKSAmJlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPkNoZWNraW5nIHRvIHNlZSBpZiBTcGVlLmNoIGhhcyB5b3VyIGFzc2V0IGxvY2FsbHkuLi48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBVTkFWQUlMQUJMRSkgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5TaXQgdGlnaHQsIHdlJ3JlIHNlYXJjaGluZyB0aGUgTEJSWSBibG9ja2NoYWluIGZvciB5b3VyIGFzc2V0ITwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgc2l6ZT17MTJ9IC8+XG4gICAgICAgICAgPHA+Q3VyaW91cyB3aGF0IG1hZ2ljIGlzIGhhcHBlbmluZyBoZXJlPyA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nYmxhbmsnIGhyZWY9J2h0dHBzOi8vbGJyeS5pby9mYXEvd2hhdC1pcy1sYnJ5Jz5MZWFybiBtb3JlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHsoc3RhdHVzID09PSBFUlJPUikgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD5VbmZvcnR1bmF0ZWx5LCB3ZSBjb3VsZG4ndCBkb3dubG9hZCB5b3VyIGFzc2V0IGZyb20gTEJSWS4gIFlvdSBjYW4gaGVscCB1cyBvdXQgYnkgc2hhcmluZyB0aGUgYmVsb3cgZXJyb3IgbWVzc2FnZSBpbiB0aGUgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPSdodHRwczovL2Rpc2NvcmQuZ2cvWWpZYndoUycgdGFyZ2V0PSdfYmxhbmsnPkxCUlkgZGlzY29yZDwvYT4uPC9wPlxuICAgICAgICAgIDxpPjxwIGlkPSdlcnJvci1tZXNzYWdlJz57ZXJyb3J9PC9wPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgeyhzdGF0dXMgPT09IEFWQUlMQUJMRSkgJiZcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nYXNzZXQnXG4gICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgYWx0PXtuYW1lfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J2Fzc2V0J1xuICAgICAgICAgICAgICAgICAgc3JjPXtgLyR7Y2xhaW1JZH0vJHtuYW1lfS4ke2ZpbGVFeHR9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dmlkZW8gY2xhc3NOYW1lPSdhc3NldCB2aWRlbycgY29udHJvbHMgcG9zdGVyPXt0aHVtYm5haWx9PlxuICAgICAgICAgICAgICAgICAgPHNvdXJjZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e2AvJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxwPllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSA8Y29kZT52aWRlbzwvY29kZT4gZWxlbWVudC48L3A+XG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+VW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBc3NldERpc3BsYXk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldERpc3BsYXkvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNFTyBmcm9tICdjb21wb25lbnRzL1NFTyc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAncGFnZXMvRXJyb3JQYWdlJztcbmltcG9ydCBBc3NldFRpdGxlIGZyb20gJ2NvbnRhaW5lcnMvQXNzZXRUaXRsZSc7XG5pbXBvcnQgQXNzZXREaXNwbGF5IGZyb20gJ2NvbnRhaW5lcnMvQXNzZXREaXNwbGF5JztcbmltcG9ydCBBc3NldEluZm8gZnJvbSAnY29udGFpbmVycy9Bc3NldEluZm8nO1xuXG5jbGFzcyBTaG93QXNzZXREZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChhc3NldCkge1xuICAgICAgY29uc3QgeyBjbGFpbURhdGE6IHsgbmFtZSB9IH0gPSBhc3NldDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNFTyBwYWdlVGl0bGU9e2Ake25hbWV9IC0gZGV0YWlsc2B9IGFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPEFzc2V0VGl0bGUgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTUgY29sdW1uLS1zbWwtMTAgYWxpZ24tY29udGVudC10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHNob3ctZGV0YWlscy1jb250YWluZXInPlxuICAgICAgICAgICAgICAgIDxBc3NldERpc3BsYXkgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgICAgIDxBc3NldEluZm8gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvclBhZ2UgZXJyb3I9eydsb2FkaW5nIGFzc2V0IGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dBc3NldERldGFpbHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9TaG93QXNzZXREZXRhaWxzL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQXNzZXRUaXRsZSA9ICh7IHRpdGxlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0LS1sYXJnZSc+e3RpdGxlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0VGl0bGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9Bc3NldFRpdGxlL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY2xhc3MgQXNzZXRJbmZvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkID0gdGhpcy5jb3B5VG9DbGlwYm9hcmQuYmluZCh0aGlzKTtcbiAgfVxuICBjb3B5VG9DbGlwYm9hcmQgKGV2ZW50KSB7XG4gICAgdmFyIGVsZW1lbnRUb0NvcHkgPSBldmVudC50YXJnZXQuZGF0YXNldC5lbGVtZW50dG9jb3B5O1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvQ29weSk7XG4gICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgICB0cnkge1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiAnT29wcywgdW5hYmxlIHRvIGNvcHknfSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBhc3NldDogeyBzaG9ydElkLCBjbGFpbURhdGEgOiB7IGNoYW5uZWxOYW1lLCBjZXJ0aWZpY2F0ZUlkLCBkZXNjcmlwdGlvbiwgbmFtZSwgY2xhaW1JZCwgZmlsZUV4dCwgY29udGVudFR5cGUsIHRodW1ibmFpbCwgaG9zdCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHtjaGFubmVsTmFtZSAmJlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5DaGFubmVsOjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tOCBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPjxMaW5rIHRvPXtgLyR7Y2hhbm5lbE5hbWV9OiR7Y2VydGlmaWNhdGVJZH1gfT57Y2hhbm5lbE5hbWV9PC9MaW5rPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICB7ZGVzY3JpcHRpb24gJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLXdpZGUgcm93LS1uby10b3AnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGV4dCc+e2Rlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cblxuICAgICAgICA8ZGl2IGlkPSdzaG93LXNoYXJlLWJ1dHRvbnMnPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS13aWRlIHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5TaGFyZTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS04IGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlIGZsZXgtY29udGFpbmVyLS1yb3cgZmxleC1jb250YWluZXItLXNwYWNlLWJldHdlZW4tYm90dG9tIGZsZXgtY29udGFpbmVyLS13cmFwJz5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXtgaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dGV4dD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfWB9PnR3aXR0ZXI8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9YH0+ZmFjZWJvb2s8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHA6Ly90dW1ibHIuY29tL3dpZGdldHMvc2hhcmUvdG9vbD9jYW5vbmljYWxVcmw9JHtob3N0fS8ke3Nob3J0SWR9LyR7bmFtZX1gfT50dW1ibHI8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyB0YXJnZXQ9J19ibGFuaycgaHJlZj17YGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vc3VibWl0P3VybD0ke2hvc3R9LyR7c2hvcnRJZH0vJHtuYW1lfSZ0aXRsZT0ke25hbWV9YH0+cmVkZGl0PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0td2lkZSByb3ctLW5vLXRvcCc+XG4gICAgICAgICAgPGRpdiBpZD0nc2hvdy1zaG9ydC1saW5rJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0yIGNvbHVtbi0tbWVkLTEwJz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0Jz5MaW5rOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtZXJyb3InIGlkPSdpbnB1dC1lcnJvci1jb3B5LXNob3J0LWxpbmsnIGhpZGRlbj0ndHJ1ZSc+ZXJyb3IgaGVyZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdzaG9ydC1saW5rJyBjbGFzc05hbWU9J2lucHV0LWRpc2FibGVkIGlucHV0LXRleHQtLWZ1bGwtd2lkdGgnIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgIHNwZWxsQ2hlY2s9J2ZhbHNlJ1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YCR7aG9zdH0vJHtzaG9ydElkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMic+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0td2lkZScgZGF0YS1lbGVtZW50dG9jb3B5PSdzaG9ydC1saW5rJ1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNvcHlUb0NsaXBib2FyZH0+Y29weVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGlkPSdzaG93LWVtYmVkLWNvZGUnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTIgY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3RleHQnPkVtYmVkOjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTggY29sdW1uLS1tZWQtMTAnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW5wdXQtZXJyb3InIGlkPSdpbnB1dC1lcnJvci1jb3B5LWVtYmVkLXRleHQnIGhpZGRlbj0ndHJ1ZSc+ZXJyb3IgaGVyZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgeyhjb250ZW50VHlwZSA9PT0gJ3ZpZGVvL21wNCcpID8gKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2VtYmVkLXRleHQnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2A8dmlkZW8gd2lkdGg9XCIxMDAlXCIgY29udHJvbHMgcG9zdGVyPVwiJHt0aHVtYm5haWx9XCIgc3JjPVwiJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fVwiLz48L3ZpZGVvPmB9IC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2VtYmVkLXRleHQnIGNsYXNzTmFtZT0naW5wdXQtZGlzYWJsZWQgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbGVjdH0gc3BlbGxDaGVjaz0nZmFsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2A8aW1nIHNyYz1cIiR7aG9zdH0vJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1cIi8+YH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEnIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTInPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tcHJpbWFyeSBidXR0b24tLXdpZGUnIGRhdGEtZWxlbWVudHRvY29weT0nZW1iZWQtdGV4dCdcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jb3B5VG9DbGlwYm9hcmR9PmNvcHlcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1ib3R0b20nPlxuICAgICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdG89e2AvJHtzaG9ydElkfS8ke25hbWV9LiR7ZmlsZUV4dH1gfT48c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPSd0ZXh0Jz5EaXJlY3QgTGluazwvc3Bhbj48L0xpbms+XG4gICAgICAgICAgPGEgY2xhc3NOYW1lPSdsaW5rLS1wcmltYXJ5JyBocmVmPXtgJHtob3N0fS8ke2NsYWltSWR9LyR7bmFtZX0uJHtmaWxlRXh0fWB9IGRvd25sb2FkPXtuYW1lfT5Eb3dubG9hZDwvYT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vZG1jYSc+UmVwb3J0PC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRJbmZvO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvQXNzZXRJbmZvL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTRU8gZnJvbSAnY29tcG9uZW50cy9TRU8nO1xuaW1wb3J0IEVycm9yUGFnZSBmcm9tICdwYWdlcy9FcnJvclBhZ2UnO1xuaW1wb3J0IE5hdkJhciBmcm9tICdjb250YWluZXJzL05hdkJhcic7XG5pbXBvcnQgQ2hhbm5lbENsYWltc0Rpc3BsYXkgZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ2xhaW1zRGlzcGxheSc7XG5cbmNsYXNzIFNob3dDaGFubmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGNoYW5uZWwpIHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbG9uZ0lkLCBzaG9ydElkIH0gPSBjaGFubmVsO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U0VPIHBhZ2VUaXRsZT17bmFtZX0gY2hhbm5lbD17Y2hhbm5lbH0gLz5cbiAgICAgICAgICA8TmF2QmFyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwJz5cbiAgICAgICAgICAgICAgPGgyPmNoYW5uZWwgbmFtZToge25hbWV9PC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXsnZmluZS1wcmludCd9PmZ1bGwgY2hhbm5lbCBpZDoge2xvbmdJZH08L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17J2ZpbmUtcHJpbnQnfT5zaG9ydCBjaGFubmVsIGlkOiB7c2hvcnRJZH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0xMCc+XG4gICAgICAgICAgICAgIDxDaGFubmVsQ2xhaW1zRGlzcGxheSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JQYWdlIGVycm9yPXsnbG9hZGluZyBjaGFubmVsIGRhdGEuLi4nfSAvPlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dDaGFubmVsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvU2hvd0NoYW5uZWwvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFzc2V0UHJldmlldyBmcm9tICdjb21wb25lbnRzL0Fzc2V0UHJldmlldyc7XG5cbmNsYXNzIENoYW5uZWxDbGFpbXNEaXNwbGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZSA9IHRoaXMuc2hvd05leHRSZXN1bHRzUGFnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgPSB0aGlzLnNob3dQcmV2aW91c1Jlc3VsdHNQYWdlLmJpbmQodGhpcyk7XG4gIH1cbiAgc2hvd1ByZXZpb3VzUmVzdWx0c1BhZ2UgKCkge1xuICAgIGNvbnN0IHsgY2hhbm5lbDogeyBjbGFpbXNEYXRhOiB7IGN1cnJlbnRQYWdlIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBwcmV2aW91c1BhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgLSAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UocHJldmlvdXNQYWdlKTtcbiAgfVxuICBzaG93TmV4dFJlc3VsdHNQYWdlICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjdXJyZW50UGFnZSB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChjdXJyZW50UGFnZSkgKyAxO1xuICAgIHRoaXMuc2hvd05ld1BhZ2UobmV4dFBhZ2UpO1xuICB9XG4gIHNob3dOZXdQYWdlIChwYWdlKSB7XG4gICAgY29uc3QgeyBjaGFubmVsS2V5LCBjaGFubmVsOiB7IG5hbWUsIGxvbmdJZCB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMucHJvcHMub25VcGRhdGVDaGFubmVsQ2xhaW1zKGNoYW5uZWxLZXksIG5hbWUsIGxvbmdJZCwgcGFnZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGNoYW5uZWw6IHsgY2xhaW1zRGF0YTogeyBjbGFpbXMsIGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXRhbGwnPlxuICAgICAgICB7KGNsYWltcy5sZW5ndGggPiAwKSA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge2NsYWltcy5tYXAoKGNsYWltLCBpbmRleCkgPT4gPEFzc2V0UHJldmlld1xuICAgICAgICAgICAgICBjbGFpbURhdGE9e2NsYWltfVxuICAgICAgICAgICAgICBrZXk9e2Ake2NsYWltLm5hbWV9LSR7aW5kZXh9YH1cbiAgICAgICAgICAgIC8+KX1cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPiAxKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93UHJldmlvdXNSZXN1bHRzUGFnZX0+UHJldmlvdXMgUGFnZTwvYnV0dG9uPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHsoY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzKSAmJlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17J2J1dHRvbi0tc2Vjb25kYXJ5J30gb25DbGljaz17dGhpcy5zaG93TmV4dFJlc3VsdHNQYWdlfT5OZXh0IFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHA+VGhlcmUgYXJlIG5vIGNsYWltcyBpbiB0aGlzIGNoYW5uZWw8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGFubmVsQ2xhaW1zRGlzcGxheTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY29uc3QgQXNzZXRQcmV2aWV3ID0gKHsgZGVmYXVsdFRodW1ibmFpbCwgY2xhaW1EYXRhOiB7IG5hbWUsIGNsYWltSWQsIGZpbGVFeHQsIGNvbnRlbnRUeXBlLCB0aHVtYm5haWwgfSB9KSA9PiB7XG4gIGNvbnN0IGRpcmVjdFNvdXJjZUxpbmsgPSBgJHtjbGFpbUlkfS8ke25hbWV9LiR7ZmlsZUV4dH1gO1xuICBjb25zdCBzaG93VXJsTGluayA9IGAvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nYXNzZXQtaG9sZGVyJz5cbiAgICAgIDxMaW5rIHRvPXtzaG93VXJsTGlua30gPlxuICAgICAgICB7KCgpID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9qcGVnJzpcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICAgICAgICBjYXNlICdpbWFnZS9wbmcnOlxuICAgICAgICAgICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3J31cbiAgICAgICAgICAgICAgICAgIHNyYz17ZGlyZWN0U291cmNlTGlua31cbiAgICAgICAgICAgICAgICAgIGFsdD17bmFtZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydhc3NldC1wcmV2aWV3IHZpZGVvJ31cbiAgICAgICAgICAgICAgICAgIHNyYz17dGh1bWJuYWlsIHx8IGRlZmF1bHRUaHVtYm5haWx9XG4gICAgICAgICAgICAgICAgICBhbHQ9e25hbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPHA+dW5zdXBwb3J0ZWQgZmlsZSB0eXBlPC9wPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKX1cbiAgICAgIDwvTGluaz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0UHJldmlldztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb21wb25lbnRzL0Fzc2V0UHJldmlldy92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJ2NvbnRhaW5lcnMvTmF2QmFyJztcbmltcG9ydCBIZWxtZXQgZnJvbSAncmVhY3QtaGVsbWV0JztcblxuY2xhc3MgRm91ck9oRm9yUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3RpdGxlLCBob3N0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgPHRpdGxlPnt0aXRsZX0gLSA0MDQ8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD0nY2Fub25pY2FsJyBocmVmPXtgJHtob3N0fS80MDRgfSAvPlxuICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgPE5hdkJhciAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkJz5cbiAgICAgICAgICA8aDI+NDA0PC9oMj5cbiAgICAgICAgICA8cD5UaGF0IHBhZ2UgZG9lcyBub3QgZXhpc3Q8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRm91ck9oRm9yUGFnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0ZvdXJPaEZvdXJQYWdlL3ZpZXcuanN4IiwiY29uc3QgeyBsc3RhdFN5bmMsIHJlYWRkaXJTeW5jIH0gPSByZXF1aXJlKCdmcycpO1xuY29uc3QgeyBqb2luIH0gPSByZXF1aXJlKCdwYXRoJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRTdWJEaXJlY3RvcnlOYW1lcyA9IChyb290KSA9PiB7XG4gIHJldHVybiByZWFkZGlyU3luYyhyb290KVxuICAgIC5maWx0ZXIobmFtZSA9PiB7XG4gICAgICBjb25zdCBmdWxsUGF0aCA9IGpvaW4ocm9vdCwgbmFtZSk7XG4gICAgICByZXR1cm4gbHN0YXRTeW5jKGZ1bGxQYXRoKS5pc0RpcmVjdG9yeSgpO1xuICAgIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2J1aWxkL2dldEZvbGRlck5hbWVzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDaGFubmVsTG9naW5Gb3JtIGZyb20gJ2NvbnRhaW5lcnMvQ2hhbm5lbExvZ2luRm9ybSc7XG5pbXBvcnQgQ2hhbm5lbENyZWF0ZUZvcm0gZnJvbSAnY29udGFpbmVycy9DaGFubmVsQ3JlYXRlRm9ybSc7XG5pbXBvcnQgKiBhcyBzdGF0ZXMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcblxuY2xhc3MgQ2hhbm5lbFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2ggPSB0aGlzLnRvZ2dsZUFub255bW91c1B1Ymxpc2guYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbiA9IHRoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gIH1cbiAgdG9nZ2xlQW5vbnltb3VzUHVibGlzaCAoZXZlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICdhbm9ueW1vdXMnKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUHVibGlzaEluQ2hhbm5lbENoYW5nZShmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25QdWJsaXNoSW5DaGFubmVsQ2hhbmdlKHRydWUpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTZWxlY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBldmVudC50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25DaGFubmVsU2VsZWN0KHNlbGVjdGVkT3B0aW9uKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nYW5vbnltb3VzLXJhZGlvJyBjbGFzc05hbWU9J2lucHV0LXJhZGlvJyB2YWx1ZT0nYW5vbnltb3VzJyBjaGVja2VkPXshdGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2Fub255bW91cy1yYWRpbyc+QW5vbnltb3VzPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0ncmFkaW8nIG5hbWU9J2Fub255bW91cy1vci1jaGFubmVsJyBpZD0nY2hhbm5lbC1yYWRpbycgY2xhc3NOYW1lPSdpbnB1dC1yYWRpbycgdmFsdWU9J2luIGEgY2hhbm5lbCcgY2hlY2tlZD17dGhpcy5wcm9wcy5wdWJsaXNoSW5DaGFubmVsfSBvbkNoYW5nZT17dGhpcy50b2dnbGVBbm9ueW1vdXNQdWJsaXNofSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwgbGFiZWwtLXBvaW50ZXInIGh0bWxGb3I9J2NoYW5uZWwtcmFkaW8nPkluIGEgY2hhbm5lbDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgeyB0aGlzLnByb3BzLmNoYW5uZWxFcnJvciA/IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLS1mYWlsdXJlJz57dGhpcy5wcm9wcy5jaGFubmVsRXJyb3J9PC9wPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2luZm8tbWVzc2FnZSc+UHVibGlzaCBhbm9ueW1vdXNseSBvciBpbiBhIGNoYW5uZWw8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICB7IHRoaXMucHJvcHMucHVibGlzaEluQ2hhbm5lbCAmJiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS0zJz5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbGFiZWwnIGh0bWxGb3I9J2NoYW5uZWwtbmFtZS1zZWxlY3QnPkNoYW5uZWw6PC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjb2x1bW4gY29sdW1uLS03Jz5cbiAgICAgICAgICAgICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBpZD0nY2hhbm5lbC1uYW1lLXNlbGVjdCcgY2xhc3NOYW1lPSdzZWxlY3Qgc2VsZWN0LS1hcnJvdycgdmFsdWU9e3RoaXMucHJvcHMuc2VsZWN0ZWRDaGFubmVsfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3Rpb259PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5sb2dnZWRJbkNoYW5uZWxOYW1lICYmIDxvcHRpb24gdmFsdWU9e3RoaXMucHJvcHMubG9nZ2VkSW5DaGFubmVsTmFtZX0gaWQ9J3B1Ymxpc2gtY2hhbm5lbC1zZWxlY3QtY2hhbm5lbC1vcHRpb24nPnt0aGlzLnByb3BzLmxvZ2dlZEluQ2hhbm5lbE5hbWV9PC9vcHRpb24+IH1cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXtzdGF0ZXMuTE9HSU59PkV4aXN0aW5nPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17c3RhdGVzLkNSRUFURX0+TmV3PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkxPR0lOKSAmJiA8Q2hhbm5lbExvZ2luRm9ybSAvPiB9XG4gICAgICAgICAgICB7ICh0aGlzLnByb3BzLnNlbGVjdGVkQ2hhbm5lbCA9PT0gc3RhdGVzLkNSRUFURSkgJiYgPENoYW5uZWxDcmVhdGVGb3JtIC8+IH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbm5lbFNlbGVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL0NoYW5uZWxTZWxlY3Qvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdmFsaWRhdGVGaWxlIH0gZnJvbSAndXRpbHMvZmlsZSc7XG5pbXBvcnQgUHVibGlzaFByZXZpZXcgZnJvbSAnY29tcG9uZW50cy9QdWJsaXNoUHJldmlldyc7XG5cbmNsYXNzIERyb3B6b25lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnT3ZlciAgOiBmYWxzZSxcbiAgICAgIG1vdXNlT3ZlciA6IGZhbHNlLFxuICAgICAgZGltUHJldmlldzogZmFsc2UsXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZURyb3AgPSB0aGlzLmhhbmRsZURyb3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdPdmVyID0gdGhpcy5oYW5kbGVEcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VuZCA9IHRoaXMuaGFuZGxlRHJhZ0VuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRHJhZ0VudGVyID0gdGhpcy5oYW5kbGVEcmFnRW50ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURyYWdMZWF2ZSA9IHRoaXMuaGFuZGxlRHJhZ0xlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUVudGVyID0gdGhpcy5oYW5kbGVNb3VzZUVudGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZUxlYXZlID0gdGhpcy5oYW5kbGVNb3VzZUxlYXZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZpbGVJbnB1dCA9IHRoaXMuaGFuZGxlRmlsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaG9vc2VGaWxlID0gdGhpcy5jaG9vc2VGaWxlLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdPdmVyOiBmYWxzZX0pO1xuICAgIC8vIGlmIGRyb3BwZWQgaXRlbXMgYXJlbid0IGZpbGVzLCByZWplY3QgdGhlbVxuICAgIGNvbnN0IGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgaWYgKGR0Lml0ZW1zWzBdLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICBjb25zdCBkcm9wcGVkRmlsZSA9IGR0Lml0ZW1zWzBdLmdldEFzRmlsZSgpO1xuICAgICAgICB0aGlzLmNob29zZUZpbGUoZHJvcHBlZEZpbGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBoYW5kbGVEcmFnT3ZlciAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGhhbmRsZURyYWdFbmQgKGV2ZW50KSB7XG4gICAgdmFyIGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuICAgIGlmIChkdC5pdGVtcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdC5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkdC5pdGVtcy5yZW1vdmUoaSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5jbGVhckRhdGEoKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRHJhZ0VudGVyICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZURyYWdMZWF2ZSAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IGZhbHNlLCBkaW1QcmV2aWV3OiBmYWxzZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlRW50ZXIgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogdHJ1ZSwgZGltUHJldmlldzogdHJ1ZX0pO1xuICB9XG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21vdXNlT3ZlcjogZmFsc2UsIGRpbVByZXZpZXc6IGZhbHNlfSk7XG4gIH1cbiAgaGFuZGxlQ2xpY2sgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZV9pbnB1dCcpLmNsaWNrKCk7XG4gIH1cbiAgaGFuZGxlRmlsZUlucHV0IChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZmlsZUxpc3QgPSBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgdGhpcy5jaG9vc2VGaWxlKGZpbGVMaXN0WzBdKTtcbiAgfVxuICBjaG9vc2VGaWxlIChmaWxlKSB7XG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbGlkYXRlRmlsZShmaWxlKTsgLy8gdmFsaWRhdGUgdGhlIGZpbGUncyBuYW1lLCB0eXBlLCBhbmQgc2l6ZVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2V0RmlsZUVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgLy8gc3RhZ2UgaXQgc28gaXQgd2lsbCBiZSByZWFkeSB3aGVuIHRoZSBwdWJsaXNoIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdEZpbGUoZmlsZSk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4nPlxuICAgICAgICA8Zm9ybT5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdpbnB1dC1maWxlJyB0eXBlPSdmaWxlJyBpZD0nZmlsZV9pbnB1dCcgbmFtZT0nZmlsZV9pbnB1dCcgYWNjZXB0PSd2aWRlby8qLGltYWdlLyonIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbGVJbnB1dH0gZW5jVHlwZT0nbXVsdGlwYXJ0L2Zvcm0tZGF0YScgLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8ZGl2IGlkPSdwcmV2aWV3LWRyb3B6b25lJyBjbGFzc05hbWU9eydyb3cgcm93LS1wYWRkZWQgcm93LS10YWxsIGRyb3B6b25lJyArICh0aGlzLnN0YXRlLmRyYWdPdmVyID8gJyBkcm9wem9uZS0tZHJhZy1vdmVyJyA6ICcnKX0gb25Ecm9wPXt0aGlzLmhhbmRsZURyb3B9IG9uRHJhZ092ZXI9e3RoaXMuaGFuZGxlRHJhZ092ZXJ9IG9uRHJhZ0VuZD17dGhpcy5oYW5kbGVEcmFnRW5kfSBvbkRyYWdFbnRlcj17dGhpcy5oYW5kbGVEcmFnRW50ZXJ9IG9uRHJhZ0xlYXZlPXt0aGlzLmhhbmRsZURyYWdMZWF2ZX0gb25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9IG9uTW91c2VMZWF2ZT17dGhpcy5oYW5kbGVNb3VzZUxlYXZlfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5maWxlID8gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPFB1Ymxpc2hQcmV2aWV3XG4gICAgICAgICAgICAgICAgZGltUHJldmlldz17dGhpcy5zdGF0ZS5kaW1QcmV2aWV3fVxuICAgICAgICAgICAgICAgIGZpbGU9e3RoaXMucHJvcHMuZmlsZX1cbiAgICAgICAgICAgICAgICB0aHVtYm5haWw9e3RoaXMucHJvcHMudGh1bWJuYWlsfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8ZGl2IGlkPSdkcm9wem9uZS10ZXh0LWhvbGRlcicgY2xhc3NOYW1lPXsnZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcid9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5kcmFnT3ZlciA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlJz5Ecm9wIGl0LjwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUubW91c2VPdmVyID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtcGxhY2Vob2xkZXIgaW5mby1tZXNzYWdlLS1mYWlsdXJlJyBpZD0naW5wdXQtZXJyb3ItZmlsZS1zZWxlY3Rpb24nPnt0aGlzLnByb3BzLmZpbGVFcnJvcn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkRyYWcgJiBkcm9wIGltYWdlIG9yIHZpZGVvIGhlcmUgdG8gcHVibGlzaDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdibHVlLS11bmRlcmxpbmVkJz5DSE9PU0UgRklMRTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICBudWxsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtdGV4dC1ob2xkZXInIGNsYXNzTmFtZT17J2ZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInfT5cbiAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmRyYWdPdmVyID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J2Ryb3B6b25lLWRyYWdvdmVyJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZSc+RHJvcCBpdC48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD0nZHJvcHpvbmUtaW5zdHJ1Y3Rpb25zJz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlLXBsYWNlaG9sZGVyIGluZm8tbWVzc2FnZS0tZmFpbHVyZScgaWQ9J2lucHV0LWVycm9yLWZpbGUtc2VsZWN0aW9uJz57dGhpcy5wcm9wcy5maWxlRXJyb3J9PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+RHJhZyAmIGRyb3AgaW1hZ2Ugb3IgdmlkZW8gaGVyZSB0byBwdWJsaXNoPC9wPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSdmaW5lLXByaW50Jz5PUjwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0nYmx1ZS0tdW5kZXJsaW5lZCc+Q0hPT1NFIEZJTEU8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERyb3B6b25lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvRHJvcHpvbmUvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hUaXRsZUlucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRpdGxlSW5wdXQnO1xuaW1wb3J0IFB1Ymxpc2hVcmxJbnB1dCBmcm9tICdjb250YWluZXJzL1B1Ymxpc2hVcmxJbnB1dCc7XG5pbXBvcnQgUHVibGlzaFRodW1ibmFpbElucHV0IGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0JztcbmltcG9ydCBQdWJsaXNoTWV0YWRhdGFJbnB1dHMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoTWV0YWRhdGFJbnB1dHMnO1xuaW1wb3J0IENoYW5uZWxTZWxlY3QgZnJvbSAnY29udGFpbmVycy9DaGFubmVsU2VsZWN0JztcblxuY2xhc3MgUHVibGlzaERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLm9uUHVibGlzaFN1Ym1pdCA9IHRoaXMub25QdWJsaXNoU3VibWl0LmJpbmQodGhpcyk7XG4gIH1cbiAgb25QdWJsaXNoU3VibWl0ICgpIHtcbiAgICB0aGlzLnByb3BzLnN0YXJ0UHVibGlzaCh0aGlzLnByb3BzLmhpc3RvcnkpO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby1ib3R0b20nPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMTAnPlxuICAgICAgICAgIDxQdWJsaXNoVGl0bGVJbnB1dCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgey8qIGxlZnQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCcgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPERyb3B6b25lIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7LyogcmlnaHQgY29sdW1uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNSBjb2x1bW4tLXNtbC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgPGRpdiBpZD0ncHVibGlzaC1hY3RpdmUtYXJlYScgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQnPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLXRvcCByb3ctLXdpZGUnPlxuICAgICAgICAgICAgICA8UHVibGlzaFVybElucHV0IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlJz5cbiAgICAgICAgICAgICAgPENoYW5uZWxTZWxlY3QgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgeyAodGhpcy5wcm9wcy5maWxlLnR5cGUgPT09ICd2aWRlby9tcDQnKSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1wYWRkZWQgcm93LS1uby10b3Agcm93LS13aWRlICc+XG4gICAgICAgICAgICAgICAgPFB1Ymxpc2hUaHVtYm5haWxJbnB1dCAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0tbm8tYm90dG9tIHJvdy0td2lkZSc+XG4gICAgICAgICAgICAgIDxQdWJsaXNoTWV0YWRhdGFJbnB1dHMgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXdpZGUgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8YnV0dG9uIGlkPSdwdWJsaXNoLXN1Ym1pdCcgY2xhc3NOYW1lPSdidXR0b24tLXByaW1hcnkgYnV0dG9uLS1sYXJnZScgb25DbGljaz17dGhpcy5vblB1Ymxpc2hTdWJtaXR9PlB1Ymxpc2g8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyByb3ctLXBhZGRlZCByb3ctLW5vLWJvdHRvbSBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLWNhbmNlbCcgb25DbGljaz17dGhpcy5wcm9wcy5jbGVhckZpbGV9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tc2hvcnQgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9J2ZpbmUtcHJpbnQnPkJ5IGNsaWNraW5nICdQdWJsaXNoJywgeW91IGFmZmlybSB0aGF0IHlvdSBoYXZlIHRoZSByaWdodHMgdG8gcHVibGlzaCB0aGlzIGNvbnRlbnQgdG8gdGhlIExCUlkgbmV0d29yaywgYW5kIHRoYXQgeW91IHVuZGVyc3RhbmQgdGhlIHByb3BlcnRpZXMgb2YgcHVibGlzaGluZyBpdCB0byBhIGRlY2VudHJhbGl6ZWQsIHVzZXItY29udHJvbGxlZCBuZXR3b3JrLiA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL2xicnkuaW8vbGVhcm4nPlJlYWQgbW9yZS48L2E+PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihQdWJsaXNoRGV0YWlscyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoRGV0YWlscy92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIFB1Ymxpc2hUaXRsZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlSW5wdXQgKGUpIHtcbiAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZTtcbiAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdwdWJsaXNoLXRpdGxlJyBjbGFzc05hbWU9J2lucHV0LXRleHQgdGV4dC0tbGFyZ2UgaW5wdXQtdGV4dC0tZnVsbC13aWR0aCcgbmFtZT0ndGl0bGUnIHBsYWNlaG9sZGVyPSdHaXZlIHlvdXIgcG9zdCBhIHRpdGxlLi4uJyBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gdmFsdWU9e3RoaXMucHJvcHMudGl0bGV9IC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVGl0bGVJbnB1dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3V0aWxzL3JlcXVlc3QnO1xuaW1wb3J0IFVybE1pZGRsZSBmcm9tICdjb21wb25lbnRzL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5JztcblxuY2xhc3MgUHVibGlzaFVybElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgY2xhaW0sIGZpbGVOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY2xhaW0pIHtcbiAgICAgIHRoaXMuc2V0Q2xhaW1OYW1lKGZpbGVOYW1lKTtcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAoeyBjbGFpbSwgZmlsZU5hbWUgfSkge1xuICAgIC8vIGlmIGEgbmV3IGZpbGUgd2FzIGNob3NlbiwgdXBkYXRlIHRoZSBjbGFpbSBuYW1lXG4gICAgaWYgKGZpbGVOYW1lICE9PSB0aGlzLnByb3BzLmZpbGVOYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRDbGFpbU5hbWUoZmlsZU5hbWUpO1xuICAgIH1cbiAgICAvLyBpZiB0aGUgY2xhaW0gaGFzIHVwZGF0ZWQsIGNoZWNrIGl0cyBhdmFpbGFiaWxpdHlcbiAgICBpZiAoY2xhaW0gIT09IHRoaXMucHJvcHMuY2xhaW0pIHtcbiAgICAgIHRoaXMudmFsaWRhdGVDbGFpbShjbGFpbSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGxldCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB2YWx1ZSA9IHRoaXMuY2xlYW5zZUlucHV0KHZhbHVlKTtcbiAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgdGhpcy5wcm9wcy5vbkNsYWltQ2hhbmdlKHZhbHVlKTtcbiAgfVxuICBjbGVhbnNlSW5wdXQgKGlucHV0KSB7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMrL2csICctJyk7IC8vIHJlcGxhY2Ugc3BhY2VzIHdpdGggZGFzaGVzXG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOS1dL2csICcnKTsgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgb3IgJy0nXG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIHNldENsYWltTmFtZSAoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZVdpdGhvdXRFbmRpbmcgPSBmaWxlTmFtZS5zdWJzdHJpbmcoMCwgZmlsZU5hbWUubGFzdEluZGV4T2YoJy4nKSk7XG4gICAgY29uc3QgY2xlYW5DbGFpbU5hbWUgPSB0aGlzLmNsZWFuc2VJbnB1dChmaWxlTmFtZVdpdGhvdXRFbmRpbmcpO1xuICAgIHRoaXMucHJvcHMub25DbGFpbUNoYW5nZShjbGVhbkNsYWltTmFtZSk7XG4gIH1cbiAgdmFsaWRhdGVDbGFpbSAoY2xhaW0pIHtcbiAgICBpZiAoIWNsYWltKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5vblVybEVycm9yKCdFbnRlciBhIHVybCBhYm92ZScpO1xuICAgIH1cbiAgICByZXF1ZXN0KGAvYXBpL2NsYWltL2F2YWlsYWJpbGl0eS8ke2NsYWltfWApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25VcmxFcnJvcihudWxsKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25VcmxFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBjbGFpbSwgbG9nZ2VkSW5DaGFubmVsTmFtZSwgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZCwgcHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsLCB1cmxFcnJvciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTEwIGNvbHVtbi0tc21sLTEwJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2lucHV0LXRleHQtLXByaW1hcnkgc3Bhbi0tcmVsYXRpdmUnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndXJsLXRleHQtLXNlY29uZGFyeSc+c3BlZS5jaCAvIDwvc3Bhbj5cbiAgICAgICAgICA8VXJsTWlkZGxlXG4gICAgICAgICAgICBwdWJsaXNoSW5DaGFubmVsPXtwdWJsaXNoSW5DaGFubmVsfVxuICAgICAgICAgICAgc2VsZWN0ZWRDaGFubmVsPXtzZWxlY3RlZENoYW5uZWx9XG4gICAgICAgICAgICBsb2dnZWRJbkNoYW5uZWxOYW1lPXtsb2dnZWRJbkNoYW5uZWxOYW1lfVxuICAgICAgICAgICAgbG9nZ2VkSW5DaGFubmVsU2hvcnRJZD17bG9nZ2VkSW5DaGFubmVsU2hvcnRJZH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0nY2xhaW0tbmFtZS1pbnB1dCcgY2xhc3NOYW1lPSdpbnB1dC10ZXh0JyBuYW1lPSdjbGFpbScgcGxhY2Vob2xkZXI9J3lvdXItdXJsLWhlcmUnIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fSB2YWx1ZT17Y2xhaW19IC8+XG4gICAgICAgICAgeyAoY2xhaW0gJiYgIXVybEVycm9yKSAmJiA8c3BhbiBpZD0naW5wdXQtc3VjY2Vzcy1jbGFpbS1uYW1lJyBjbGFzc05hbWU9J2luZm8tbWVzc2FnZS0tc3VjY2VzcyBzcGFuLS1hYnNvbHV0ZSc+eydcXHUyNzEzJ308L3NwYW4+IH1cbiAgICAgICAgICB7IHVybEVycm9yICYmIDxzcGFuIGlkPSdpbnB1dC1zdWNjZXNzLWNoYW5uZWwtbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUgc3Bhbi0tYWJzb2x1dGUnPnsnXFx1MjcxNid9PC9zcGFuPiB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHsgdXJsRXJyb3IgPyAoXG4gICAgICAgICAgICA8cCBpZD0naW5wdXQtZXJyb3ItY2xhaW0tbmFtZScgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPnt1cmxFcnJvcn08L3A+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz5DaG9vc2UgYSBjdXN0b20gdXJsPC9wPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoVXJsSW5wdXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVXJsSW5wdXQvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgLy8gY29udmVydCBiYXNlNjQvVVJMRW5jb2RlZCBkYXRhIGNvbXBvbmVudCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuICBsZXQgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcbiAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICBsZXQgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG4gIC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGEgdHlwZWQgYXJyYXlcbiAgbGV0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZVN0cmluZy5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gbmV3IEJsb2IoW2lhXSwge3R5cGU6IG1pbWVTdHJpbmd9KTtcbn1cblxuY2xhc3MgUHVibGlzaFRodW1ibmFpbElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB2aWRlb1NvdXJjZSAgIDogbnVsbCxcbiAgICAgIGVycm9yICAgICAgICAgOiBudWxsLFxuICAgICAgc2xpZGVyTWluUmFuZ2U6IDEsXG4gICAgICBzbGlkZXJNYXhSYW5nZTogbnVsbCxcbiAgICAgIHNsaWRlclZhbHVlICAgOiBudWxsLFxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVWaWRlb0xvYWRlZERhdGEgPSB0aGlzLmhhbmRsZVZpZGVvTG9hZGVkRGF0YS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlID0gdGhpcy5oYW5kbGVTbGlkZXJDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNyZWF0ZVRodW1ibmFpbCA9IHRoaXMuY3JlYXRlVGh1bWJuYWlsLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIGNvbnN0IHsgZmlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnNldFZpZGVvU291cmNlKGZpbGUpO1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIC8vIGlmIGZpbGUgY2hhbmdlc1xuICAgIGlmIChuZXh0UHJvcHMuZmlsZSAmJiBuZXh0UHJvcHMuZmlsZSAhPT0gdGhpcy5wcm9wcy5maWxlKSB7XG4gICAgICBjb25zdCB7IGZpbGUgfSA9IG5leHRQcm9wcztcbiAgICAgIHRoaXMuc2V0VmlkZW9Tb3VyY2UoZmlsZSk7XG4gICAgfTtcbiAgfVxuICBzZXRWaWRlb1NvdXJjZSAoZmlsZSkge1xuICAgIGNvbnN0IHByZXZpZXdSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHByZXZpZXdSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICBwcmV2aWV3UmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGFVcmkgPSBwcmV2aWV3UmVhZGVyLnJlc3VsdDtcbiAgICAgIGNvbnN0IGJsb2IgPSBkYXRhVVJJdG9CbG9iKGRhdGFVcmkpO1xuICAgICAgY29uc3QgdmlkZW9Tb3VyY2UgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpZGVvU291cmNlIH0pO1xuICAgIH07XG4gIH1cbiAgaGFuZGxlVmlkZW9Mb2FkZWREYXRhIChldmVudCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gZXZlbnQudGFyZ2V0LmR1cmF0aW9uO1xuICAgIGNvbnN0IHRvdGFsTWludXRlcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyA2MCk7XG4gICAgY29uc3QgdG90YWxTZWNvbmRzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAlIDYwKTtcbiAgICAvLyBzZXQgdGhlIHNsaWRlclxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2xpZGVyTWF4UmFuZ2U6IGR1cmF0aW9uICogMTAwLFxuICAgICAgc2xpZGVyVmFsdWUgICA6IGR1cmF0aW9uICogMTAwIC8gMixcbiAgICAgIHRvdGFsTWludXRlcyxcbiAgICAgIHRvdGFsU2Vjb25kcyxcbiAgICB9KTtcbiAgICAvLyB1cGRhdGUgdGhlIGN1cnJlbnQgdGltZSBvZiB0aGUgdmlkZW9cbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tdGh1bWItcGxheWVyJyk7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSBkdXJhdGlvbiAvIDI7XG4gIH1cbiAgaGFuZGxlU2xpZGVyQ2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAvLyB1cGRhdGUgdGhlIHNsaWRlciB2YWx1ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2xpZGVyVmFsdWU6IHZhbHVlLFxuICAgIH0pO1xuICAgIC8vIHVwZGF0ZSB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSB2aWRlb1xuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby10aHVtYi1wbGF5ZXInKTtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IHZhbHVlIC8gMTAwO1xuICB9XG4gIGNyZWF0ZVRodW1ibmFpbCAoKSB7XG4gICAgLy8gdGFrZSBhIHNuYXBzaG90XG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLXRodW1iLXBsYXllcicpO1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY29uc3QgZGF0YVVybCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICBjb25zdCBibG9iID0gZGF0YVVSSXRvQmxvYihkYXRhVXJsKTtcbiAgICBjb25zdCBzbmFwc2hvdCA9IG5ldyBGaWxlKFtibG9iXSwgYHRodW1ibmFpbC5wbmdgLCB7XG4gICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICB9KTtcbiAgICAvLyBzZXQgdGhlIHRodW1ibmFpbCBpbiByZWR1eCBzdG9yZVxuICAgIGlmIChzbmFwc2hvdCkge1xuICAgICAgdGhpcy5wcm9wcy5vbk5ld1RodW1ibmFpbChzbmFwc2hvdCk7XG4gICAgfVxuICB9XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBlcnJvciwgdmlkZW9Tb3VyY2UsIHNsaWRlck1pblJhbmdlLCBzbGlkZXJNYXhSYW5nZSwgc2xpZGVyVmFsdWUsIHRvdGFsTWludXRlcywgdG90YWxTZWNvbmRzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsYWJlbCc+VGh1bWJuYWlsOjwvbGFiZWw+XG4gICAgICAgIDx2aWRlb1xuICAgICAgICAgIGlkPSd2aWRlby10aHVtYi1wbGF5ZXInXG4gICAgICAgICAgcHJlbG9hZD0nbWV0YWRhdGEnXG4gICAgICAgICAgbXV0ZWRcbiAgICAgICAgICBzdHlsZT17e2Rpc3BsYXk6ICdub25lJ319XG4gICAgICAgICAgcGxheXNJbmxpbmVcbiAgICAgICAgICBvbkxvYWRlZERhdGE9e3RoaXMuaGFuZGxlVmlkZW9Mb2FkZWREYXRhfVxuICAgICAgICAgIHNyYz17dmlkZW9Tb3VyY2V9XG4gICAgICAgICAgb25TZWVrZWQ9e3RoaXMuY3JlYXRlVGh1bWJuYWlsfVxuICAgICAgICAvPlxuICAgICAgICB7XG4gICAgICAgICAgc2xpZGVyVmFsdWUgPyAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1jb250YWluZXItLXJvdyBmbGV4LWNvbnRhaW5lci0tc3BhY2UtYmV0d2Vlbi1jZW50ZXInIHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJz4wJzAwXCI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPnt0b3RhbE1pbnV0ZXN9J3t0b3RhbFNlY29uZHN9XCI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT0ncmFuZ2UnXG4gICAgICAgICAgICAgICAgICBtaW49e3NsaWRlck1pblJhbmdlfVxuICAgICAgICAgICAgICAgICAgbWF4PXtzbGlkZXJNYXhSYW5nZX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtzbGlkZXJWYWx1ZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nc2xpZGVyJ1xuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2xpZGVyQ2hhbmdlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT0naW5mby1tZXNzYWdlJyA+bG9hZGluZy4uLiA8L3A+XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHsgZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UtLWZhaWx1cmUnPntlcnJvcn08L3A+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPSdpbmZvLW1lc3NhZ2UnPlVzZSBzbGlkZXIgdG8gc2V0IHRodW1ibmFpbDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRodW1ibmFpbElucHV0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaFRodW1ibmFpbElucHV0L3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFeHBhbmRpbmdUZXh0QXJlYSBmcm9tICdjb21wb25lbnRzL0V4cGFuZGluZ1RleHRBcmVhJztcblxuY2xhc3MgUHVibGlzaE1ldGFkYXRhSW5wdXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMudG9nZ2xlU2hvd0lucHV0cyA9IHRoaXMudG9nZ2xlU2hvd0lucHV0cy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSW5wdXQgPSB0aGlzLmhhbmRsZUlucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3QgPSB0aGlzLmhhbmRsZVNlbGVjdC5iaW5kKHRoaXMpO1xuICB9XG4gIHRvZ2dsZVNob3dJbnB1dHMgKCkge1xuICAgIHRoaXMucHJvcHMub25Ub2dnbGVNZXRhZGF0YUlucHV0cyghdGhpcy5wcm9wcy5zaG93TWV0YWRhdGFJbnB1dHMpO1xuICB9XG4gIGhhbmRsZUlucHV0IChldmVudCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldC50eXBlID09PSAnY2hlY2tib3gnID8gdGFyZ2V0LmNoZWNrZWQgOiB0YXJnZXQudmFsdWU7XG4gICAgY29uc3QgbmFtZSA9IHRhcmdldC5uYW1lO1xuICAgIHRoaXMucHJvcHMub25NZXRhZGF0YUNoYW5nZShuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgaGFuZGxlU2VsZWN0IChldmVudCkge1xuICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbk1ldGFkYXRhQ2hhbmdlKG5hbWUsIHNlbGVjdGVkT3B0aW9uKTtcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPSdwdWJsaXNoLWRldGFpbHMnIGNsYXNzTmFtZT0ncm93IHJvdy0tcGFkZGVkIHJvdy0tbm8tdG9wIHJvdy0td2lkZSc+XG4gICAgICAgIHt0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyAmJiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCBhbGlnbi1jb250ZW50LXRvcCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdsYWJlbCc+RGVzY3JpcHRpb246PC9sYWJlbD5cbiAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTcgY29sdW1uLS1zbWwtMTAnPlxuICAgICAgICAgICAgICAgIDxFeHBhbmRpbmdUZXh0QXJlYVxuICAgICAgICAgICAgICAgICAgaWQ9J3B1Ymxpc2gtZGVzY3JpcHRpb24nXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3RleHRhcmVhIHRleHRhcmVhLS1wcmltYXJ5IHRleHRhcmVhLS1mdWxsLXdpZHRoJ1xuICAgICAgICAgICAgICAgICAgcm93cz17MX1cbiAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17MjAwMH1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG1heEhlaWdodDogMjAwIH19XG4gICAgICAgICAgICAgICAgICBuYW1lPSdkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSdPcHRpb25hbCBkZXNjcmlwdGlvbidcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSW5wdXR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS1uby10b3AnPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tMyBjb2x1bW4tLW1lZC0xMCc+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J3B1Ymxpc2gtbGljZW5zZScgY2xhc3NOYW1lPSdsYWJlbCc+TGljZW5zZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyBjb2x1bW4tLXNtbC0xMCc+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCB0eXBlPSd0ZXh0JyBuYW1lPSdsaWNlbnNlJyBpZD0ncHVibGlzaC1saWNlbnNlJyBjbGFzc05hbWU9J3NlbGVjdCBzZWxlY3QtLXByaW1hcnknIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVNlbGVjdH0+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPScgJz5VbnNwZWNpZmllZDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nUHVibGljIERvbWFpbic+UHVibGljIERvbWFpbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nQ3JlYXRpdmUgQ29tbW9ucyc+Q3JlYXRpdmUgQ29tbW9uczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IHJvdy0tbm8tdG9wJz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbHVtbiBjb2x1bW4tLTMnPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdwdWJsaXNoLW5zZncnIGNsYXNzTmFtZT0nbGFiZWwnPk1hdHVyZTo8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj48ZGl2IGNsYXNzTmFtZT0nY29sdW1uIGNvbHVtbi0tNyc+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0naW5wdXQtY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94JyBpZD0ncHVibGlzaC1uc2Z3JyBuYW1lPSduc2Z3JyB2YWx1ZT17dGhpcy5wcm9wcy5uc2Z3fSBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbi0tc2Vjb25kYXJ5JyBvbkNsaWNrPXt0aGlzLnRvZ2dsZVNob3dJbnB1dHN9Pnt0aGlzLnByb3BzLnNob3dNZXRhZGF0YUlucHV0cyA/ICdsZXNzJyA6ICdtb3JlJ308L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaE1ldGFkYXRhSW5wdXRzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaE1ldGFkYXRhSW5wdXRzL3ZpZXcuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHVibGlzaERpc2FibGVkTWVzc2FnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IHRoaXMucHJvcHMubWVzc2FnZTtcbiAgICBjb25zb2xlLmxvZygndGhpcy5wcm9wcy5tZXNzYWdlOicsIG1lc3NhZ2UpO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGRyb3B6b25lLS1kaXNhYmxlZCByb3ctLXRhbGwgZmxleC1jb250YWluZXItLWNvbHVtbiBmbGV4LWNvbnRhaW5lci0tY2VudGVyLWNlbnRlcic+XG4gICAgICAgIDxwIGNsYXNzTmFtZT0ndGV4dC0tZGlzYWJsZWQnPlB1Ymxpc2hpbmcgaXMgY3VycmVudGx5IGRpc2FibGVkLjwvcD5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LS1kaXNhYmxlZCc+e21lc3NhZ2V9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZS92aWV3LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnY29tcG9uZW50cy9Qcm9ncmVzc0Jhcic7XG5pbXBvcnQgKiBhcyBwdWJsaXNoU3RhdGVzIGZyb20gJ2NvbnN0YW50cy9wdWJsaXNoX2NsYWltX3N0YXRlcyc7XG5cbmNsYXNzIFB1Ymxpc2hTdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBtZXNzYWdlLCBjbGVhckZpbGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgcm93LS10YWxsIGZsZXgtY29udGFpbmVyLS1jb2x1bW4gZmxleC1jb250YWluZXItLWNlbnRlci1jZW50ZXInPlxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURfU1RBUlQgJiZcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3JvdyBhbGlnbi1jb250ZW50LWNlbnRlcic+XG4gICAgICAgICAgPHA+RmlsZSBpcyBsb2FkaW5nIHRvIHNlcnZlcjwvcD5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPjAlPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICB7c3RhdHVzID09PSBwdWJsaXNoU3RhdGVzLkxPQURJTkcgJiZcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGFsaWduLWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgICAgIDxwPkZpbGUgaXMgbG9hZGluZyB0byBzZXJ2ZXI8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9J2JsdWUnPnttZXNzYWdlfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5QVUJMSVNISU5HICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlVwbG9hZCBjb21wbGV0ZS4gIFlvdXIgZmlsZSBpcyBub3cgYmVpbmcgcHVibGlzaGVkIG9uIHRoZSBibG9ja2NoYWluLi4uPC9wPlxuICAgICAgICAgIDxQcm9ncmVzc0JhciBzaXplPXsxMn0gLz5cbiAgICAgICAgICA8cD5DdXJpb3VzIHdoYXQgbWFnaWMgaXMgaGFwcGVuaW5nIGhlcmU/IDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgdGFyZ2V0PSdibGFuaycgaHJlZj0naHR0cHM6Ly9sYnJ5LmlvL2ZhcS93aGF0LWlzLWxicnknPkxlYXJuIG1vcmUuPC9hPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAge3N0YXR1cyA9PT0gcHVibGlzaFN0YXRlcy5TVUNDRVNTICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPllvdXIgcHVibGlzaCBpcyBjb21wbGV0ZSEgWW91IGFyZSBiZWluZyByZWRpcmVjdGVkIHRvIGl0IG5vdy48L3A+XG4gICAgICAgICAgPHA+SWYgeW91IGFyZSBub3QgYXV0b21hdGljYWxseSByZWRpcmVjdGVkLCA8YSBjbGFzc05hbWU9J2xpbmstLXByaW1hcnknIHRhcmdldD0nX2JsYW5rJyBocmVmPXttZXNzYWdlfT5jbGljayBoZXJlLjwvYT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIHtzdGF0dXMgPT09IHB1Ymxpc2hTdGF0ZXMuRkFJTEVEICYmXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cgYWxpZ24tY29udGVudC1jZW50ZXInPlxuICAgICAgICAgIDxwPlNvbWV0aGluZyB3ZW50IHdyb25nLi4uPC9wPlxuICAgICAgICAgIDxwPjxzdHJvbmc+e21lc3NhZ2V9PC9zdHJvbmc+PC9wPlxuICAgICAgICAgIDxwPkZvciBoZWxwLCBwb3N0IHRoZSBhYm92ZSBlcnJvciB0ZXh0IGluIHRoZSAjc3BlZWNoIGNoYW5uZWwgb24gdGhlIDxhIGNsYXNzTmFtZT0nbGluay0tcHJpbWFyeScgaHJlZj0naHR0cHM6Ly9kaXNjb3JkLmdnL1lqWWJ3aFMnIHRhcmdldD0nX2JsYW5rJz5sYnJ5IGRpc2NvcmQ8L2E+PC9wPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24tLXNlY29uZGFyeScgb25DbGljaz17Y2xlYXJGaWxlfT5SZXNldDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFN0YXR1cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb250YWluZXJzL1B1Ymxpc2hTdGF0dXMvdmlldy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ2NvbnRhaW5lcnMvRHJvcHpvbmUnO1xuaW1wb3J0IFB1Ymxpc2hEZXRhaWxzIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERldGFpbHMnO1xuaW1wb3J0IFB1Ymxpc2hTdGF0dXMgZnJvbSAnY29udGFpbmVycy9QdWJsaXNoU3RhdHVzJztcbmltcG9ydCBQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIGZyb20gJ2NvbnRhaW5lcnMvUHVibGlzaERpc2FibGVkTWVzc2FnZSc7XG5cbmNsYXNzIFB1Ymxpc2hUb29sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2ggaXMgZGlzYWJsZWQnKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxQdWJsaXNoRGlzYWJsZWRNZXNzYWdlIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygncHVibGlzaCBpcyBub3QgZGlzYWJsZWQnKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmZpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc3RhdHVzKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxQdWJsaXNoU3RhdHVzIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gPFB1Ymxpc2hEZXRhaWxzIC8+O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gPERyb3B6b25lIC8+O1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaFRvb2w7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29udGFpbmVycy9QdWJsaXNoVG9vbC92aWV3LmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnRcIlxuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gTXlzcWxDb25maWcgKCkge1xuICB0aGlzLmRhdGFiYXNlID0gJ2RlZmF1bHQnO1xuICB0aGlzLnVzZXJuYW1lID0gJ2RlZmF1bHQnO1xuICB0aGlzLnBhc3N3b3JkID0gJ2RlZmF1bHQnO1xuICB0aGlzLmNvbmZpZ3VyZSA9IChjb25maWcpID0+IHtcbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdObyBNeVNRTCBjb25maWcgcmVjZWl2ZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHtkYXRhYmFzZSwgdXNlcm5hbWUsIHBhc3N3b3JkfSA9IGNvbmZpZztcbiAgICB0aGlzLmRhdGFiYXNlID0gZGF0YWJhc2U7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IE15c3FsQ29uZmlnKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb25maWcvbXlzcWxDb25maWcuanMiLCJmdW5jdGlvbiBTbGFja0NvbmZpZyAoKSB7XG4gIHRoaXMuc2xhY2tXZWJIb29rICAgICAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSAnZGVmYXVsdCc7XG4gIHRoaXMuc2xhY2tJbmZvQ2hhbm5lbCAgPSAnZGVmYXVsdCc7XG4gIHRoaXMuY29uZmlndXJlID0gKGNvbmZpZykgPT4ge1xuICAgIGlmICghY29uZmlnKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNsYWNrIGNvbmZpZyByZWNlaXZlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qge3NsYWNrV2ViSG9vaywgc2xhY2tFcnJvckNoYW5uZWwsIHNsYWNrSW5mb0NoYW5uZWx9ID0gY29uZmlnO1xuICAgIHRoaXMuc2xhY2tXZWJIb29rID0gc2xhY2tXZWJIb29rO1xuICAgIHRoaXMuc2xhY2tFcnJvckNoYW5uZWwgPSBzbGFja0Vycm9yQ2hhbm5lbDtcbiAgICB0aGlzLnNsYWNrSW5mb0NoYW5uZWwgPSBzbGFja0luZm9DaGFubmVsO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU2xhY2tDb25maWcoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbmZpZy9zbGFja0NvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGFzc3BvcnQtbG9jYWxcIlxuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5TaG9ydElkOiBmdW5jdGlvbiAoY2xhaW1zQXJyYXksIGxvbmdJZCkge1xuICAgIGxldCBjbGFpbUluZGV4O1xuICAgIGxldCBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCAxKTsgLy8gZGVmYXVsdCBzaG9ydCBpZCBpcyB0aGUgZmlyc3QgbGV0dGVyXG4gICAgbGV0IHNob3J0SWRMZW5ndGggPSAwO1xuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoaXMgY2xhaW0gaWRcbiAgICBjbGFpbUluZGV4ID0gY2xhaW1zQXJyYXkuZmluZEluZGV4KGVsZW1lbnQgPT4ge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhaW1JZCA9PT0gbG9uZ0lkO1xuICAgIH0pO1xuICAgIGlmIChjbGFpbUluZGV4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGFpbSBpZCBub3QgZm91bmQgaW4gY2xhaW1zIGxpc3QnKTtcbiAgICB9XG4gICAgLy8gZ2V0IGFuIGFycmF5IG9mIGFsbCBjbGFpbXMgd2l0aCBsb3dlciBoZWlnaHRcbiAgICBsZXQgcG9zc2libGVNYXRjaGVzID0gY2xhaW1zQXJyYXkuc2xpY2UoMCwgY2xhaW1JbmRleCk7XG4gICAgLy8gcmVtb3ZlIGNlcnRpZmljYXRlcyB3aXRoIHRoZSBzYW1lIHByZWZpeGVzIHVudGlsIG5vbmUgYXJlIGxlZnQuXG4gICAgd2hpbGUgKHBvc3NpYmxlTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzaG9ydElkTGVuZ3RoICs9IDE7XG4gICAgICBzaG9ydElkID0gbG9uZ0lkLnN1YnN0cmluZygwLCBzaG9ydElkTGVuZ3RoKTtcbiAgICAgIHBvc3NpYmxlTWF0Y2hlcyA9IHBvc3NpYmxlTWF0Y2hlcy5maWx0ZXIoZWxlbWVudCA9PiB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5jbGFpbUlkICYmIChlbGVtZW50LmNsYWltSWQuc3Vic3RyaW5nKDAsIHNob3J0SWRMZW5ndGgpID09PSBzaG9ydElkKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3J0SWQ7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgeyBkZXRhaWxzLCBwdWJsaXNoaW5nIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEJvZHkgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0pIHtcbiAgICAvLyB2YWxpZGF0ZSBuYW1lXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG5hbWUgZmllbGQgZm91bmQgaW4gcmVxdWVzdCcpO1xuICAgIH1cbiAgICBjb25zdCBpbnZhbGlkTmFtZUNoYXJhY3RlcnMgPSAvW15BLVphLXowLTksLV0vLmV4ZWMobmFtZSk7XG4gICAgaWYgKGludmFsaWROYW1lQ2hhcmFjdGVycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2xhaW0gbmFtZSB5b3UgcHJvdmlkZWQgaXMgbm90IGFsbG93ZWQuICBPbmx5IHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyBhcmUgYWxsb3dlZDogQS1aLCBhLXosIDAtOSwgYW5kIFwiLVwiJyk7XG4gICAgfVxuICAgIC8vIG9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICBuc2Z3ID0gKG5zZncgPT09ICd0cnVlJyk7XG4gICAgbGljZW5zZSA9IGxpY2Vuc2UgfHwgbnVsbDtcbiAgICB0aXRsZSA9IHRpdGxlIHx8IG51bGw7XG4gICAgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiB8fCBudWxsO1xuICAgIHRodW1ibmFpbCA9IHRodW1ibmFpbCB8fCBudWxsO1xuICAgIC8vIHJldHVybiByZXN1bHRzXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICBuc2Z3LFxuICAgICAgbGljZW5zZSxcbiAgICAgIHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICB0aHVtYm5haWwsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzICh7ZmlsZSwgdGh1bWJuYWlsfSkge1xuICAgIC8vIG1ha2Ugc3VyZSBhIGZpbGUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgd2l0aCBrZXkgb2YgW2ZpbGVdIGZvdW5kIGluIHJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKCFmaWxlLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZmlsZSBwYXRoIGZvdW5kJyk7XG4gICAgfVxuICAgIGlmICghZmlsZS50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGZpbGUgdHlwZSBmb3VuZCcpO1xuICAgIH1cbiAgICBpZiAoIWZpbGUuc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBmaWxlIHR5cGUgZm91bmQnKTtcbiAgICB9XG4gICAgLy8gdmFsaWRhdGUgdGhlIGZpbGUgbmFtZVxuICAgIGlmICgvJy8udGVzdChmaWxlLm5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fwb3N0cm9waGVzIGFyZSBub3QgYWxsb3dlZCBpbiB0aGUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIC8vIHZhbGlkYXRlIHRoZSBmaWxlXG4gICAgbW9kdWxlLmV4cG9ydHMudmFsaWRhdGVGaWxlVHlwZUFuZFNpemUoZmlsZSk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdHNcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZU5hbWUgICAgICAgICA6IGZpbGUubmFtZSxcbiAgICAgIGZpbGVQYXRoICAgICAgICAgOiBmaWxlLnBhdGgsXG4gICAgICBmaWxlVHlwZSAgICAgICAgIDogZmlsZS50eXBlLFxuICAgICAgdGh1bWJuYWlsRmlsZU5hbWU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwubmFtZSA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVBhdGg6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwucGF0aCA6IG51bGwpLFxuICAgICAgdGh1bWJuYWlsRmlsZVR5cGU6ICh0aHVtYm5haWwgPyB0aHVtYm5haWwudHlwZSA6IG51bGwpLFxuICAgIH07XG4gIH0sXG4gIHZhbGlkYXRlRmlsZVR5cGVBbmRTaXplIChmaWxlKSB7XG4gICAgLy8gY2hlY2sgZmlsZSB0eXBlIGFuZCBzaXplXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgICAgY2FzZSAnaW1hZ2UvanBnJzpcbiAgICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICAgIGlmIChmaWxlLnNpemUgPiAxMDAwMDAwMCkge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygncHVibGlzaCA+IGZpbGUgdmFsaWRhdGlvbiA+IC5qcGVnLy5qcGcvLnBuZyB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIGltYWdlcyBhcmUgbGltaXRlZCB0byAxMCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICBpZiAoZmlsZS5zaXplID4gNTAwMDAwMDApIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiAuZ2lmIHdhcyB0b28gYmlnJyk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3JyeSwgLmdpZnMgYXJlIGxpbWl0ZWQgdG8gNTAgbWVnYWJ5dGVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndmlkZW8vbXA0JzpcbiAgICAgICAgaWYgKGZpbGUuc2l6ZSA+IDUwMDAwMDAwKSB7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdwdWJsaXNoID4gZmlsZSB2YWxpZGF0aW9uID4gLm1wNCB3YXMgdG9vIGJpZycpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU29ycnksIHZpZGVvcyBhcmUgbGltaXRlZCB0byA1MCBtZWdhYnl0ZXMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuZGVidWcoJ3B1Ymxpc2ggPiBmaWxlIHZhbGlkYXRpb24gPiB1bnJlY29nbml6ZWQgZmlsZSB0eXBlJyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICcgKyBmaWxlLnR5cGUgKyAnIGNvbnRlbnQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiAgT25seSwgLmpwZWcsIC5wbmcsIC5naWYsIGFuZCAubXA0IGZpbGVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLicpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbiAgfSxcbiAgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zIChmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpIHtcbiAgICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIFB1Ymxpc2ggUGFyYW1ldGVyc2ApO1xuICAgIC8vIHByb3ZpZGUgZGVmYXVsdHMgZm9yIHRpdGxlXG4gICAgaWYgKHRpdGxlID09PSBudWxsIHx8IHRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRpdGxlID0gbmFtZTtcbiAgICB9XG4gICAgLy8gcHJvdmlkZSBkZWZhdWx0IGZvciBkZXNjcmlwdGlvblxuICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCBkZXNjcmlwdGlvbi50cmltKCkgPT09ICcnKSB7XG4gICAgICBkZXNjcmlwdGlvbiA9ICcnO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIGRlZmF1bHQgZm9yIGxpY2Vuc2VcbiAgICBpZiAobGljZW5zZSA9PT0gbnVsbCB8fCBsaWNlbnNlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIGxpY2Vuc2UgPSAnICc7ICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZ1xuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIHB1Ymxpc2ggcGFyYW1zXG4gICAgY29uc3QgcHVibGlzaFBhcmFtcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBmaWxlX3BhdGg6IGZpbGVQYXRoLFxuICAgICAgYmlkICAgICAgOiAwLjAxLFxuICAgICAgbWV0YWRhdGEgOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgYXV0aG9yICA6IGRldGFpbHMudGl0bGUsXG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICBsaWNlbnNlLFxuICAgICAgICBuc2Z3LFxuICAgICAgfSxcbiAgICAgIGNsYWltX2FkZHJlc3M6IHB1Ymxpc2hpbmcucHJpbWFyeUNsYWltQWRkcmVzcyxcbiAgICB9O1xuICAgIC8vIGFkZCB0aHVtYm5haWwgdG8gY2hhbm5lbCBpZiB2aWRlb1xuICAgIGlmICh0aHVtYm5haWwpIHtcbiAgICAgIHB1Ymxpc2hQYXJhbXNbJ21ldGFkYXRhJ11bJ3RodW1ibmFpbCddID0gdGh1bWJuYWlsO1xuICAgIH1cbiAgICByZXR1cm4gcHVibGlzaFBhcmFtcztcbiAgfSxcbiAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyAodGh1bWJuYWlsRmlsZVBhdGgsIGNsYWltTmFtZSwgbGljZW5zZSwgbnNmdykge1xuICAgIGlmICghdGh1bWJuYWlsRmlsZVBhdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBUaHVtYm5haWwgUHVibGlzaCBQYXJhbWV0ZXJzYCk7XG4gICAgLy8gY3JlYXRlIHRoZSBwdWJsaXNoIHBhcmFtc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lICAgICA6IGAke2NsYWltTmFtZX0tdGh1bWJgLFxuICAgICAgZmlsZV9wYXRoOiB0aHVtYm5haWxGaWxlUGF0aCxcbiAgICAgIGJpZCAgICAgIDogMC4wMSxcbiAgICAgIG1ldGFkYXRhIDoge1xuICAgICAgICB0aXRsZSAgICAgIDogYCR7Y2xhaW1OYW1lfSB0aHVtYm5haWxgLFxuICAgICAgICBkZXNjcmlwdGlvbjogYGEgdGh1bWJuYWlsIGZvciAke2NsYWltTmFtZX1gLFxuICAgICAgICBhdXRob3IgICAgIDogZGV0YWlscy50aXRsZSxcbiAgICAgICAgbGFuZ3VhZ2UgICA6ICdlbicsXG4gICAgICAgIGxpY2Vuc2UsXG4gICAgICAgIG5zZncsXG4gICAgICB9LFxuICAgICAgY2xhaW1fYWRkcmVzczogcHVibGlzaGluZy5wcmltYXJ5Q2xhaW1BZGRyZXNzLFxuICAgICAgY2hhbm5lbF9uYW1lIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsLFxuICAgICAgY2hhbm5lbF9pZCAgIDogcHVibGlzaGluZy50aHVtYm5haWxDaGFubmVsSWQsXG4gICAgfTtcbiAgfSxcbiAgZGVsZXRlVGVtcG9yYXJ5RmlsZSAoZmlsZVBhdGgpIHtcbiAgICBmcy51bmxpbmsoZmlsZVBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgZXJyb3IgZGVsZXRpbmcgdGVtcG9yYXJ5IGZpbGUgJHtmaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKGBzdWNjZXNzZnVsbHkgZGVsZXRlZCAke2ZpbGVQYXRofWApO1xuICAgIH0pO1xuICB9LFxuICBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSAoZmlsZUluZm8sIGdldFJlc3VsdCkge1xuICAgIGZpbGVJbmZvLmZpbGVOYW1lID0gZ2V0UmVzdWx0LmZpbGVfbmFtZTtcbiAgICBmaWxlSW5mby5maWxlUGF0aCA9IGdldFJlc3VsdC5kb3dubG9hZF9wYXRoO1xuICAgIHJldHVybiBmaWxlSW5mbztcbiAgfSxcbiAgY3JlYXRlRmlsZURhdGEgKHsgbmFtZSwgY2xhaW1JZCwgb3V0cG9pbnQsIGhlaWdodCwgYWRkcmVzcywgbnNmdywgY29udGVudFR5cGUgfSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgY2xhaW1JZCxcbiAgICAgIG91dHBvaW50LFxuICAgICAgaGVpZ2h0LFxuICAgICAgYWRkcmVzcyxcbiAgICAgIGZpbGVOYW1lOiAnJyxcbiAgICAgIGZpbGVQYXRoOiAnJyxcbiAgICAgIGZpbGVUeXBlOiBjb250ZW50VHlwZSxcbiAgICAgIG5zZncsXG4gICAgfTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9wdWJsaXNoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlRXJyb3JSZXNwb25zZTogZnVuY3Rpb24gKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcykge1xuICAgIGxvZ2dlci5lcnJvcihgRXJyb3Igb24gJHtvcmlnaW5hbFVybH1gLCBtb2R1bGUuZXhwb3J0cy51c2VPYmplY3RQcm9wZXJ0aWVzSWZOb0tleXMoZXJyb3IpKTtcbiAgICBjb25zdCBbc3RhdHVzLCBtZXNzYWdlXSA9IG1vZHVsZS5leHBvcnRzLnJldHVybkVycm9yTWVzc2FnZUFuZFN0YXR1cyhlcnJvcik7XG4gICAgcmVzXG4gICAgICAuc3RhdHVzKHN0YXR1cylcbiAgICAgIC5qc29uKG1vZHVsZS5leHBvcnRzLmNyZWF0ZUVycm9yUmVzcG9uc2VQYXlsb2FkKHN0YXR1cywgbWVzc2FnZSkpO1xuICB9LFxuICByZXR1cm5FcnJvck1lc3NhZ2VBbmRTdGF0dXM6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgIGxldCBzdGF0dXMsIG1lc3NhZ2U7XG4gICAgLy8gY2hlY2sgZm9yIGRhZW1vbiBiZWluZyB0dXJuZWQgb2ZmXG4gICAgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBzdGF0dXMgPSA1MDM7XG4gICAgICBtZXNzYWdlID0gJ0Nvbm5lY3Rpb24gcmVmdXNlZC4gIFRoZSBkYWVtb24gbWF5IG5vdCBiZSBydW5uaW5nLic7XG4gICAgICAvLyBmYWxsYmFjayBmb3IgZXZlcnl0aGluZyBlbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXR1cyA9IDQwMDtcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBbc3RhdHVzLCBtZXNzYWdlXTtcbiAgfSxcbiAgdXNlT2JqZWN0UHJvcGVydGllc0lmTm9LZXlzOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID09PSAwKSB7XG4gICAgICBsZXQgbmV3RXJyb3JPYmplY3QgPSB7fTtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIG5ld0Vycm9yT2JqZWN0W2tleV0gPSBlcnJba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ld0Vycm9yT2JqZWN0O1xuICAgIH1cbiAgICByZXR1cm4gZXJyO1xuICB9LFxuICBjcmVhdGVFcnJvclJlc3BvbnNlUGF5bG9hZCAoc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2Vycm9ySGFuZGxlcnMuanMiLCJjb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NoYW5uZWxQYWdpbmF0aW9uLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5jb25zdCBOT19GSUxFID0gJ05PX0ZJTEUnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q2xhaW1JZCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBuYW1lLCBjbGFpbUlkKSB7XG4gICAgaWYgKGNoYW5uZWxOYW1lKSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2hhbm5lbChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMuZ2V0Q2xhaW1JZEJ5Q2xhaW0obmFtZSwgY2xhaW1JZCk7XG4gICAgfVxuICB9LFxuICBnZXRDbGFpbUlkQnlDbGFpbSAoY2xhaW1OYW1lLCBjbGFpbUlkKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRDbGFpbUlkQnlDbGFpbSgke2NsYWltTmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNsYWltLmdldExvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NsYWltSWQgPT4ge1xuICAgICAgICAgIGlmICghbG9uZ0NsYWltSWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoTk9fQ0xBSU0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKGxvbmdDbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0Q2xhaW1JZEJ5Q2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldENsYWltSWRCeUNoYW5uZWwoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9LCAke2NsYWltTmFtZX0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRiLkNlcnRpZmljYXRlLmdldExvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKSAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBpZFxuICAgICAgICAudGhlbihsb25nQ2hhbm5lbElkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxJZCwgZGIuQ2xhaW0uZ2V0Q2xhaW1JZEJ5TG9uZ0NoYW5uZWxJZChsb25nQ2hhbm5lbElkLCBjbGFpbU5hbWUpXSk7ICAvLyAyLiBnZXQgdGhlIGxvbmcgY2xhaW0gaWRcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbElkLCBsb25nQ2xhaW1JZF0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWxvbmdDbGFpbUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShOT19DTEFJTSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUobG9uZ0NsYWltSWQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXRDaGFubmVsRGF0YSAoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBwYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIDEuIGdldCB0aGUgbG9uZyBjaGFubmVsIElkIChtYWtlIHN1cmUgY2hhbm5lbCBleGlzdHMpXG4gICAgICBkYi5DZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZClcbiAgICAgICAgLnRoZW4obG9uZ0NoYW5uZWxDbGFpbUlkID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIFtudWxsLCBudWxsLCBudWxsXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gMi4gZ2V0IHRoZSBzaG9ydCBJRCBhbmQgYWxsIGNsYWltcyBmb3IgdGhhdCBjaGFubmVsXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsb25nQ2hhbm5lbENsYWltSWQsIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQobG9uZ0NoYW5uZWxDbGFpbUlkLCBjaGFubmVsTmFtZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIHNob3J0Q2hhbm5lbENsYWltSWRdKSA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKE5PX0NIQU5ORUwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAzLiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSxcbiAgICAgICAgICAgIGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0Q2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldENoYW5uZWxDbGFpbXMgKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgcGFnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyAxLiBnZXQgdGhlIGxvbmcgY2hhbm5lbCBJZCAobWFrZSBzdXJlIGNoYW5uZWwgZXhpc3RzKVxuICAgICAgZGIuQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpXG4gICAgICAgIC50aGVuKGxvbmdDaGFubmVsQ2xhaW1JZCA9PiB7XG4gICAgICAgICAgaWYgKCFsb25nQ2hhbm5lbENsYWltSWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbbnVsbCwgbnVsbCwgbnVsbF07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDIuIGdldCB0aGUgc2hvcnQgSUQgYW5kIGFsbCBjbGFpbXMgZm9yIHRoYXQgY2hhbm5lbFxuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbG9uZ0NoYW5uZWxDbGFpbUlkLCBkYi5DbGFpbS5nZXRBbGxDaGFubmVsQ2xhaW1zKGxvbmdDaGFubmVsQ2xhaW1JZCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKFtsb25nQ2hhbm5lbENsYWltSWQsIGNoYW5uZWxDbGFpbXNBcnJheV0pID0+IHtcbiAgICAgICAgICBpZiAoIWxvbmdDaGFubmVsQ2xhaW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoTk9fQ0hBTk5FTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIDMuIGZvcm1hdCB0aGUgZGF0YSBmb3IgdGhlIHZpZXcsIGluY2x1ZGluZyBwYWdpbmF0aW9uXG4gICAgICAgICAgbGV0IHBhZ2luYXRlZENoYW5uZWxWaWV3RGF0YSA9IHJldHVyblBhZ2luYXRlZENoYW5uZWxDbGFpbXMoY2hhbm5lbE5hbWUsIGxvbmdDaGFubmVsQ2xhaW1JZCwgY2hhbm5lbENsYWltc0FycmF5LCBwYWdlKTtcbiAgICAgICAgICAvLyA0LiByZXR1cm4gYWxsIHRoZSBjaGFubmVsIGluZm9ybWF0aW9uIGFuZCBjb250ZW50c1xuICAgICAgICAgIHJlc29sdmUocGFnaW5hdGVkQ2hhbm5lbFZpZXdEYXRhKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0TG9jYWxGaWxlUmVjb3JkIChjbGFpbUlkLCBuYW1lKSB7XG4gICAgcmV0dXJuIGRiLkZpbGUuZmluZE9uZSh7d2hlcmU6IHtjbGFpbUlkLCBuYW1lfX0pXG4gICAgICAudGhlbihmaWxlID0+IHtcbiAgICAgICAgaWYgKCFmaWxlKSB7XG4gICAgICAgICAgcmV0dXJuIE5PX0ZJTEU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbGUuZGF0YVZhbHVlcztcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9zZXJ2ZUNvbnRyb2xsZXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFJlZHVjZXIgZnJvbSAnY2xpZW50L3JlZHVjZXJzJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgR0FMaXN0ZW5lciBmcm9tICdjbGllbnQvY29tcG9uZW50cy9HQUxpc3RlbmVyLyc7XG5pbXBvcnQgQXBwIGZyb20gJ2NsaWVudC9hcHAnO1xuaW1wb3J0IHJlbmRlckZ1bGxQYWdlIGZyb20gJy4vcmVuZGVyRnVsbFBhZ2UuanMnO1xuaW1wb3J0IEhlbG1ldCBmcm9tICdyZWFjdC1oZWxtZXQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZXEsIHJlcykgPT4ge1xuICBsZXQgY29udGV4dCA9IHt9O1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBSZWR1eCBzdG9yZSBpbnN0YW5jZVxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFJlZHVjZXIpO1xuXG4gIC8vIHJlbmRlciBjb21wb25lbnQgdG8gYSBzdHJpbmdcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxHQUxpc3RlbmVyPlxuICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgPC9HQUxpc3RlbmVyPlxuICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcblxuICAvLyBnZXQgaGVhZCB0YWdzIGZyb20gaGVsbWV0XG4gIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAvLyBjaGVjayBmb3IgYSByZWRpcmVjdFxuICBpZiAoY29udGV4dC51cmwpIHtcbiAgICAvLyBTb21ld2hlcmUgYSBgPFJlZGlyZWN0PmAgd2FzIHJlbmRlcmVkXG4gICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDEsIGNvbnRleHQudXJsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB3ZSdyZSBnb29kLCBzZW5kIHRoZSByZXNwb25zZVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBpbml0aWFsIHN0YXRlIGZyb20gb3VyIFJlZHV4IHN0b3JlXG4gIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAvLyBzZW5kIHRoZSByZW5kZXJlZCBwYWdlIGJhY2sgdG8gdGhlIGNsaWVudFxuICByZXMuc2VuZChyZW5kZXJGdWxsUGFnZShoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvaGFuZGxlUGFnZVJlbmRlci5qc3giLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IFB1Ymxpc2hSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3B1Ymxpc2gnO1xuaW1wb3J0IENoYW5uZWxSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL2NoYW5uZWwnO1xuaW1wb3J0IFNob3dSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3Nob3cnO1xuaW1wb3J0IFNpdGVSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzL3NpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuICBjaGFubmVsOiBDaGFubmVsUmVkdWNlcixcbiAgcHVibGlzaDogUHVibGlzaFJlZHVjZXIsXG4gIHNob3cgICA6IFNob3dSZWR1Y2VyLFxuICBzaXRlICAgOiBTaXRlUmVkdWNlcixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEZJTEVfU0VMRUNURUQgPSAnRklMRV9TRUxFQ1RFRCc7XG5leHBvcnQgY29uc3QgRklMRV9DTEVBUiA9ICdGSUxFX0NMRUFSJztcbmV4cG9ydCBjb25zdCBNRVRBREFUQV9VUERBVEUgPSAnTUVUQURBVEFfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBDTEFJTV9VUERBVEUgPSAnQ0xBSU1fVVBEQVRFJztcbmV4cG9ydCBjb25zdCBTRVRfUFVCTElTSF9JTl9DSEFOTkVMID0gJ1NFVF9QVUJMSVNIX0lOX0NIQU5ORUwnO1xuZXhwb3J0IGNvbnN0IFBVQkxJU0hfU1RBVFVTX1VQREFURSA9ICdQVUJMSVNIX1NUQVRVU19VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEVSUk9SX1VQREFURSA9ICdFUlJPUl9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFID0gJ1NFTEVDVEVEX0NIQU5ORUxfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBUT0dHTEVfTUVUQURBVEFfSU5QVVRTID0gJ1RPR0dMRV9NRVRBREFUQV9JTlBVVFMnO1xuZXhwb3J0IGNvbnN0IFRIVU1CTkFJTF9ORVcgPSAnVEhVTUJOQUlMX05FVyc7XG5leHBvcnQgY29uc3QgUFVCTElTSF9TVEFSVCA9ICdQVUJMSVNIX1NUQVJUJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9jb25zdGFudHMvcHVibGlzaF9hY3Rpb25fdHlwZXMuanMiLCJleHBvcnQgY29uc3QgTE9HSU4gPSAnRXhpc3RpbmcnO1xuZXhwb3J0IGNvbnN0IENSRUFURSA9ICdOZXcnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9wdWJsaXNoX2NoYW5uZWxfc2VsZWN0X3N0YXRlcy5qcyIsImV4cG9ydCBjb25zdCBDSEFOTkVMX1VQREFURSA9ICdDSEFOTkVMX1VQREFURSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL2NoYW5uZWxfYWN0aW9uX3R5cGVzLmpzIiwiZXhwb3J0IGNvbnN0IExPQ0FMX0NIRUNLID0gJ0xPQ0FMX0NIRUNLJztcbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRSA9ICdVTkFWQUlMQUJMRSc7XG5leHBvcnQgY29uc3QgRVJST1IgPSAnRVJST1InO1xuZXhwb3J0IGNvbnN0IEFWQUlMQUJMRSA9ICdBVkFJTEFCTEUnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9hc3NldF9kaXNwbGF5X3N0YXRlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSb3V0ZSwgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBkeW5hbWljSW1wb3J0IH0gZnJvbSAndXRpbHMvZHluYW1pY0ltcG9ydCc7XG5pbXBvcnQgQWJvdXRQYWdlIGZyb20gJ3BhZ2VzL0Fib3V0UGFnZSc7XG5pbXBvcnQgTG9naW5QYWdlIGZyb20gJ3BhZ2VzL0xvZ2luUGFnZSc7XG5pbXBvcnQgU2hvd1BhZ2UgZnJvbSAncGFnZXMvU2hvd1BhZ2UnO1xuaW1wb3J0IEZvdXJPaEZvdXJQYWdlIGZyb20gJ2NvbnRhaW5lcnMvRm91ck9oRm91clBhZ2UnO1xuY29uc3QgSG9tZVBhZ2UgPSBkeW5hbWljSW1wb3J0KCdwYWdlcy9Ib21lUGFnZScpOyAvLyBvciB1c2UgdGhlIHByb3ZpZGVkIGxvY2FsIGhvbWVwYWdlXG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3dpdGNoPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17SG9tZVBhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2Fib3V0JyBjb21wb25lbnQ9e0Fib3V0UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvbG9naW4nIGNvbXBvbmVudD17TG9naW5QYWdlfSAvPlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy86aWRlbnRpZmllci86Y2xhaW0nIGNvbXBvbmVudD17U2hvd1BhZ2V9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nLzpjbGFpbScgY29tcG9uZW50PXtTaG93UGFnZX0gLz5cbiAgICAgIDxSb3V0ZSBjb21wb25lbnQ9e0ZvdXJPaEZvdXJQYWdlfSAvPlxuICAgIDwvU3dpdGNoPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2FwcC5qcyIsInZhciBtYXAgPSB7XG5cdFwiLi9jYW5vbmljYWxMaW5rXCI6IDU5LFxuXHRcIi4vY2Fub25pY2FsTGluay5qc1wiOiA1OSxcblx0XCIuL2R5bmFtaWNJbXBvcnRcIjogNTgsXG5cdFwiLi9keW5hbWljSW1wb3J0LmpzXCI6IDU4LFxuXHRcIi4vZmlsZVwiOiA2MCxcblx0XCIuL2ZpbGUuanNcIjogNjAsXG5cdFwiLi9sYnJ5VXJpXCI6IDYxLFxuXHRcIi4vbGJyeVVyaS5qc1wiOiA2MSxcblx0XCIuL21ldGFUYWdzXCI6IDYyLFxuXHRcIi4vbWV0YVRhZ3MuanNcIjogNjIsXG5cdFwiLi9wYWdlVGl0bGVcIjogNjMsXG5cdFwiLi9wYWdlVGl0bGUuanNcIjogNjMsXG5cdFwiLi9wdWJsaXNoXCI6IDExMCxcblx0XCIuL3B1Ymxpc2guanNcIjogMTEwLFxuXHRcIi4vcmVxdWVzdFwiOiA4LFxuXHRcIi4vcmVxdWVzdC5qc1wiOiA4LFxuXHRcIi4vdmFsaWRhdGVcIjogMTExLFxuXHRcIi4vdmFsaWRhdGUuanNcIjogMTExXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTA5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2xpZW50L3V0aWxzIF4uKiRcbi8vIG1vZHVsZSBpZCA9IDEwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY29uc3QgY3JlYXRlUHVibGlzaE1ldGFkYXRhID0gKGNsYWltLCB7IHR5cGUgfSwgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGxpY2Vuc2UsIG5zZncgfSwgcHVibGlzaEluQ2hhbm5lbCwgc2VsZWN0ZWRDaGFubmVsKSA9PiB7XG4gIGxldCBtZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBjbGFpbSxcbiAgICB0aXRsZSxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBsaWNlbnNlLFxuICAgIG5zZncsXG4gICAgdHlwZSxcbiAgfTtcbiAgaWYgKHB1Ymxpc2hJbkNoYW5uZWwpIHtcbiAgICBtZXRhZGF0YVsnY2hhbm5lbE5hbWUnXSA9IHNlbGVjdGVkQ2hhbm5lbDtcbiAgfVxuICByZXR1cm4gbWV0YWRhdGE7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUHVibGlzaEZvcm1EYXRhID0gKGZpbGUsIHRodW1ibmFpbCwgbWV0YWRhdGEpID0+IHtcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG4gIC8vIGFwcGVuZCBmaWxlXG4gIGZkLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuICAvLyBhcHBlbmQgdGh1bWJuYWlsXG4gIGlmICh0aHVtYm5haWwpIHtcbiAgICBmZC5hcHBlbmQoJ3RodW1ibmFpbCcsIHRodW1ibmFpbCk7XG4gIH1cbiAgLy8gYXBwZW5kIG1ldGFkYXRhXG4gIGZvciAobGV0IGtleSBpbiBtZXRhZGF0YSkge1xuICAgIGlmIChtZXRhZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBmZC5hcHBlbmQoa2V5LCBtZXRhZGF0YVtrZXldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZkO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRodW1ibmFpbFVybCA9IChjaGFubmVsLCBjaGFubmVsSWQsIGNsYWltLCBob3N0KSA9PiB7XG4gIHJldHVybiBgJHtob3N0fS8ke2NoYW5uZWx9OiR7Y2hhbm5lbElkfS8ke2NsYWltfS10aHVtYi5wbmdgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC91dGlscy9wdWJsaXNoLmpzIiwiZXhwb3J0IGNvbnN0IHZhbGlkYXRlQ2hhbm5lbFNlbGVjdGlvbiA9IChwdWJsaXNoSW5DaGFubmVsLCBzZWxlY3RlZENoYW5uZWwsIGxvZ2dlZEluQ2hhbm5lbCkgPT4ge1xuICBpZiAocHVibGlzaEluQ2hhbm5lbCAmJiAoc2VsZWN0ZWRDaGFubmVsICE9PSBsb2dnZWRJbkNoYW5uZWwubmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0xvZyBpbiB0byBhIGNoYW5uZWwgb3Igc2VsZWN0IEFub255bW91cycpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVQdWJsaXNoUGFyYW1zID0gKGZpbGUsIGNsYWltLCB1cmxFcnJvcikgPT4ge1xuICBpZiAoIWZpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBjaG9vc2UgYSBmaWxlJyk7XG4gIH1cbiAgaWYgKCFjbGFpbSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGVudGVyIGEgVVJMJyk7XG4gIH1cbiAgaWYgKHVybEVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXggdGhlIHVybCcpO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3V0aWxzL3ZhbGlkYXRlLmpzIiwiZXhwb3J0IGNvbnN0IENIQU5ORUwgPSAnQ0hBTk5FTCc7XG5leHBvcnQgY29uc3QgQVNTRVRfTElURSA9ICdBU1NFVF9MSVRFJztcbmV4cG9ydCBjb25zdCBBU1NFVF9ERVRBSUxTID0gJ0FTU0VUX0RFVEFJTFMnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L2NvbnN0YW50cy9zaG93X3JlcXVlc3RfdHlwZXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChoZWxtZXQsIGh0bWwsIHByZWxvYWRlZFN0YXRlKSA9PiB7XG4gIC8vIHRha2UgdGhlIGh0bWwgYW5kIHByZWxvYWRlZFN0YXRlIGFuZCByZXR1cm4gdGhlIGZ1bGwgcGFnZVxuICByZXR1cm4gYFxuICAgIDwhRE9DVFlQRSBodG1sPlxuICAgIDxodG1sIGxhbmc9XCJlblwiIHByZWZpeD1cIm9nOiBodHRwOi8vb2dwLm1lL25zIyBmYjogaHR0cDovL29ncC5tZS9ucy9mYiNcIj5cbiAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEsIHVzZXItc2NhbGFibGU9bm9cIj5cbiAgICAgICAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiPlxuICAgICAgICAgICAgPCEtLWhlbG1ldC0tPlxuICAgICAgICAgICAgJHtoZWxtZXQudGl0bGUudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0Lm1ldGEudG9TdHJpbmcoKX1cbiAgICAgICAgICAgICR7aGVsbWV0LmxpbmsudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDwhLS1zdHlsZSBzaGVldHMtLT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9jc3MvcmVzZXQuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL2dlbmVyYWwuY3NzXCIgdHlwZT1cInRleHQvY3NzXCI+XG4gICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvY3NzL21lZGlhUXVlcmllcy5jc3NcIiB0eXBlPVwidGV4dC9jc3NcIj5cbiAgICAgICAgICAgIDwhLS1nb29nbGUgZm9udC0tPlxuICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86MzAwXCIgcmVsPVwic3R5bGVzaGVldFwiPlxuICAgICAgICA8L2hlYWQ+XG4gICAgICAgIDxib2R5IGlkPVwibWFpbi1ib2R5XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInJlYWN0LWFwcFwiIGNsYXNzPVwicm93IHJvdy0tdGFsbCBmbGV4LWNvbnRhaW5lci0tY29sdW1uXCI+JHtodG1sfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2NyaXB0PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXFxcdTAwM2MnKX1cbiAgICAgICAgICAgIDwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCIvYnVuZGxlL2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICBgO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3JlbmRlckZ1bGxQYWdlLmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdFNpdGVTdGF0ZSA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4gc3RhdGUuc2l0ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RTaXRlSG9zdCA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4gc3RhdGUuc2l0ZS5ob3N0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zZWxlY3RvcnMvc2l0ZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmFiZWwtcG9seWZpbGxcIlxuLy8gbW9kdWxlIGlkID0gMTE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoYXR3Zy1mZXRjaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndoYXR3Zy1mZXRjaFwiXG4vLyBtb2R1bGUgaWQgPSAxMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi9zZXJ2ZXIvc2VydmVyLmpzJyk7XG5jb25zdCBDb21wb25lbnRzID0gcmVxdWlyZSgnLi9jbGllbnQvY29tcG9uZW50cycpO1xuY29uc3QgQ29udGFpbmVycyA9IHJlcXVpcmUoJy4vY2xpZW50L2NvbnRhaW5lcnMnKTtcbmNvbnN0IFBhZ2VzID0gcmVxdWlyZSgnLi9jbGllbnQvcGFnZXMnKTtcblxuY29uc3QgZXhwb3J0cyA9IHtcbiAgU2VydmVyLFxuICBDb21wb25lbnRzLFxuICBDb250YWluZXJzLFxuICBQYWdlcyxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NwZWVjaC5qcyIsIi8vIGFwcCBkZXBlbmRlbmNpZXNcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IGV4cHJlc3NIYW5kbGViYXJzID0gcmVxdWlyZSgnZXhwcmVzcy1oYW5kbGViYXJzJyk7XG5jb25zdCBIYW5kbGViYXJzID0gcmVxdWlyZSgnaGFuZGxlYmFycycpO1xuY29uc3QgaGVsbWV0ID0gcmVxdWlyZSgnaGVsbWV0Jyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5jb25zdCB7IHNlcmlhbGl6ZVNwZWVjaFVzZXIsIGRlc2VyaWFsaXplU3BlZWNoVXNlciB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzL2F1dGhIZWxwZXJzLmpzJyk7XG5jb25zdCBjb29raWVTZXNzaW9uID0gcmVxdWlyZSgnY29va2llLXNlc3Npb24nKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG4vLyBsb2dnaW5nIGRlcGVuZGVuY2llc1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuXG5mdW5jdGlvbiBTZXJ2ZXIgKCkge1xuICB0aGlzLmNvbmZpZ3VyZU15c3FsID0gKG15c3FsQ29uZmlnKSA9PiB7XG4gICAgcmVxdWlyZSgnLi4vY29uZmlnL215c3FsQ29uZmlnLmpzJykuY29uZmlndXJlKG15c3FsQ29uZmlnKTtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTaXRlID0gKHNpdGVDb25maWcpID0+IHtcbiAgICByZXF1aXJlKCcuLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpLmNvbmZpZ3VyZShzaXRlQ29uZmlnKTtcbiAgICB0aGlzLnNlc3Npb25LZXkgPSBzaXRlQ29uZmlnLmF1dGguc2Vzc2lvbktleTtcbiAgICB0aGlzLlBPUlQgPSBzaXRlQ29uZmlnLmRldGFpbHMucG9ydDtcbiAgfTtcbiAgdGhpcy5jb25maWd1cmVTbGFjayA9IChzbGFja0NvbmZpZykgPT4ge1xuICAgIHJlcXVpcmUoJy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpLmNvbmZpZ3VyZShzbGFja0NvbmZpZyk7XG4gIH07XG4gIHRoaXMuY3JlYXRlQXBwID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSBhbiBFeHByZXNzIGFwcGxpY2F0aW9uXG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgLy8gdHJ1c3QgdGhlIHByb3h5IHRvIGdldCBpcCBhZGRyZXNzIGZvciB1c1xuICAgIGFwcC5lbmFibGUoJ3RydXN0IHByb3h5Jyk7XG5cbiAgICAvLyBhZGQgbWlkZGxld2FyZVxuICAgIGFwcC51c2UoaGVsbWV0KCkpOyAvLyBzZXQgSFRUUCBoZWFkZXJzIHRvIHByb3RlY3QgYWdhaW5zdCB3ZWxsLWtub3duIHdlYiB2dWxuZXJhYmlsdGllc1xuICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMoYCR7X19kaXJuYW1lfS9wdWJsaWNgKSk7IC8vICdleHByZXNzLnN0YXRpYycgdG8gc2VydmUgc3RhdGljIGZpbGVzIGZyb20gcHVibGljIGRpcmVjdG9yeVxuICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpOyAvLyAnYm9keSBwYXJzZXInIGZvciBwYXJzaW5nIGFwcGxpY2F0aW9uL2pzb25cbiAgICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTsgLy8gJ2JvZHkgcGFyc2VyJyBmb3IgcGFyc2luZyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4geyAgLy8gY3VzdG9tIGxvZ2dpbmcgbWlkZGxld2FyZSB0byBsb2cgYWxsIGluY29taW5nIGh0dHAgcmVxdWVzdHNcbiAgICAgIGxvZ2dlci52ZXJib3NlKGBSZXF1ZXN0IG9uICR7cmVxLm9yaWdpbmFsVXJsfSBmcm9tICR7cmVxLmlwfWApO1xuICAgICAgbmV4dCgpO1xuICAgIH0pO1xuXG4gICAgLy8gY29uZmlndXJlIHBhc3Nwb3J0XG4gICAgcGFzc3BvcnQuc2VyaWFsaXplVXNlcihzZXJpYWxpemVTcGVlY2hVc2VyKTtcbiAgICBwYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoZGVzZXJpYWxpemVTcGVlY2hVc2VyKTtcbiAgICBjb25zdCBsb2NhbFNpZ251cFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9wYXNzcG9ydC9sb2NhbC1zaWdudXAuanMnKTtcbiAgICBjb25zdCBsb2NhbExvZ2luU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3Bhc3Nwb3J0L2xvY2FsLWxvZ2luLmpzJyk7XG4gICAgcGFzc3BvcnQudXNlKCdsb2NhbC1zaWdudXAnLCBsb2NhbFNpZ251cFN0cmF0ZWd5KTtcbiAgICBwYXNzcG9ydC51c2UoJ2xvY2FsLWxvZ2luJywgbG9jYWxMb2dpblN0cmF0ZWd5KTtcbiAgICAvLyBpbml0aWFsaXplIHBhc3Nwb3J0XG4gICAgYXBwLnVzZShjb29raWVTZXNzaW9uKHtcbiAgICAgIG5hbWUgIDogJ3Nlc3Npb24nLFxuICAgICAga2V5cyAgOiBbdGhpcy5zZXNzaW9uS2V5XSxcbiAgICAgIG1heEFnZTogMjQgKiA2MCAqIDYwICogMTAwMCwgLy8gaS5lLiAyNCBob3Vyc1xuICAgIH0pKTtcbiAgICBhcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG4gICAgYXBwLnVzZShwYXNzcG9ydC5zZXNzaW9uKCkpO1xuXG4gICAgLy8gY29uZmlndXJlIGhhbmRsZWJhcnMgJiByZWdpc3RlciBpdCB3aXRoIGV4cHJlc3MgYXBwXG4gICAgY29uc3QgaGJzID0gZXhwcmVzc0hhbmRsZWJhcnMuY3JlYXRlKHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdlbWJlZCcsXG4gICAgICBoYW5kbGViYXJzICAgOiBIYW5kbGViYXJzLFxuICAgIH0pO1xuICAgIGFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbiAgICBhcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XG5cbiAgICAvLyBzZXQgdGhlIHJvdXRlcyBvbiB0aGUgYXBwXG4gICAgcmVxdWlyZSgnLi9yb3V0ZXMvYXV0aC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2FwaS1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL3BhZ2Utcm91dGVzLmpzJykoYXBwKTtcbiAgICByZXF1aXJlKCcuL3JvdXRlcy9hc3NldC1yb3V0ZXMuanMnKShhcHApO1xuICAgIHJlcXVpcmUoJy4vcm91dGVzL2ZhbGxiYWNrLXJvdXRlcy5qcycpKGFwcCk7XG5cbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfTtcbiAgdGhpcy5pbml0aWFsaXplID0gKCkgPT4ge1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVMb2dnZXIuanMnKShsb2dnZXIpO1xuICAgIHJlcXVpcmUoJy4vaGVscGVycy9jb25maWd1cmVTbGFjay5qcycpKGxvZ2dlcik7XG4gICAgdGhpcy5jcmVhdGVBcHAoKTtcbiAgICB0aGlzLnNlcnZlciA9IGh0dHAuU2VydmVyKHRoaXMuYXBwKTtcbiAgfTtcbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zdCBkYiA9IHJlcXVpcmUoJy4vbW9kZWxzL2luZGV4Jyk7XG4gICAgLy8gc3luYyBzZXF1ZWxpemVcbiAgICBkYi5zZXF1ZWxpemUuc3luYygpXG4gICAgICAvLyBzdGFydCB0aGUgc2VydmVyXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VydmVyLmxpc3Rlbih0aGlzLlBPUlQsICgpID0+IHtcbiAgICAgICAgICBsb2dnZXIuaW5mbyhgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBQT1JUICR7dGhpcy5QT1JUfWApO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgU3RhcnR1cCBFcnJvcjpgLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VydmVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3NlcnZlci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDEyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzLWhhbmRsZWJhcnNcIlxuLy8gbW9kdWxlIGlkID0gMTIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJoZWxtZXRcIlxuLy8gbW9kdWxlIGlkID0gMTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNlcmlhbGl6ZVNwZWVjaFVzZXIgKHVzZXIsIGRvbmUpIHsgIC8vIHJldHVybnMgdXNlciBkYXRhIHRvIGJlIHNlcmlhbGl6ZWQgaW50byBzZXNzaW9uXG4gICAgbG9nZ2VyLmRlYnVnKCdzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbiAgZGVzZXJpYWxpemVTcGVlY2hVc2VyICh1c2VyLCBkb25lKSB7ICAvLyBkZXNlcmlhbGl6ZXMgc2Vzc2lvbiBhbmQgcG9wdWxhdGVzIGFkZGl0aW9uYWwgaW5mbyB0byByZXEudXNlclxuICAgIGxvZ2dlci5kZWJ1ZygnZGVzZXJpYWxpemluZyB1c2VyJyk7XG4gICAgZG9uZShudWxsLCB1c2VyKTtcbiAgfSxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9hdXRoSGVscGVycy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1zZXNzaW9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29va2llLXNlc3Npb25cIlxuLy8gbW9kdWxlIGlkID0gMTI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBQYXNzcG9ydExvY2FsU3RyYXRlZ3kgPSByZXF1aXJlKCdwYXNzcG9ydC1sb2NhbCcpLlN0cmF0ZWd5O1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9tb2RlbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUGFzc3BvcnRMb2NhbFN0cmF0ZWd5KFxuICB7XG4gICAgdXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcbiAgICBwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxuICB9LFxuICAodXNlcm5hbWUsIHBhc3N3b3JkLCBkb25lKSA9PiB7XG4gICAgbG9nZ2VyLnZlcmJvc2UoYG5ldyBjaGFubmVsIHNpZ251cCByZXF1ZXN0LiB1c2VyOiAke3VzZXJuYW1lfSBwYXNzOiAke3Bhc3N3b3JkfSAuYCk7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgLy8gc2VydmVyLXNpZGUgdmFsaWRhdG9uIG9mIGlucHV0cyAodXNlcm5hbWUsIHBhc3N3b3JkKVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFubmVsIGFuZCByZXRyaWV2ZSB0aGUgbWV0YWRhdGFcbiAgICByZXR1cm4gbGJyeUFwaS5jcmVhdGVDaGFubmVsKGBAJHt1c2VybmFtZX1gKVxuICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdXNlciByZWNvcmRcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgICAgdXNlck5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ3VzZXJEYXRhID4nLCB1c2VyRGF0YSk7XG4gICAgICAgIC8vIGNyZWF0ZSB1c2VyIHJlY29yZFxuICAgICAgICBjb25zdCBjaGFubmVsRGF0YSA9IHtcbiAgICAgICAgICBjaGFubmVsTmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgY2hhbm5lbENsYWltSWQ6IHR4LmNsYWltX2lkLFxuICAgICAgICB9O1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgnY2hhbm5lbERhdGEgPicsIGNoYW5uZWxEYXRhKTtcbiAgICAgICAgLy8gY3JlYXRlIGNlcnRpZmljYXRlIHJlY29yZFxuICAgICAgICBjb25zdCBjZXJ0aWZpY2F0ZURhdGEgPSB7XG4gICAgICAgICAgY2xhaW1JZDogdHguY2xhaW1faWQsXG4gICAgICAgICAgbmFtZSAgIDogYEAke3VzZXJuYW1lfWAsXG4gICAgICAgICAgLy8gYWRkcmVzcyxcbiAgICAgICAgfTtcbiAgICAgICAgbG9nZ2VyLnZlcmJvc2UoJ2NlcnRpZmljYXRlRGF0YSA+JywgY2VydGlmaWNhdGVEYXRhKTtcbiAgICAgICAgLy8gc2F2ZSB1c2VyIGFuZCBjZXJ0aWZpY2F0ZSB0byBkYlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2RiLlVzZXIuY3JlYXRlKHVzZXJEYXRhKSwgZGIuQ2hhbm5lbC5jcmVhdGUoY2hhbm5lbERhdGEpLCBkYi5DZXJ0aWZpY2F0ZS5jcmVhdGUoY2VydGlmaWNhdGVEYXRhKV0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbbmV3VXNlciwgbmV3Q2hhbm5lbCwgbmV3Q2VydGlmaWNhdGVdKSA9PiB7XG4gICAgICAgIGxvZ2dlci52ZXJib3NlKCd1c2VyIGFuZCBjZXJ0aWZpY2F0ZSBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVsZXZhbnQgbmV3VXNlciBpbmZvIHRvIGJlIHBhc3NlZCBiYWNrIGZvciByZXEuVXNlclxuICAgICAgICB1c2VySW5mb1snaWQnXSA9IG5ld1VzZXIuaWQ7XG4gICAgICAgIHVzZXJJbmZvWyd1c2VyTmFtZSddID0gbmV3VXNlci51c2VyTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBuZXdDaGFubmVsLmNoYW5uZWxOYW1lO1xuICAgICAgICB1c2VySW5mb1snY2hhbm5lbENsYWltSWQnXSA9IG5ld0NoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgIC8vIGFzc29jaWF0ZSB0aGUgaW5zdGFuY2VzXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbbmV3Q2VydGlmaWNhdGUuc2V0Q2hhbm5lbChuZXdDaGFubmVsKSwgbmV3Q2hhbm5lbC5zZXRVc2VyKG5ld1VzZXIpXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBsb2dnZXIudmVyYm9zZSgndXNlciBhbmQgY2VydGlmaWNhdGUgc3VjY2Vzc2Z1bGx5IGFzc29jaWF0ZWQnKTtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQodXNlckluZm8uY2hhbm5lbENsYWltSWQsIHVzZXJJbmZvLmNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2dnZXIuZXJyb3IoJ3NpZ251cCBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGRvbmUoZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtc2lnbnVwLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJheGlvc1wiXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbGJyeUNvbmZpZyA9IHtcbiAgYXBpOiB7XG4gICAgYXBpSG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgYXBpUG9ydDogJzUyNzknLFxuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYnJ5Q29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xicnlDb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtYW5hbHl0aWNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW5pdmVyc2FsLWFuYWx5dGljc1wiXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyByZXR1cm5TaG9ydElkIH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL3NlcXVlbGl6ZUhlbHBlcnMuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgSU5URUdFUiwgVEVYVCwgREVDSU1BTCB9KSA9PiB7XG4gIGNvbnN0IENlcnRpZmljYXRlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnQ2VydGlmaWNhdGUnLFxuICAgIHtcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFtb3VudDoge1xuICAgICAgICB0eXBlICAgOiBERUNJTUFMKDE5LCA4KSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjbGFpbVNlcXVlbmNlOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVjb2RlZENsYWltOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZGVwdGg6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBlZmZlY3RpdmVBbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGFzU2lnbmF0dXJlOiB7XG4gICAgICAgIHR5cGUgICA6IEJPT0xFQU4sXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgaGV4OiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBub3V0OiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdHhpZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsaWRBdEhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG91dHBvaW50OiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICB2YWx1ZVZlcnNpb246IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGNsYWltVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2VydGlmaWNhdGVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBrZXlUeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgdHlwZSAgIDogVEVYVCgnbG9uZycpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgQ2VydGlmaWNhdGUuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENlcnRpZmljYXRlLmJlbG9uZ3NUbyhkYi5DaGFubmVsLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChsb25nQ2hhbm5lbElkLCBjaGFubmVsTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZCAke2NoYW5uZWxOYW1lfToke2xvbmdDaGFubmVsSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7bmFtZTogY2hhbm5lbE5hbWV9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwocykgZm91bmQgd2l0aCB0aGF0IGNoYW5uZWwgbmFtZScpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0dXJuU2hvcnRJZChyZXN1bHQsIGxvbmdDaGFubmVsSWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZEZyb21TaG9ydENoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgbmFtZSAgIDogY2hhbm5lbE5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtjaGFubmVsQ2xhaW1JZH0lYCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmRlcjogW1snaGVpZ2h0JywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OiAvLyBub3RlIHJlc3VsdHMgbXVzdCBiZSBzb3J0ZWRcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS5nZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lID0gZnVuY3Rpb24gKGNoYW5uZWxOYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBnZXRMb25nQ2hhbm5lbElkRnJvbUNoYW5uZWxOYW1lKCR7Y2hhbm5lbE5hbWV9KWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjaGFubmVsTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydlZmZlY3RpdmVBbW91bnQnLCAnREVTQyddLCBbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzdWx0WzBdLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDZXJ0aWZpY2F0ZS52YWxpZGF0ZUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgdmFsaWRhdGVMb25nQ2hhbm5lbElkKCR7bmFtZX0sICR7Y2xhaW1JZH0pYCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7bmFtZSwgY2xhaW1JZH0sXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlc29sdmUoY2xhaW1JZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2VydGlmaWNhdGUuZ2V0TG9uZ0NoYW5uZWxJZCA9IGZ1bmN0aW9uIChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDaGFubmVsSWQoJHtjaGFubmVsTmFtZX0sICR7Y2hhbm5lbENsYWltSWR9KWApO1xuICAgIGlmIChjaGFubmVsQ2xhaW1JZCAmJiAoY2hhbm5lbENsYWltSWQubGVuZ3RoID09PSA0MCkpIHsgIC8vIGlmIGEgZnVsbCBjaGFubmVsIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDbGFpbUlkICYmIGNoYW5uZWxDbGFpbUlkLmxlbmd0aCA8IDQwKSB7ICAvLyBpZiBhIHNob3J0IGNoYW5uZWwgaWQgaXMgcHJvdmlkZWRcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDaGFubmVsSWRGcm9tU2hvcnRDaGFubmVsSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9uZ0NoYW5uZWxJZEZyb21DaGFubmVsTmFtZShjaGFubmVsTmFtZSk7ICAvLyBpZiBubyBjaGFubmVsIGlkIHByb3ZpZGVkXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBDZXJ0aWZpY2F0ZTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NlcnRpZmljYXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORyB9KSA9PiB7XG4gIGNvbnN0IENoYW5uZWwgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdDaGFubmVsJyxcbiAgICB7XG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsQ2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIENoYW5uZWwuYXNzb2NpYXRlID0gZGIgPT4ge1xuICAgIENoYW5uZWwuYmVsb25nc1RvKGRiLlVzZXIpO1xuICAgIENoYW5uZWwuaGFzT25lKGRiLkNlcnRpZmljYXRlKTtcbiAgfTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL2NoYW5uZWwuanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCB7IHJldHVyblNob3J0SWQgfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvc2VxdWVsaXplSGVscGVycy5qcycpO1xuY29uc3QgeyBhc3NldERlZmF1bHRzOiB7IHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCB9LCBkZXRhaWxzOiB7IGhvc3QgfSB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlsZUV4dGVuc2lvbkZyb21Db250ZW50VHlwZSAoY29udGVudFR5cGUpIHtcbiAgc3dpdGNoIChjb250ZW50VHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlL2pwZWcnOlxuICAgIGNhc2UgJ2ltYWdlL2pwZyc6XG4gICAgICByZXR1cm4gJ2pwZWcnO1xuICAgIGNhc2UgJ2ltYWdlL3BuZyc6XG4gICAgICByZXR1cm4gJ3BuZyc7XG4gICAgY2FzZSAnaW1hZ2UvZ2lmJzpcbiAgICAgIHJldHVybiAnZ2lmJztcbiAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgcmV0dXJuICdtcDQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnZXIuZGVidWcoJ3NldHRpbmcgdW5rbm93biBmaWxlIHR5cGUgYXMgZmlsZSBleHRlbnNpb24ganBlZycpO1xuICAgICAgcmV0dXJuICdqcGVnJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lVGh1bWJuYWlsIChzdG9yZWRUaHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpIHtcbiAgaWYgKHN0b3JlZFRodW1ibmFpbCA9PT0gJycpIHtcbiAgICByZXR1cm4gZGVmYXVsdFRodW1ibmFpbDtcbiAgfVxuICByZXR1cm4gc3RvcmVkVGh1bWJuYWlsO1xufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYWltRGF0YSAoY2xhaW0pIHtcbiAgLy8gbG9nZ2VyLmRlYnVnKCdwcmVwYXJpbmcgY2xhaW0gZGF0YSBiYXNlZCBvbiByZXNvbHZlZCBkYXRhOicsIGNsYWltKTtcbiAgY2xhaW1bJ3RodW1ibmFpbCddID0gZGV0ZXJtaW5lVGh1bWJuYWlsKGNsYWltLnRodW1ibmFpbCwgZGVmYXVsdFRodW1ibmFpbCk7XG4gIGNsYWltWydmaWxlRXh0J10gPSBkZXRlcm1pbmVGaWxlRXh0ZW5zaW9uRnJvbUNvbnRlbnRUeXBlKGNsYWltLmNvbnRlbnRUeXBlKTtcbiAgY2xhaW1bJ2hvc3QnXSA9IGhvc3Q7XG4gIHJldHVybiBjbGFpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIsIFRFWFQsIERFQ0lNQUwgfSkgPT4ge1xuICBjb25zdCBDbGFpbSA9IHNlcXVlbGl6ZS5kZWZpbmUoXG4gICAgJ0NsYWltJyxcbiAgICB7XG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IHtcbiAgICAgICAgdHlwZSAgIDogREVDSU1BTCgxOSwgOCksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1JZDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1TZXF1ZW5jZToge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlY29kZWRDbGFpbToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlcHRoOiB7XG4gICAgICAgIHR5cGUgICA6IElOVEVHRVIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgZWZmZWN0aXZlQW1vdW50OiB7XG4gICAgICAgIHR5cGUgICA6IERFQ0lNQUwoMTksIDgpLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhhc1NpZ25hdHVyZToge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhlaWdodDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGhleDoge1xuICAgICAgICB0eXBlICAgOiBURVhUKCdsb25nJyksXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbm91dDoge1xuICAgICAgICB0eXBlICAgOiBJTlRFR0VSLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHR4aWQ6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHZhbGlkQXRIZWlnaHQ6IHtcbiAgICAgICAgdHlwZSAgIDogSU5URUdFUixcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBvdXRwb2ludDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY2xhaW1UeXBlOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjZXJ0aWZpY2F0ZUlkOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdXRob3I6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBsYW5ndWFnZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbGljZW5zZVVybDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbnNmdzoge1xuICAgICAgICB0eXBlICAgOiBCT09MRUFOLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHByZXZpZXc6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIG1ldGFkYXRhVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgY29udGVudFR5cGU6IHtcbiAgICAgICAgdHlwZSAgIDogU1RSSU5HLFxuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgfSxcbiAgICAgIHNvdXJjZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVHlwZToge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc291cmNlVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgc3RyZWFtVmVyc2lvbjoge1xuICAgICAgICB0eXBlICAgOiBTVFJJTkcsXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgdmFsdWVWZXJzaW9uOiB7XG4gICAgICAgIHR5cGUgICA6IFNUUklORyxcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIH0sXG4gICAgICBjaGFubmVsTmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBDbGFpbS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgQ2xhaW0uYmVsb25nc1RvKGRiLkZpbGUsIHtcbiAgICAgIGZvcmVpZ25LZXk6IHtcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgPSBmdW5jdGlvbiAoY2xhaW1JZCwgY2xhaW1OYW1lKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBDbGFpbS5nZXRTaG9ydENsYWltSWRGcm9tTG9uZ0NsYWltSWQgZm9yICR7Y2xhaW1OYW1lfSMke2NsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGNsYWltTmFtZSB9LFxuICAgICAgICAgIG9yZGVyOiBbWydoZWlnaHQnLCAnQVNDJ11dLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNsYWltKHMpIGZvdW5kIHdpdGggdGhhdCBjbGFpbSBuYW1lJyk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXNvbHZlKHJldHVyblNob3J0SWQocmVzdWx0LCBjbGFpbUlkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYENsYWltLmdldEFsbENoYW5uZWxDbGFpbXMgZm9yICR7Y2hhbm5lbENsYWltSWR9YCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgICAgcmF3ICA6IHRydWUsICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIG9ubHkgZGF0YSwgbm90IGFuIGFycmF5IG9mIGluc3RhbmNlc1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjaGFubmVsQ2xhaW1zQXJyYXkgPT4ge1xuICAgICAgICAgIC8vIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbGNsYWltc2FycmF5IGxlbmd0aDonLCBjaGFubmVsQ2xhaW1zQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWxDbGFpbXNBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjaGFubmVsQ2xhaW1zQXJyYXkuZm9yRWFjaChjbGFpbSA9PiB7XG4gICAgICAgICAgICAgICAgY2xhaW1bJ2ZpbGVFeHQnXSA9IGRldGVybWluZUZpbGVFeHRlbnNpb25Gcm9tQ29udGVudFR5cGUoY2xhaW0uY29udGVudFR5cGUpO1xuICAgICAgICAgICAgICAgIGNsYWltWyd0aHVtYm5haWwnXSA9IGRldGVybWluZVRodW1ibmFpbChjbGFpbS50aHVtYm5haWwsIGRlZmF1bHRUaHVtYm5haWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbGFpbTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGNoYW5uZWxDbGFpbXNBcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIENsYWltLmdldENsYWltSWRCeUxvbmdDaGFubmVsSWQgPSBmdW5jdGlvbiAoY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgZmluZGluZyBjbGFpbSBpZCBmb3IgY2xhaW0gJHtjbGFpbU5hbWV9IGZyb20gY2hhbm5lbCAke2NoYW5uZWxDbGFpbUlkfWApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzXG4gICAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgICB3aGVyZTogeyBuYW1lOiBjbGFpbU5hbWUsIGNlcnRpZmljYXRlSWQ6IGNoYW5uZWxDbGFpbUlkIH0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2lkJywgJ0FTQyddXSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgJHtyZXN1bHQubGVuZ3RofSByZWNvcmRzIGZvdW5kIGZvciBcIiR7Y2xhaW1OYW1lfVwiIGluIGNoYW5uZWwgXCIke2NoYW5uZWxDbGFpbUlkfVwiYCk7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0TG9uZ0NsYWltSWRGcm9tU2hvcnRDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIHNob3J0SWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjbGFpbUlkOiB7XG4gICAgICAgICAgICAgICRsaWtlOiBgJHtzaG9ydElkfSVgLFxuICAgICAgICAgICAgfX0sXG4gICAgICAgICAgb3JkZXI6IFtbJ2hlaWdodCcsICdBU0MnXV0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgc3dpdGNoIChyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgZGVmYXVsdDogLy8gbm90ZSByZXN1bHRzIG11c3QgYmUgc29ydGVkXG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5jbGFpbUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQ2xhaW0uZ2V0VG9wRnJlZUNsYWltSWRCeUNsYWltTmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXNcbiAgICAgICAgLmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IG5hbWUgfSxcbiAgICAgICAgICBvcmRlcjogW1snZWZmZWN0aXZlQW1vdW50JywgJ0RFU0MnXSwgWydoZWlnaHQnLCAnQVNDJ11dLCAgLy8gbm90ZTogbWF5YmUgaGVpZ2h0IGFuZCBlZmZlY3RpdmUgYW1vdW50IG5lZWQgdG8gc3dpdGNoP1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnbGVuZ3RoIG9mIHJlc3VsdCcsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdFswXS5kYXRhVmFsdWVzLmNsYWltSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS52YWxpZGF0ZUxvbmdDbGFpbUlkID0gZnVuY3Rpb24gKG5hbWUsIGNsYWltSWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtuYW1lLCBjbGFpbUlkfSxcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmVzb2x2ZShjbGFpbUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBDbGFpbS5nZXRMb25nQ2xhaW1JZCA9IGZ1bmN0aW9uIChjbGFpbU5hbWUsIGNsYWltSWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGdldExvbmdDbGFpbUlkKCR7Y2xhaW1OYW1lfSwgJHtjbGFpbUlkfSlgKTtcbiAgICBpZiAoY2xhaW1JZCAmJiAoY2xhaW1JZC5sZW5ndGggPT09IDQwKSkgeyAgLy8gaWYgYSBmdWxsIGNsYWltIGlkIGlzIHByb3ZpZGVkXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUxvbmdDbGFpbUlkKGNsYWltTmFtZSwgY2xhaW1JZCk7XG4gICAgfSBlbHNlIGlmIChjbGFpbUlkICYmIGNsYWltSWQubGVuZ3RoIDwgNDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvbmdDbGFpbUlkRnJvbVNob3J0Q2xhaW1JZChjbGFpbU5hbWUsIGNsYWltSWQpOyAgLy8gaWYgYSBzaG9ydCBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRUb3BGcmVlQ2xhaW1JZEJ5Q2xhaW1OYW1lKGNsYWltTmFtZSk7ICAvLyBpZiBubyBjbGFpbSBpZCBpcyBwcm92aWRlZFxuICAgIH1cbiAgfTtcblxuICBDbGFpbS5yZXNvbHZlQ2xhaW0gPSBmdW5jdGlvbiAobmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ2xhaW0ucmVzb2x2ZUNsYWltOiAke25hbWV9ICR7Y2xhaW1JZH1gKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpc1xuICAgICAgICAuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgbmFtZSwgY2xhaW1JZCB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihjbGFpbUFycmF5ID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNsYWltQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBtb3JlIHRoYW4gb25lIHJlY29yZCBtYXRjaGVzICR7bmFtZX0jJHtjbGFpbUlkfSBpbiBkYi5DbGFpbWApO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShwcmVwYXJlQ2xhaW1EYXRhKGNsYWltQXJyYXlbMF0uZGF0YVZhbHVlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gQ2xhaW07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9jbGFpbS5qcyIsIm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcsIEJPT0xFQU4sIElOVEVHRVIgfSkgPT4ge1xuICBjb25zdCBGaWxlID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnRmlsZScsXG4gICAge1xuICAgICAgbmFtZToge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBjbGFpbUlkOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgb3V0cG9pbnQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGUgICAgIDogSU5URUdFUixcbiAgICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdCAgOiAwLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVQYXRoOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGZpbGVUeXBlOiB7XG4gICAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIH0sXG4gICAgICBuc2Z3OiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB0cmVuZGluZ0VsaWdpYmxlOiB7XG4gICAgICAgIHR5cGUgICAgICAgIDogQk9PTEVBTixcbiAgICAgICAgYWxsb3dOdWxsICAgOiBmYWxzZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgRmlsZS5hc3NvY2lhdGUgPSBkYiA9PiB7XG4gICAgRmlsZS5oYXNNYW55KGRiLlJlcXVlc3QpO1xuICAgIEZpbGUuaGFzT25lKGRiLkNsYWltKTtcbiAgfTtcblxuICBGaWxlLmdldFJlY2VudENsYWltcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQWxsKHtcbiAgICAgIHdoZXJlOiB7IG5zZnc6IGZhbHNlLCB0cmVuZGluZ0VsaWdpYmxlOiB0cnVlIH0sXG4gICAgICBvcmRlcjogW1snY3JlYXRlZEF0JywgJ0RFU0MnXV0sXG4gICAgICBsaW1pdDogMjUsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpbGU7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9maWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCB7IFNUUklORywgQk9PTEVBTiwgVEVYVCB9KSA9PiB7XG4gIGNvbnN0IFJlcXVlc3QgPSBzZXF1ZWxpemUuZGVmaW5lKFxuICAgICdSZXF1ZXN0JyxcbiAgICB7XG4gICAgICBhY3Rpb246IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgdXJsOiB7XG4gICAgICAgIHR5cGUgICAgIDogU1RSSU5HLFxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGlwQWRkcmVzczoge1xuICAgICAgICB0eXBlICAgICA6IFNUUklORyxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICB0eXBlICAgICA6IFRFWFQoJ2xvbmcnKSxcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxuICAgICAgICBkZWZhdWx0ICA6IG51bGwsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBSZXF1ZXN0LmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBSZXF1ZXN0LmJlbG9uZ3NUbyhkYi5GaWxlLCB7XG4gICAgICBmb3JlaWduS2V5OiB7XG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlcXVlc3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL21vZGVscy9yZXF1ZXN0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHNlcXVlbGl6ZSwgeyBTVFJJTkcgfSkgPT4ge1xuICBjb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcbiAgICAnVXNlcicsXG4gICAge1xuICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgdHlwZSAgICAgOiBTVFJJTkcsXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuICBVc2VyLmFzc29jaWF0ZSA9IGRiID0+IHtcbiAgICBVc2VyLmhhc09uZShkYi5DaGFubmVsKTtcbiAgfTtcblxuICBVc2VyLnByb3RvdHlwZS5jb21wYXJlUGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHRoaXMucGFzc3dvcmQpO1xuICB9O1xuXG4gIFVzZXIucHJvdG90eXBlLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24gKG5ld1Bhc3N3b3JkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIGEgc2FsdCBzdHJpbmcgdG8gdXNlIGZvciBoYXNoaW5nXG4gICAgICBiY3J5cHQuZ2VuU2FsdCgoc2FsdEVycm9yLCBzYWx0KSA9PiB7XG4gICAgICAgIGlmIChzYWx0RXJyb3IpIHtcbiAgICAgICAgICBsb2dnZXIuZXJyb3IoJ3NhbHQgZXJyb3InLCBzYWx0RXJyb3IpO1xuICAgICAgICAgIHJlamVjdChzYWx0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGhhc2hlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyJ3MgcGFzc3dvcmRcbiAgICAgICAgYmNyeXB0Lmhhc2gobmV3UGFzc3dvcmQsIHNhbHQsIChoYXNoRXJyb3IsIGhhc2gpID0+IHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciB3aXRoIHRoZSBoYXNoIGdlbmVyYXRpb24gcmV0dXJuIHRoZSBlcnJvclxuICAgICAgICAgIGlmIChoYXNoRXJyb3IpIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignaGFzaCBlcnJvcicsIGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZWplY3QoaGFzaEVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVwbGFjZSB0aGUgY3VycmVudCBwYXNzd29yZCB3aXRoIHRoZSBuZXcgaGFzaFxuICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgIC51cGRhdGUoe3Bhc3N3b3JkOiBoYXNofSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBwcmUtc2F2ZSBob29rIG1ldGhvZCB0byBoYXNoIHRoZSB1c2VyJ3MgcGFzc3dvcmQgYmVmb3JlIHRoZSB1c2VyJ3MgaW5mbyBpcyBzYXZlZCB0byB0aGUgZGIuXG4gIFVzZXIuaG9vaygnYmVmb3JlQ3JlYXRlJywgKHVzZXIsIG9wdGlvbnMpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ1VzZXIuYmVmb3JlQ3JlYXRlIGhvb2suLi4nKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gZ2VuZXJhdGUgYSBzYWx0IHN0cmluZyB0byB1c2UgZm9yIGhhc2hpbmdcbiAgICAgIGJjcnlwdC5nZW5TYWx0KChzYWx0RXJyb3IsIHNhbHQpID0+IHtcbiAgICAgICAgaWYgKHNhbHRFcnJvcikge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignc2FsdCBlcnJvcicsIHNhbHRFcnJvcik7XG4gICAgICAgICAgcmVqZWN0KHNhbHRFcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdlbmVyYXRlIGEgaGFzaGVkIHZlcnNpb24gb2YgdGhlIHVzZXIncyBwYXNzd29yZFxuICAgICAgICBiY3J5cHQuaGFzaCh1c2VyLnBhc3N3b3JkLCBzYWx0LCAoaGFzaEVycm9yLCBoYXNoKSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2l0aCB0aGUgaGFzaCBnZW5lcmF0aW9uIHJldHVybiB0aGUgZXJyb3JcbiAgICAgICAgICBpZiAoaGFzaEVycm9yKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ2hhc2ggZXJyb3InLCBoYXNoRXJyb3IpO1xuICAgICAgICAgICAgcmVqZWN0KGhhc2hFcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIHBhc3N3b3JkIHN0cmluZyB3aXRoIHRoZSBoYXNoIHBhc3N3b3JkIHZhbHVlXG4gICAgICAgICAgdXNlci5wYXNzd29yZCA9IGhhc2g7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gVXNlcjtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvbW9kZWxzL3VzZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiY3J5cHRcIlxuLy8gbW9kdWxlIGlkID0gMTM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFBhc3Nwb3J0TG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuXG5jb25zdCByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8gPSAodXNlckluc3RhbmNlKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHVzZXJJbmZvID0ge307XG4gICAgdXNlckluZm9bJ2lkJ10gPSB1c2VySW5zdGFuY2UuaWQ7XG4gICAgdXNlckluZm9bJ3VzZXJOYW1lJ10gPSB1c2VySW5zdGFuY2UudXNlck5hbWU7XG4gICAgdXNlckluc3RhbmNlXG4gICAgICAuZ2V0Q2hhbm5lbCgpXG4gICAgICAudGhlbigoe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0pID0+IHtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxOYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgdXNlckluZm9bJ2NoYW5uZWxDbGFpbUlkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgcmV0dXJuIGRiLkNlcnRpZmljYXRlLmdldFNob3J0Q2hhbm5lbElkRnJvbUxvbmdDaGFubmVsSWQoY2hhbm5lbENsYWltSWQsIGNoYW5uZWxOYW1lKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihzaG9ydENoYW5uZWxJZCA9PiB7XG4gICAgICAgIHVzZXJJbmZvWydzaG9ydENoYW5uZWxJZCddID0gc2hvcnRDaGFubmVsSWQ7XG4gICAgICAgIHJlc29sdmUodXNlckluZm8pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBQYXNzcG9ydExvY2FsU3RyYXRlZ3koXG4gIHtcbiAgICB1c2VybmFtZUZpZWxkOiAndXNlcm5hbWUnLFxuICAgIHBhc3N3b3JkRmllbGQ6ICdwYXNzd29yZCcsXG4gIH0sXG4gICh1c2VybmFtZSwgcGFzc3dvcmQsIGRvbmUpID0+IHtcbiAgICByZXR1cm4gZGIuVXNlclxuICAgICAgLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge3VzZXJOYW1lOiB1c2VybmFtZX0sXG4gICAgICB9KVxuICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIGZhbHNlLCB7bWVzc2FnZTogJ0luY29ycmVjdCB1c2VybmFtZSBvciBwYXNzd29yZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXNlci5jb21wYXJlUGFzc3dvcmQocGFzc3dvcmQpXG4gICAgICAgICAgLnRoZW4oaXNNYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdpbmNvcnJlY3QgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgZmFsc2UsIHttZXNzYWdlOiAnSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdQYXNzd29yZCB3YXMgYSBtYXRjaCwgcmV0dXJuaW5nIFVzZXInKTtcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Vc2VyQW5kQ2hhbm5lbEluZm8odXNlcilcbiAgICAgICAgICAgICAgLnRoZW4odXNlckluZm8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lKG51bGwsIHVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICByZXR1cm4gZG9uZShlcnJvcik7XG4gICAgICB9KTtcbiAgfSxcbik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcGFzc3BvcnQvbG9jYWwtbG9naW4uanMiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBwYXNzcG9ydCA9IHJlcXVpcmUoJ3Bhc3Nwb3J0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSBmb3Igc2lnbiB1cFxuICBhcHAucG9zdCgnL3NpZ251cCcsIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtc2lnbnVwJyksIChyZXEsIHJlcykgPT4ge1xuICAgIGxvZ2dlci52ZXJib3NlKGBzdWNjZXNzZnVsIHNpZ251cCBmb3IgJHtyZXEudXNlci5jaGFubmVsTmFtZX1gKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBzdWNjZXNzICAgICAgIDogdHJ1ZSxcbiAgICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICAgIGNoYW5uZWxDbGFpbUlkOiByZXEudXNlci5jaGFubmVsQ2xhaW1JZCxcbiAgICAgIHNob3J0Q2hhbm5lbElkOiByZXEudXNlci5zaG9ydENoYW5uZWxJZCxcbiAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIGZvciBsb2cgaW5cbiAgYXBwLnBvc3QoJy9sb2dpbicsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZSgnbG9jYWwtbG9naW4nLCAoZXJyLCB1c2VyLCBpbmZvKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KGVycik7XG4gICAgICB9XG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9nZ2VyLmRlYnVnKCdzdWNjZXNzZnVsIGxvZ2luJyk7XG4gICAgICByZXEubG9nSW4odXNlciwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3MgICAgICAgOiB0cnVlLFxuICAgICAgICAgIGNoYW5uZWxOYW1lICAgOiByZXEudXNlci5jaGFubmVsTmFtZSxcbiAgICAgICAgICBjaGFubmVsQ2xhaW1JZDogcmVxLnVzZXIuY2hhbm5lbENsYWltSWQsXG4gICAgICAgICAgc2hvcnRDaGFubmVsSWQ6IHJlcS51c2VyLnNob3J0Q2hhbm5lbElkLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKHJlcSwgcmVzLCBuZXh0KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGxvZyBvdXRcbiAgYXBwLmdldCgnL2xvZ291dCcsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcS5sb2dvdXQoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogJ3lvdSBzdWNjZXNzZnVsbHkgbG9nZ2VkIG91dCd9KTtcbiAgfSk7XG4gIC8vIHNlZSBpZiB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQsIGFuZCByZXR1cm4gY3JlZGVudGlhbHMgaWYgc29cbiAgYXBwLmdldCgnL3VzZXInLCAocmVxLCByZXMpID0+IHtcbiAgICBpZiAocmVxLnVzZXIpIHtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXEudXNlcn0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICd1c2VyIGlzIG5vdCBsb2dnZWQgaW4nfSk7XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvcm91dGVzL2F1dGgtcm91dGVzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgbXVsdGlwYXJ0ID0gcmVxdWlyZSgnY29ubmVjdC1tdWx0aXBhcnR5Jyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgdXBsb2FkRGlyZWN0b3J5IH0sIGRldGFpbHM6IHsgaG9zdCB9IH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuY29uc3QgbXVsdGlwYXJ0TWlkZGxld2FyZSA9IG11bHRpcGFydCh7dXBsb2FkRGlyOiB1cGxvYWREaXJlY3Rvcnl9KTtcbmNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzL2luZGV4Jyk7XG5jb25zdCB7IGNsYWltTmFtZUlzQXZhaWxhYmxlLCBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHksIHB1Ymxpc2ggfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3B1Ymxpc2hDb250cm9sbGVyLmpzJyk7XG5jb25zdCB7IGdldENsYWltTGlzdCwgcmVzb2x2ZVVyaSwgZ2V0Q2xhaW0gfSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgeyBhZGRHZXRSZXN1bHRzVG9GaWxlRGF0YSwgY3JlYXRlQmFzaWNQdWJsaXNoUGFyYW1zLCBjcmVhdGVUaHVtYm5haWxQdWJsaXNoUGFyYW1zLCBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keSwgcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzLCBjcmVhdGVGaWxlRGF0YSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9wdWJsaXNoSGVscGVycy5qcycpO1xuY29uc3QgZXJyb3JIYW5kbGVycyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvZXJyb3JIYW5kbGVycy5qcycpO1xuY29uc3QgeyBzZW5kR0FUaW1pbmdFdmVudCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9nb29nbGVBbmFseXRpY3MuanMnKTtcbmNvbnN0IHsgYXV0aGVudGljYXRlVXNlciB9ID0gcmVxdWlyZSgnLi4vYXV0aC9hdXRoZW50aWNhdGlvbi5qcycpO1xuY29uc3QgeyBnZXRDaGFubmVsRGF0YSwgZ2V0Q2hhbm5lbENsYWltcywgZ2V0Q2xhaW1JZCB9ID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvc2VydmVDb250cm9sbGVyLmpzJyk7XG5cbmNvbnN0IE5PX0NIQU5ORUwgPSAnTk9fQ0hBTk5FTCc7XG5jb25zdCBOT19DTEFJTSA9ICdOT19DTEFJTSc7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSB0byBjaGVjayB3aGV0aGVyIHNpdGUgaGFzIHB1Ymxpc2hlZCB0byBhIGNoYW5uZWxcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2F2YWlsYWJpbGl0eS86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zOiB7IG5hbWUgfSB9LCByZXMpID0+IHtcbiAgICBjb25zdCBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY2hlY2tDaGFubmVsQXZhaWxhYmlsaXR5KG5hbWUpXG4gICAgICAudGhlbihhdmFpbGFibGVOYW1lID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYXZhaWxhYmxlTmFtZSk7XG4gICAgICAgIHNlbmRHQVRpbWluZ0V2ZW50KCdlbmQtdG8tZW5kJywgJ2NsYWltIG5hbWUgYXZhaWxhYmlsaXR5JywgbmFtZSwgZ2FTdGFydFRpbWUsIERhdGUubm93KCkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBnZXQgYSBzaG9ydCBjaGFubmVsIGlkIGZyb20gbG9uZyBjaGFubmVsIElkXG4gIGFwcC5nZXQoJy9hcGkvY2hhbm5lbC9zaG9ydC1pZC86bG9uZ0lkLzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgZGIuQ2VydGlmaWNhdGUuZ2V0U2hvcnRDaGFubmVsSWRGcm9tTG9uZ0NoYW5uZWxJZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihzaG9ydElkKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgYXBwLmdldCgnL2FwaS9jaGFubmVsL2RhdGEvOmNoYW5uZWxOYW1lLzpjaGFubmVsQ2xhaW1JZCcsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gcGFyYW1zLmNoYW5uZWxOYW1lO1xuICAgIGxldCBjaGFubmVsQ2xhaW1JZCA9IHBhcmFtcy5jaGFubmVsQ2xhaW1JZDtcbiAgICBpZiAoY2hhbm5lbENsYWltSWQgPT09ICdub25lJykgY2hhbm5lbENsYWltSWQgPSBudWxsO1xuICAgIGdldENoYW5uZWxEYXRhKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgMClcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIHdhcyBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YX0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAuZ2V0KCcvYXBpL2NoYW5uZWwvY2xhaW1zLzpjaGFubmVsTmFtZS86Y2hhbm5lbENsYWltSWQvOnBhZ2UnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBjaGFubmVsTmFtZSA9IHBhcmFtcy5jaGFubmVsTmFtZTtcbiAgICBsZXQgY2hhbm5lbENsYWltSWQgPSBwYXJhbXMuY2hhbm5lbENsYWltSWQ7XG4gICAgaWYgKGNoYW5uZWxDbGFpbUlkID09PSAnbm9uZScpIGNoYW5uZWxDbGFpbUlkID0gbnVsbDtcbiAgICBjb25zdCBwYWdlID0gcGFyYW1zLnBhZ2U7XG4gICAgZ2V0Q2hhbm5lbENsYWltcyhjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIHBhZ2UpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnTm8gbWF0Y2hpbmcgY2hhbm5lbCB3YXMgZm91bmQnfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGF9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gcnVuIGEgY2xhaW1fbGlzdCByZXF1ZXN0IG9uIHRoZSBkYWVtb25cbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9saXN0LzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgZ2V0Q2xhaW1MaXN0KHBhcmFtcy5uYW1lKVxuICAgICAgLnRoZW4oY2xhaW1zTGlzdCA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGNsYWltc0xpc3QpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBnZXQgYW4gYXNzZXRcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9nZXQvOm5hbWUvOmNsYWltSWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAgIC8vIHJlc29sdmUgdGhlIGNsYWltXG4gICAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKG5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihyZXNvbHZlUmVzdWx0ID0+IHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIGEgY2xhaW0gYWN0dWFsbHkgZXhpc3RzIGF0IHRoYXQgdXJpXG4gICAgICAgIGlmICghcmVzb2x2ZVJlc3VsdCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWF0Y2hpbmcgdXJpIGZvdW5kIGluIENsYWltIHRhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpbGVEYXRhID0gY3JlYXRlRmlsZURhdGEocmVzb2x2ZVJlc3VsdCk7XG4gICAgICAgIC8vIGdldCB0aGUgY2xhaW1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtmaWxlRGF0YSwgZ2V0Q2xhaW0oYCR7bmFtZX0jJHtjbGFpbUlkfWApXSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKFsgZmlsZURhdGEsIGdldFJlc3VsdCBdKSA9PiB7XG4gICAgICAgIGZpbGVEYXRhID0gYWRkR2V0UmVzdWx0c1RvRmlsZURhdGEoZmlsZURhdGEsIGdldFJlc3VsdCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZGIudXBzZXJ0KGRiLkZpbGUsIGZpbGVEYXRhLCB7bmFtZSwgY2xhaW1JZH0sICdGaWxlJyksIGdldFJlc3VsdF0pO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChbIGZpbGVSZWNvcmQsIHttZXNzYWdlLCBjb21wbGV0ZWR9IF0pID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlLCBjb21wbGV0ZWQgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIGNoZWNrIHdoZXRoZXIgdGhpcyBzaXRlIHB1Ymxpc2hlZCB0byBhIGNsYWltXG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vYXZhaWxhYmlsaXR5LzpuYW1lJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBwYXJhbXM6IHsgbmFtZSB9IH0sIHJlcykgPT4ge1xuICAgIGNvbnN0IGdhU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICAgICAgc2VuZEdBVGltaW5nRXZlbnQoJ2VuZC10by1lbmQnLCAnY2xhaW0gbmFtZSBhdmFpbGFiaWxpdHknLCBuYW1lLCBnYVN0YXJ0VGltZSwgRGF0ZS5ub3coKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHJ1biBhIHJlc29sdmUgcmVxdWVzdCBvbiB0aGUgZGFlbW9uXG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vcmVzb2x2ZS86bmFtZS86Y2xhaW1JZCcsICh7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIHJlc29sdmVVcmkoYCR7cGFyYW1zLm5hbWV9IyR7cGFyYW1zLmNsYWltSWR9YClcbiAgICAgIC50aGVuKHJlc29sdmVkVXJpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzb2x2ZWRVcmkpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBydW4gYSBwdWJsaXNoIHJlcXVlc3Qgb24gdGhlIGRhZW1vblxuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9wdWJsaXNoJywgbXVsdGlwYXJ0TWlkZGxld2FyZSwgKHsgYm9keSwgZmlsZXMsIGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgdXNlciB9LCByZXMpID0+IHtcbiAgICAvLyBkZWZpbmUgdmFyaWFibGVzXG4gICAgbGV0ICBjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIGRlc2NyaXB0aW9uLCBmaWxlTmFtZSwgZmlsZVBhdGgsIGZpbGVUeXBlLCBnYVN0YXJ0VGltZSwgbGljZW5zZSwgbmFtZSwgbnNmdywgdGh1bWJuYWlsLCB0aHVtYm5haWxGaWxlTmFtZSwgdGh1bWJuYWlsRmlsZVBhdGgsIHRodW1ibmFpbEZpbGVUeXBlLCB0aXRsZTtcbiAgICAvLyByZWNvcmQgdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlcXVlc3RcbiAgICBnYVN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgLy8gdmFsaWRhdGUgdGhlIGJvZHkgYW5kIGZpbGVzIG9mIHRoZSByZXF1ZXN0XG4gICAgdHJ5IHtcbiAgICAgIC8vIHZhbGlkYXRlQXBpUHVibGlzaFJlcXVlc3QoYm9keSwgZmlsZXMpO1xuICAgICAgKHtuYW1lLCBuc2Z3LCBsaWNlbnNlLCB0aXRsZSwgZGVzY3JpcHRpb24sIHRodW1ibmFpbH0gPSBwYXJzZVB1Ymxpc2hBcGlSZXF1ZXN0Qm9keShib2R5KSk7XG4gICAgICAoe2ZpbGVOYW1lLCBmaWxlUGF0aCwgZmlsZVR5cGUsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlUGF0aCwgdGh1bWJuYWlsRmlsZVR5cGV9ID0gcGFyc2VQdWJsaXNoQXBpUmVxdWVzdEZpbGVzKGZpbGVzKSk7XG4gICAgICAoe2NoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZH0gPSBib2R5KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBjaGVjayBjaGFubmVsIGF1dGhvcml6YXRpb25cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBhdXRoZW50aWNhdGVVc2VyKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIGNoYW5uZWxQYXNzd29yZCwgdXNlciksXG4gICAgICBjbGFpbU5hbWVJc0F2YWlsYWJsZShuYW1lKSxcbiAgICAgIGNyZWF0ZUJhc2ljUHVibGlzaFBhcmFtcyhmaWxlUGF0aCwgbmFtZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBsaWNlbnNlLCBuc2Z3LCB0aHVtYm5haWwpLFxuICAgICAgY3JlYXRlVGh1bWJuYWlsUHVibGlzaFBhcmFtcyh0aHVtYm5haWxGaWxlUGF0aCwgbmFtZSwgbGljZW5zZSwgbnNmdyksXG4gICAgXSlcbiAgICAgIC50aGVuKChbe2NoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZH0sIHZhbGlkYXRlZENsYWltTmFtZSwgcHVibGlzaFBhcmFtcywgdGh1bWJuYWlsUHVibGlzaFBhcmFtc10pID0+IHtcbiAgICAgICAgLy8gYWRkIGNoYW5uZWwgZGV0YWlscyB0byB0aGUgcHVibGlzaCBwYXJhbXNcbiAgICAgICAgaWYgKGNoYW5uZWxOYW1lICYmIGNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgICAgcHVibGlzaFBhcmFtc1snY2hhbm5lbF9uYW1lJ10gPSBjaGFubmVsTmFtZTtcbiAgICAgICAgICBwdWJsaXNoUGFyYW1zWydjaGFubmVsX2lkJ10gPSBjaGFubmVsQ2xhaW1JZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaXNoIHRoZSB0aHVtYm5haWxcbiAgICAgICAgaWYgKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMpIHtcbiAgICAgICAgICBwdWJsaXNoKHRodW1ibmFpbFB1Ymxpc2hQYXJhbXMsIHRodW1ibmFpbEZpbGVOYW1lLCB0aHVtYm5haWxGaWxlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcHVibGlzaCB0aGUgYXNzZXRcbiAgICAgICAgcmV0dXJuIHB1Ymxpc2gocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICBtZXNzYWdlOiAncHVibGlzaCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5JyxcbiAgICAgICAgICBkYXRhICAgOiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2xhaW1JZDogcmVzdWx0LmNsYWltX2lkLFxuICAgICAgICAgICAgdXJsICAgIDogYCR7aG9zdH0vJHtyZXN1bHQuY2xhaW1faWR9LyR7bmFtZX1gLFxuICAgICAgICAgICAgbGJyeVR4IDogcmVzdWx0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAvLyByZWNvcmQgdGhlIHB1Ymxpc2ggZW5kIHRpbWUgYW5kIHNlbmQgdG8gZ29vZ2xlIGFuYWx5dGljc1xuICAgICAgICBzZW5kR0FUaW1pbmdFdmVudCgnZW5kLXRvLWVuZCcsICdwdWJsaXNoJywgZmlsZVR5cGUsIGdhU3RhcnRUaW1lLCBEYXRlLm5vdygpKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZ2V0IGEgc2hvcnQgY2xhaW0gaWQgZnJvbSBsb25nIGNsYWltIElkXG4gIGFwcC5nZXQoJy9hcGkvY2xhaW0vc2hvcnQtaWQvOmxvbmdJZC86bmFtZScsICh7IGlwLCBvcmlnaW5hbFVybCwgYm9keSwgcGFyYW1zIH0sIHJlcykgPT4ge1xuICAgIGRiLkNsYWltLmdldFNob3J0Q2xhaW1JZEZyb21Mb25nQ2xhaW1JZChwYXJhbXMubG9uZ0lkLCBwYXJhbXMubmFtZSlcbiAgICAgIC50aGVuKHNob3J0SWQgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7c3VjY2VzczogdHJ1ZSwgZGF0YTogc2hvcnRJZH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGVycm9ySGFuZGxlcnMuaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgfSk7XG4gIH0pO1xuICBhcHAucG9zdCgnL2FwaS9jbGFpbS9sb25nLWlkJywgKHsgaXAsIG9yaWdpbmFsVXJsLCBib2R5LCBwYXJhbXMgfSwgcmVzKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdib2R5OicsIGJvZHkpO1xuICAgIGNvbnN0IGNoYW5uZWxOYW1lID0gYm9keS5jaGFubmVsTmFtZTtcbiAgICBjb25zdCBjaGFubmVsQ2xhaW1JZCA9IGJvZHkuY2hhbm5lbENsYWltSWQ7XG4gICAgY29uc3QgY2xhaW1OYW1lID0gYm9keS5jbGFpbU5hbWU7XG4gICAgY29uc3QgY2xhaW1JZCA9IGJvZHkuY2xhaW1JZDtcbiAgICBnZXRDbGFpbUlkKGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgY2xhaW1OYW1lLCBjbGFpbUlkKVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gTk9fQ0hBTk5FTCkge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdObyBtYXRjaGluZyBjaGFubmVsIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQgPT09IE5PX0NMQUlNKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIG1hdGNoaW5nIGNsYWltIGlkIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXN1bHR9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgYXBwLmdldCgnL2FwaS9jbGFpbS9kYXRhLzpjbGFpbU5hbWUvOmNsYWltSWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIGJvZHksIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBjbGFpbU5hbWUgPSBwYXJhbXMuY2xhaW1OYW1lO1xuICAgIGxldCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgaWYgKGNsYWltSWQgPT09ICdub25lJykgY2xhaW1JZCA9IG51bGw7XG4gICAgZGIuQ2xhaW0ucmVzb2x2ZUNsYWltKGNsYWltTmFtZSwgY2xhaW1JZClcbiAgICAgIC50aGVuKGNsYWltSW5mbyA9PiB7XG4gICAgICAgIGlmICghY2xhaW1JbmZvKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogJ05vIGNsYWltIGNvdWxkIGJlIGZvdW5kJ30pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiBjbGFpbUluZm99KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBlcnJvckhhbmRsZXJzLmhhbmRsZUVycm9yUmVzcG9uc2Uob3JpZ2luYWxVcmwsIGlwLCBlcnJvciwgcmVzKTtcbiAgICAgIH0pO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2VlIGlmIGFzc2V0IGlzIGF2YWlsYWJsZSBsb2NhbGx5XG4gIGFwcC5nZXQoJy9hcGkvZmlsZS9hdmFpbGFiaWxpdHkvOm5hbWUvOmNsYWltSWQnLCAoeyBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBuYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgY29uc3QgY2xhaW1JZCA9IHBhcmFtcy5jbGFpbUlkO1xuICAgIGRiLkZpbGUuZmluZE9uZSh7d2hlcmU6IHtuYW1lLCBjbGFpbUlkfX0pXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtzdWNjZXNzOiB0cnVlLCBkYXRhOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe3N1Y2Nlc3M6IHRydWUsIGRhdGE6IGZhbHNlfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgZXJyb3JIYW5kbGVycy5oYW5kbGVFcnJvclJlc3BvbnNlKG9yaWdpbmFsVXJsLCBpcCwgZXJyb3IsIHJlcyk7XG4gICAgICB9KTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9hcGktcm91dGVzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29ubmVjdC1tdWx0aXBhcnR5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29ubmVjdC1tdWx0aXBhcnR5XCJcbi8vIG1vZHVsZSBpZCA9IDE0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5jb25zdCBkYiA9IHJlcXVpcmUoJy4uL21vZGVscy9pbmRleCcpO1xuY29uc3QgbGJyeUFwaSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbGJyeUFwaS5qcycpO1xuY29uc3QgcHVibGlzaEhlbHBlcnMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3B1Ymxpc2hIZWxwZXJzLmpzJyk7XG5jb25zdCB7IHB1Ymxpc2hpbmc6IHsgcHJpbWFyeUNsYWltQWRkcmVzcywgYWRkaXRpb25hbENsYWltQWRkcmVzc2VzIH0gfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IE9wID0gU2VxdWVsaXplLk9wO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHVibGlzaCAocHVibGlzaFBhcmFtcywgZmlsZU5hbWUsIGZpbGVUeXBlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBwdWJsaXNoUmVzdWx0cywgY2VydGlmaWNhdGVJZCwgY2hhbm5lbE5hbWU7XG4gICAgICAvLyBwdWJsaXNoIHRoZSBmaWxlXG4gICAgICByZXR1cm4gbGJyeUFwaS5wdWJsaXNoQ2xhaW0ocHVibGlzaFBhcmFtcylcbiAgICAgICAgLnRoZW4odHggPT4ge1xuICAgICAgICAgIGxvZ2dlci5pbmZvKGBTdWNjZXNzZnVsbHkgcHVibGlzaGVkICR7cHVibGlzaFBhcmFtcy5uYW1lfSAke2ZpbGVOYW1lfWAsIHR4KTtcbiAgICAgICAgICBwdWJsaXNoUmVzdWx0cyA9IHR4O1xuICAgICAgICAgIC8vIGdldCB0aGUgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGlmIChwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGB0aGlzIGNsYWltIHdhcyBwdWJsaXNoZWQgaW4gY2hhbm5lbDogJHtwdWJsaXNoUGFyYW1zLmNoYW5uZWxfbmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBkYi5DaGFubmVsLmZpbmRPbmUoe3doZXJlOiB7Y2hhbm5lbE5hbWU6IHB1Ymxpc2hQYXJhbXMuY2hhbm5lbF9uYW1lfX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ3RoaXMgY2xhaW0gd2FzIG5vdCBwdWJsaXNoZWQgaW4gYSBjaGFubmVsJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGNoYW5uZWwgPT4ge1xuICAgICAgICAvLyBzZXQgY2hhbm5lbCBpbmZvcm1hdGlvblxuICAgICAgICAgIGNlcnRpZmljYXRlSWQgPSBudWxsO1xuICAgICAgICAgIGNoYW5uZWxOYW1lID0gbnVsbDtcbiAgICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVJZCA9IGNoYW5uZWwuY2hhbm5lbENsYWltSWQ7XG4gICAgICAgICAgICBjaGFubmVsTmFtZSA9IGNoYW5uZWwuY2hhbm5lbE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgY2VydGlmaWNhdGVJZDogJHtjZXJ0aWZpY2F0ZUlkfWApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgRmlsZSByZWNvcmRcbiAgICAgICAgICBjb25zdCBmaWxlUmVjb3JkID0ge1xuICAgICAgICAgICAgbmFtZSAgICAgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgICAgOiBwdWJsaXNoUmVzdWx0cy5jbGFpbV9pZCxcbiAgICAgICAgICAgIHRpdGxlICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLnRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhZGRyZXNzICAgIDogcHVibGlzaFBhcmFtcy5jbGFpbV9hZGRyZXNzLFxuICAgICAgICAgICAgb3V0cG9pbnQgICA6IGAke3B1Ymxpc2hSZXN1bHRzLnR4aWR9OiR7cHVibGlzaFJlc3VsdHMubm91dH1gLFxuICAgICAgICAgICAgaGVpZ2h0ICAgICA6IDAsXG4gICAgICAgICAgICBmaWxlTmFtZSxcbiAgICAgICAgICAgIGZpbGVQYXRoICAgOiBwdWJsaXNoUGFyYW1zLmZpbGVfcGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlLFxuICAgICAgICAgICAgbnNmdyAgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEubnNmdyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgQ2xhaW0gcmVjb3JkXG4gICAgICAgICAgY29uc3QgY2xhaW1SZWNvcmQgPSB7XG4gICAgICAgICAgICBuYW1lICAgICAgIDogcHVibGlzaFBhcmFtcy5uYW1lLFxuICAgICAgICAgICAgY2xhaW1JZCAgICA6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgICAgdGl0bGUgICAgICA6IHB1Ymxpc2hQYXJhbXMubWV0YWRhdGEudGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGFkZHJlc3MgICAgOiBwdWJsaXNoUGFyYW1zLmNsYWltX2FkZHJlc3MsXG4gICAgICAgICAgICB0aHVtYm5haWwgIDogcHVibGlzaFBhcmFtcy5tZXRhZGF0YS50aHVtYm5haWwsXG4gICAgICAgICAgICBvdXRwb2ludCAgIDogYCR7cHVibGlzaFJlc3VsdHMudHhpZH06JHtwdWJsaXNoUmVzdWx0cy5ub3V0fWAsXG4gICAgICAgICAgICBoZWlnaHQgICAgIDogMCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlVHlwZSxcbiAgICAgICAgICAgIG5zZncgICAgICAgOiBwdWJsaXNoUGFyYW1zLm1ldGFkYXRhLm5zZncsXG4gICAgICAgICAgICBhbW91bnQgICAgIDogcHVibGlzaFBhcmFtcy5iaWQsXG4gICAgICAgICAgICBjZXJ0aWZpY2F0ZUlkLFxuICAgICAgICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICAvLyB1cHNlcnQgY3JpdGVyaWFcbiAgICAgICAgICBjb25zdCB1cHNlcnRDcml0ZXJpYSA9IHtcbiAgICAgICAgICAgIG5hbWUgICA6IHB1Ymxpc2hQYXJhbXMubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQ6IHB1Ymxpc2hSZXN1bHRzLmNsYWltX2lkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgLy8gdXBzZXJ0IHRoZSByZWNvcmRzXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtkYi51cHNlcnQoZGIuRmlsZSwgZmlsZVJlY29yZCwgdXBzZXJ0Q3JpdGVyaWEsICdGaWxlJyksIGRiLnVwc2VydChkYi5DbGFpbSwgY2xhaW1SZWNvcmQsIHVwc2VydENyaXRlcmlhLCAnQ2xhaW0nKV0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoW2ZpbGUsIGNsYWltXSkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbZmlsZS5zZXRDbGFpbShjbGFpbSksIGNsYWltLnNldEZpbGUoZmlsZSldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnRmlsZSBhbmQgQ2xhaW0gcmVjb3JkcyBzdWNjZXNzZnVsbHkgYXNzb2NpYXRlZCcpO1xuICAgICAgICAgIHJlc29sdmUocHVibGlzaFJlc3VsdHMpOyAvLyByZXNvbHZlIHRoZSBwcm9taXNlIHdpdGggdGhlIHJlc3VsdCBmcm9tIGxicnlBcGkucHVibGlzaENsYWltO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZ2dlci5lcnJvcignUFVCTElTSCBFUlJPUicsIGVycm9yKTtcbiAgICAgICAgICBwdWJsaXNoSGVscGVycy5kZWxldGVUZW1wb3JhcnlGaWxlKHB1Ymxpc2hQYXJhbXMuZmlsZV9wYXRoKTsgLy8gZGVsZXRlIHRoZSBsb2NhbCBmaWxlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGNsYWltTmFtZUlzQXZhaWxhYmxlIChuYW1lKSB7XG4gICAgY29uc3QgY2xhaW1BZGRyZXNzZXMgPSBhZGRpdGlvbmFsQ2xhaW1BZGRyZXNzZXMgfHwgW107XG4gICAgY2xhaW1BZGRyZXNzZXMucHVzaChwcmltYXJ5Q2xhaW1BZGRyZXNzKTtcbiAgICAvLyBmaW5kIGFueSByZWNvcmRzIHdoZXJlIHRoZSBuYW1lIGlzIHVzZWRcbiAgICByZXR1cm4gZGIuQ2xhaW1cbiAgICAgIC5maW5kQWxsKHtcbiAgICAgICAgYXR0cmlidXRlczogWydhZGRyZXNzJ10sXG4gICAgICAgIHdoZXJlICAgICA6IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgICAgIFtPcC5vcl06IGNsYWltQWRkcmVzc2VzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhhdCBjbGFpbSBpcyBhbHJlYWR5IGluIHVzZScpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxuICBjaGVja0NoYW5uZWxBdmFpbGFiaWxpdHkgKG5hbWUpIHtcbiAgICByZXR1cm4gZGIuQ2hhbm5lbFxuICAgICAgLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZTogeyBjaGFubmVsTmFtZTogbmFtZSB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoYXQgY2hhbm5lbCBoYXMgYWxyZWFkeSBiZWVuIGNsYWltZWQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9jb250cm9sbGVycy9wdWJsaXNoQ29udHJvbGxlci5qcyIsImNvbnN0IGRiID0gcmVxdWlyZSgnLi4vbW9kZWxzJyk7XG5jb25zdCBsb2dnZXIgPSByZXF1aXJlKCd3aW5zdG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhdXRoZW50aWNhdGVVc2VyIChjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQsIHVzZXIpIHtcbiAgICAvLyBjYXNlOiBubyBjaGFubmVsTmFtZSBvciBjaGFubmVsIElkIGFyZSBwcm92aWRlZCAoYW5vbnltb3VzKSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVzZXIgdG9rZW4gaXMgcHJvdmlkZWRcbiAgICBpZiAoIWNoYW5uZWxOYW1lICYmICFjaGFubmVsSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNoYW5uZWxOYW1lICAgOiBudWxsLFxuICAgICAgICBjaGFubmVsQ2xhaW1JZDogbnVsbCxcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIGNhc2U6IGNoYW5uZWxOYW1lIG9yIGNoYW5uZWwgSWQgYXJlIHByb3ZpZGVkIHdpdGggdXNlciB0b2tlblxuICAgIGlmICh1c2VyKSB7XG4gICAgICBpZiAoY2hhbm5lbE5hbWUgJiYgY2hhbm5lbE5hbWUgIT09IHVzZXIuY2hhbm5lbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgcHJvdmlkZWQgY2hhbm5lbCBuYW1lIGRvZXMgbm90IG1hdGNoIHVzZXIgY3JlZGVudGlhbHMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFubmVsSWQgJiYgY2hhbm5lbElkICE9PSB1c2VyLmNoYW5uZWxDbGFpbUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIHByb3ZpZGVkIGNoYW5uZWwgaWQgZG9lcyBub3QgbWF0Y2ggdXNlciBjcmVkZW50aWFscycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbm5lbE5hbWUgICA6IHVzZXIuY2hhbm5lbE5hbWUsXG4gICAgICAgIGNoYW5uZWxDbGFpbUlkOiB1c2VyLmNoYW5uZWxDbGFpbUlkLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gY2FzZTogY2hhbm5lbE5hbWUgb3IgY2hhbm5lbCBJZCBhcmUgcHJvdmlkZWQgd2l0aCBwYXNzd29yZCBpbnN0ZWFkIG9mIHVzZXIgdG9rZW5cbiAgICBpZiAoIWNoYW5uZWxQYXNzd29yZCkgdGhyb3cgbmV3IEVycm9yKCdubyBjaGFubmVsIHBhc3N3b3JkIHByb3ZpZGVkJyk7XG4gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzLmF1dGhlbnRpY2F0ZUNoYW5uZWxDcmVkZW50aWFscyhjaGFubmVsTmFtZSwgY2hhbm5lbElkLCBjaGFubmVsUGFzc3dvcmQpO1xuICB9LFxuICBhdXRoZW50aWNhdGVDaGFubmVsQ3JlZGVudGlhbHMgKGNoYW5uZWxOYW1lLCBjaGFubmVsSWQsIHVzZXJQYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBob2lzdGVkIHZhcmlhYmxlc1xuICAgICAgbGV0IGNoYW5uZWxEYXRhO1xuICAgICAgLy8gYnVpbGQgdGhlIHBhcmFtcyBmb3IgZmluZGluZyB0aGUgY2hhbm5lbFxuICAgICAgbGV0IGNoYW5uZWxGaW5kUGFyYW1zID0ge307XG4gICAgICBpZiAoY2hhbm5lbE5hbWUpIGNoYW5uZWxGaW5kUGFyYW1zWydjaGFubmVsTmFtZSddID0gY2hhbm5lbE5hbWU7XG4gICAgICBpZiAoY2hhbm5lbElkKSBjaGFubmVsRmluZFBhcmFtc1snY2hhbm5lbENsYWltSWQnXSA9IGNoYW5uZWxJZDtcbiAgICAgIC8vIGZpbmQgdGhlIGNoYW5uZWxcbiAgICAgIGRiLkNoYW5uZWxcbiAgICAgICAgLmZpbmRPbmUoe1xuICAgICAgICAgIHdoZXJlOiBjaGFubmVsRmluZFBhcmFtcyxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY2hhbm5lbCA9PiB7XG4gICAgICAgICAgaWYgKCFjaGFubmVsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ25vIGNoYW5uZWwgZm91bmQnKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gZmFpbGVkLCB5b3UgZG8gbm90IGhhdmUgYWNjZXNzIHRvIHRoYXQgY2hhbm5lbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGFubmVsRGF0YSA9IGNoYW5uZWwuZ2V0KCk7XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCdjaGFubmVsIGRhdGE6JywgY2hhbm5lbERhdGEpO1xuICAgICAgICAgIHJldHVybiBkYi5Vc2VyLmZpbmRPbmUoe1xuICAgICAgICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IGNoYW5uZWxEYXRhLmNoYW5uZWxOYW1lLnN1YnN0cmluZygxKSB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbih1c2VyID0+IHtcbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zygnbm8gdXNlciBmb3VuZCcpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQsIHlvdSBkbyBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhhdCBjaGFubmVsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1c2VyLmNvbXBhcmVQYXNzd29yZCh1c2VyUGFzc3dvcmQpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihpc01hdGNoID0+IHtcbiAgICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnaW5jb3JyZWN0IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZCwgeW91IGRvIG5vdCBoYXZlIGFjY2VzcyB0byB0aGF0IGNoYW5uZWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLmRlYnVnKCcuLi5wYXNzd29yZCB3YXMgYSBtYXRjaC4uLicpO1xuICAgICAgICAgIHJlc29sdmUoY2hhbm5lbERhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9hdXRoL2F1dGhlbnRpY2F0aW9uLmpzIiwiY29uc3QgQ0xBSU1TX1BFUl9QQUdFID0gMTI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZXR1cm5QYWdpbmF0ZWRDaGFubmVsQ2xhaW1zIChjaGFubmVsTmFtZSwgbG9uZ0NoYW5uZWxDbGFpbUlkLCBjbGFpbXMsIHBhZ2UpIHtcbiAgICBjb25zdCB0b3RhbFBhZ2VzID0gbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lVG90YWxQYWdlcyhjbGFpbXMpO1xuICAgIGNvbnN0IHBhZ2luYXRpb25QYWdlID0gbW9kdWxlLmV4cG9ydHMuZ2V0UGFnZUZyb21RdWVyeShwYWdlKTtcbiAgICBjb25zdCB2aWV3RGF0YSA9IHtcbiAgICAgIGNoYW5uZWxOYW1lICAgICAgIDogY2hhbm5lbE5hbWUsXG4gICAgICBsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdDaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltcyAgICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZXh0cmFjdFBhZ2VGcm9tQ2xhaW1zKGNsYWltcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgcHJldmlvdXNQYWdlICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVQcmV2aW91c1BhZ2UocGFnaW5hdGlvblBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgICAgICAgOiBwYWdpbmF0aW9uUGFnZSxcbiAgICAgIG5leHRQYWdlICAgICAgICAgIDogbW9kdWxlLmV4cG9ydHMuZGV0ZXJtaW5lTmV4dFBhZ2UodG90YWxQYWdlcywgcGFnaW5hdGlvblBhZ2UpLFxuICAgICAgdG90YWxQYWdlcyAgICAgICAgOiB0b3RhbFBhZ2VzLFxuICAgICAgdG90YWxSZXN1bHRzICAgICAgOiBtb2R1bGUuZXhwb3J0cy5kZXRlcm1pbmVUb3RhbENsYWltcyhjbGFpbXMpLFxuICAgIH07XG4gICAgcmV0dXJuIHZpZXdEYXRhO1xuICB9LFxuICBnZXRQYWdlRnJvbVF1ZXJ5IChwYWdlKSB7XG4gICAgaWYgKHBhZ2UpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH0sXG4gIGV4dHJhY3RQYWdlRnJvbUNsYWltcyAoY2xhaW1zLCBwYWdlTnVtYmVyKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiBbXTsgIC8vIGlmIG5vIGNsYWltcywgcmV0dXJuIHRoaXMgZGVmYXVsdFxuICAgIH1cbiAgICAvLyBsb2dnZXIuZGVidWcoJ2NsYWltcyBpcyBhcnJheT8nLCBBcnJheS5pc0FycmF5KGNsYWltcykpO1xuICAgIC8vIGxvZ2dlci5kZWJ1ZyhgcGFnZU51bWJlciAke3BhZ2VOdW1iZXJ9IGlzIG51bWJlcj9gLCBOdW1iZXIuaXNJbnRlZ2VyKHBhZ2VOdW1iZXIpKTtcbiAgICBjb25zdCBjbGFpbVN0YXJ0SW5kZXggPSAocGFnZU51bWJlciAtIDEpICogQ0xBSU1TX1BFUl9QQUdFO1xuICAgIGNvbnN0IGNsYWltRW5kSW5kZXggPSBjbGFpbVN0YXJ0SW5kZXggKyBDTEFJTVNfUEVSX1BBR0U7XG4gICAgY29uc3QgcGFnZU9mQ2xhaW1zID0gY2xhaW1zLnNsaWNlKGNsYWltU3RhcnRJbmRleCwgY2xhaW1FbmRJbmRleCk7XG4gICAgcmV0dXJuIHBhZ2VPZkNsYWltcztcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxQYWdlcyAoY2xhaW1zKSB7XG4gICAgaWYgKCFjbGFpbXMpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbENsYWltcyA9IGNsYWltcy5sZW5ndGg7XG4gICAgICBpZiAodG90YWxDbGFpbXMgPCBDTEFJTVNfUEVSX1BBR0UpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBjb25zdCBmdWxsUGFnZXMgPSBNYXRoLmZsb29yKHRvdGFsQ2xhaW1zIC8gQ0xBSU1TX1BFUl9QQUdFKTtcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHRvdGFsQ2xhaW1zICUgQ0xBSU1TX1BFUl9QQUdFO1xuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZnVsbFBhZ2VzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxQYWdlcyArIDE7XG4gICAgfVxuICB9LFxuICBkZXRlcm1pbmVQcmV2aW91c1BhZ2UgKGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gMTtcbiAgfSxcbiAgZGV0ZXJtaW5lTmV4dFBhZ2UgKHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlICsgMTtcbiAgfSxcbiAgZGV0ZXJtaW5lVG90YWxDbGFpbXMgKGNsYWltcykge1xuICAgIGlmICghY2xhaW1zKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNsYWltcy5sZW5ndGg7XG4gIH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL2hlbHBlcnMvY2hhbm5lbFBhZ2luYXRpb24uanMiLCJjb25zdCB7IGRldGFpbHM6IGhvc3QgfSA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zaXRlQ29uZmlnLmpzJyk7XG5jb25zdCBoYW5kbGVQYWdlUmVuZGVyID0gcmVxdWlyZSgnLi4vaGVscGVycy9oYW5kbGVQYWdlUmVuZGVyLmpzeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhcHApID0+IHtcbiAgLy8gcm91dGUgZm9yIHRoZSBob21lIHBhZ2VcbiAgYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gZGlzcGxheSBsb2dpbiBwYWdlXG4gIGFwcC5nZXQoJy9sb2dpbicsIChyZXEsIHJlcykgPT4ge1xuICAgIGhhbmRsZVBhZ2VSZW5kZXIocmVxLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2hvdyAnYWJvdXQnIHBhZ2VcbiAgYXBwLmdldCgnL2Fib3V0JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgdHJlbmRpbmcgaW1hZ2VzXG4gIGFwcC5nZXQoJy90cmVuZGluZycsIChyZXEsIHJlcykgPT4ge1xuICAgIHJlcy5zdGF0dXMoMzAxKS5yZWRpcmVjdCgnL3BvcHVsYXInKTtcbiAgfSk7XG4gIGFwcC5nZXQoJy9wb3B1bGFyJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgaGFuZGxlUGFnZVJlbmRlcihyZXEsIHJlcyk7XG4gIH0pO1xuICAvLyByb3V0ZSB0byBkaXNwbGF5IGEgbGlzdCBvZiB0aGUgdHJlbmRpbmcgaW1hZ2VzXG4gIGFwcC5nZXQoJy9uZXcnLCAocmVxLCByZXMpID0+IHtcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG4gIC8vIHJvdXRlIHRvIHNlbmQgZW1iZWRhYmxlIHZpZGVvIHBsYXllciAoZm9yIHR3aXR0ZXIpXG4gIGFwcC5nZXQoJy9lbWJlZC86Y2xhaW1JZC86bmFtZScsICh7IHBhcmFtcyB9LCByZXMpID0+IHtcbiAgICBjb25zdCBjbGFpbUlkID0gcGFyYW1zLmNsYWltSWQ7XG4gICAgY29uc3QgbmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgIC8vIGdldCBhbmQgcmVuZGVyIHRoZSBjb250ZW50XG4gICAgcmVzLnN0YXR1cygyMDApLnJlbmRlcignZW1iZWQnLCB7IGxheW91dDogJ2VtYmVkJywgaG9zdCwgY2xhaW1JZCwgbmFtZSB9KTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9wYWdlLXJvdXRlcy5qcyIsImltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IExPR0lOIH0gZnJvbSAnY29uc3RhbnRzL3B1Ymxpc2hfY2hhbm5lbF9zZWxlY3Rfc3RhdGVzJztcbmNvbnN0IHsgcHVibGlzaGluZyB9ID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnL3NpdGVDb25maWcuanMnKTtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBkaXNhYmxlZCAgICAgICAgICA6IHB1Ymxpc2hpbmcuZGlzYWJsZWQsXG4gIGRpc2FibGVkTWVzc2FnZSAgIDogcHVibGlzaGluZy5kaXNhYmxlZE1lc3NhZ2UsXG4gIHB1Ymxpc2hJbkNoYW5uZWwgIDogZmFsc2UsXG4gIHNlbGVjdGVkQ2hhbm5lbCAgIDogTE9HSU4sXG4gIHNob3dNZXRhZGF0YUlucHV0czogZmFsc2UsXG4gIHN0YXR1cyAgICAgICAgICAgIDoge1xuICAgIHN0YXR1cyA6IG51bGwsXG4gICAgbWVzc2FnZTogbnVsbCxcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICBmaWxlICAgICAgICAgOiBudWxsLFxuICAgIHVybCAgICAgICAgICA6IG51bGwsXG4gICAgY2hhbm5lbCAgICAgIDogbnVsbCxcbiAgICBwdWJsaXNoU3VibWl0OiBudWxsLFxuICB9LFxuICBmaWxlICAgIDogbnVsbCxcbiAgY2xhaW0gICA6ICcnLFxuICBtZXRhZGF0YToge1xuICAgIHRpdGxlICAgICAgOiAnJyxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgbGljZW5zZSAgICA6ICcnLFxuICAgIG5zZncgICAgICAgOiBmYWxzZSxcbiAgfSxcbiAgdGh1bWJuYWlsOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5GSUxFX1NFTEVDVEVEOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGluaXRpYWxTdGF0ZSwgeyAgLy8gbm90ZTogY2xlYXJzIHRvIGluaXRpYWwgc3RhdGVcbiAgICAgICAgZmlsZTogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9DTEVBUjpcbiAgICAgIHJldHVybiBpbml0aWFsU3RhdGU7XG4gICAgY2FzZSBhY3Rpb25zLk1FVEFEQVRBX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBtZXRhZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubWV0YWRhdGEsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEubmFtZV06IGFjdGlvbi5kYXRhLnZhbHVlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DTEFJTV9VUERBVEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgY2xhaW06IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFVF9QVUJMSVNIX0lOX0NIQU5ORUw6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcHVibGlzaEluQ2hhbm5lbDogYWN0aW9uLmNoYW5uZWwsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuUFVCTElTSF9TVEFUVVNfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHN0YXR1czogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRVJST1JfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGVycm9yOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5lcnJvciwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5uYW1lXTogYWN0aW9uLmRhdGEudmFsdWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlNFTEVDVEVEX0NIQU5ORUxfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHNlbGVjdGVkQ2hhbm5lbDogYWN0aW9uLmRhdGEsXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuVE9HR0xFX01FVEFEQVRBX0lOUFVUUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzaG93TWV0YWRhdGFJbnB1dHM6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgY2FzZSBhY3Rpb25zLlRIVU1CTkFJTF9ORVc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgdGh1bWJuYWlsOiBhY3Rpb24uZGF0YSxcbiAgICAgIH0pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9wdWJsaXNoLmpzIiwiaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvY2hhbm5lbF9hY3Rpb25fdHlwZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGxvZ2dlZEluQ2hhbm5lbDoge1xuICAgIG5hbWUgICA6IG51bGwsXG4gICAgc2hvcnRJZDogbnVsbCxcbiAgICBsb25nSWQgOiBudWxsLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBsb2dnZWRJbkNoYW5uZWw6IGFjdGlvbi5kYXRhLFxuICAgICAgfSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3JlZHVjZXJzL2NoYW5uZWwuanMiLCJpbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJ2NvbnN0YW50cy9zaG93X2FjdGlvbl90eXBlcyc7XG5pbXBvcnQgeyBMT0NBTF9DSEVDSywgRVJST1IgfSBmcm9tICdjb25zdGFudHMvYXNzZXRfZGlzcGxheV9zdGF0ZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHJlcXVlc3Q6IHtcbiAgICBlcnJvcjogbnVsbCxcbiAgICB0eXBlIDogbnVsbCxcbiAgICBpZCAgIDogbnVsbCxcbiAgfSxcbiAgcmVxdWVzdExpc3QgOiB7fSxcbiAgY2hhbm5lbExpc3QgOiB7fSxcbiAgYXNzZXRMaXN0ICAgOiB7fSxcbiAgZGlzcGxheUFzc2V0OiB7XG4gICAgZXJyb3IgOiBudWxsLFxuICAgIHN0YXR1czogTE9DQUxfQ0hFQ0ssXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgLy8gaGFuZGxlIHJlcXVlc3RcbiAgICBjYXNlIGFjdGlvbnMuUkVRVUVTVF9FUlJPUjpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0LCB7XG4gICAgICAgICAgZXJyb3I6IGFjdGlvbi5kYXRhLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5SRVFVRVNUX1VQREFURTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICByZXF1ZXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZXF1ZXN0LCB7XG4gICAgICAgICAgdHlwZTogYWN0aW9uLmRhdGEucmVxdWVzdFR5cGUsXG4gICAgICAgICAgaWQgIDogYWN0aW9uLmRhdGEucmVxdWVzdElkLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIHN0b3JlIHJlcXVlc3RzXG4gICAgY2FzZSBhY3Rpb25zLlJFUVVFU1RfTElTVF9BREQ6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcmVxdWVzdExpc3Q6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlcXVlc3RMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgZXJyb3I6IGFjdGlvbi5kYXRhLmVycm9yLFxuICAgICAgICAgICAga2V5ICA6IGFjdGlvbi5kYXRhLmtleSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGFzc2V0IGRhdGFcbiAgICBjYXNlIGFjdGlvbnMuQVNTRVRfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGFzc2V0TGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXNzZXRMaXN0LCB7XG4gICAgICAgICAgW2FjdGlvbi5kYXRhLmlkXToge1xuICAgICAgICAgICAgZXJyb3IgICAgOiBhY3Rpb24uZGF0YS5lcnJvcixcbiAgICAgICAgICAgIG5hbWUgICAgIDogYWN0aW9uLmRhdGEubmFtZSxcbiAgICAgICAgICAgIGNsYWltSWQgIDogYWN0aW9uLmRhdGEuY2xhaW1JZCxcbiAgICAgICAgICAgIHNob3J0SWQgIDogYWN0aW9uLmRhdGEuc2hvcnRJZCxcbiAgICAgICAgICAgIGNsYWltRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1EYXRhLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgLy8gY2hhbm5lbCBkYXRhXG4gICAgY2FzZSBhY3Rpb25zLkNIQU5ORUxfQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNoYW5uZWxMaXN0OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jaGFubmVsTGlzdCwge1xuICAgICAgICAgIFthY3Rpb24uZGF0YS5pZF06IHtcbiAgICAgICAgICAgIG5hbWUgICAgICA6IGFjdGlvbi5kYXRhLm5hbWUsXG4gICAgICAgICAgICBsb25nSWQgICAgOiBhY3Rpb24uZGF0YS5sb25nSWQsXG4gICAgICAgICAgICBzaG9ydElkICAgOiBhY3Rpb24uZGF0YS5zaG9ydElkLFxuICAgICAgICAgICAgY2xhaW1zRGF0YTogYWN0aW9uLmRhdGEuY2xhaW1zRGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIGNhc2UgYWN0aW9ucy5DSEFOTkVMX0NMQUlNU19VUERBVEVfU1VDQ0VTUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBjaGFubmVsTGlzdDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY2hhbm5lbExpc3QsIHtcbiAgICAgICAgICBbYWN0aW9uLmRhdGEuY2hhbm5lbExpc3RJZF06IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNoYW5uZWxMaXN0W2FjdGlvbi5kYXRhLmNoYW5uZWxMaXN0SWRdLCB7XG4gICAgICAgICAgICBjbGFpbXNEYXRhOiBhY3Rpb24uZGF0YS5jbGFpbXNEYXRhLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgIC8vIGRpc3BsYXkgYW4gYXNzZXRcbiAgICBjYXNlIGFjdGlvbnMuRklMRV9BVkFJTEFCSUxJVFlfVVBEQVRFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRpc3BsYXlBc3NldDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuZGlzcGxheUFzc2V0LCB7XG4gICAgICAgICAgc3RhdHVzOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBjYXNlIGFjdGlvbnMuRElTUExBWV9BU1NFVF9FUlJPUjpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBkaXNwbGF5QXNzZXQ6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmRpc3BsYXlBc3NldCwge1xuICAgICAgICAgIGVycm9yIDogYWN0aW9uLmRhdGEsXG4gICAgICAgICAgc3RhdHVzOiBFUlJPUixcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvcmVkdWNlcnMvc2hvdy5qcyIsImNvbnN0IHNpdGVDb25maWcgPSByZXF1aXJlKCcuLi8uLi9jb25maWcvc2l0ZUNvbmZpZy5qcycpO1xuXG5jb25zdCB7XG4gIGFuYWx5dGljczoge1xuICAgIGdvb2dsZUlkOiBnb29nbGVBbmFseXRpY3NJZCxcbiAgfSxcbiAgYXNzZXREZWZhdWx0czoge1xuICAgIHRodW1ibmFpbDogZGVmYXVsdFRodW1ibmFpbCxcbiAgICBkZXNjcmlwdGlvbjogZGVmYXVsdERlc2NyaXB0aW9uLFxuICB9LFxuICBkZXRhaWxzOiB7XG4gICAgZGVzY3JpcHRpb24sXG4gICAgaG9zdCxcbiAgICB0aXRsZSxcbiAgICB0d2l0dGVyLFxuICB9LFxufSA9IHNpdGVDb25maWc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGVzY3JpcHRpb24sXG4gIGdvb2dsZUFuYWx5dGljc0lkLFxuICBob3N0LFxuICB0aXRsZSxcbiAgdHdpdHRlcixcbiAgZGVmYXVsdERlc2NyaXB0aW9uLFxuICBkZWZhdWx0VGh1bWJuYWlsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9yZWR1Y2Vycy9zaXRlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1nYVwiXG4vLyBtb2R1bGUgaWQgPSAxNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3Jvc3MtZmV0Y2gvcG9seWZpbGxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjcm9zcy1mZXRjaC9wb2x5ZmlsbFwiXG4vLyBtb2R1bGUgaWQgPSAxNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBzZW5kR0FTZXJ2ZUV2ZW50IH0gPSByZXF1aXJlKCcuLi9oZWxwZXJzL2dvb2dsZUFuYWx5dGljcycpO1xuY29uc3QgeyBkZXRlcm1pbmVSZXNwb25zZVR5cGUsIGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHksIGxvZ1JlcXVlc3REYXRhLCBnZXRDbGFpbUlkQW5kU2VydmVBc3NldCB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9zZXJ2ZUhlbHBlcnMuanMnKTtcbmNvbnN0IGxicnlVcmkgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2xicnlVcmkuanMnKTtcbmNvbnN0IGhhbmRsZVNob3dSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVNob3dSZW5kZXIuanN4Jyk7XG5jb25zdCBTRVJWRSA9ICdTRVJWRSc7XG5cbm1vZHVsZS5leHBvcnRzID0gKGFwcCkgPT4ge1xuICAvLyByb3V0ZSB0byBzZXJ2ZSBhIHNwZWNpZmljIGFzc2V0IHVzaW5nIHRoZSBjaGFubmVsIG9yIGNsYWltIGlkXG4gIGFwcC5nZXQoJy86aWRlbnRpZmllci86Y2xhaW0nLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCwgcGFyYW1zIH0gPSByZXE7XG4gICAgLy8gZGVjaWRlIGlmIHRoaXMgaXMgYSBzaG93IHJlcXVlc3RcbiAgICBsZXQgaGFzRmlsZUV4dGVuc2lvbjtcbiAgICB0cnkge1xuICAgICAgKHsgaGFzRmlsZUV4dGVuc2lvbiB9ID0gbGJyeVVyaS5wYXJzZU1vZGlmaWVyKHBhcmFtcy5jbGFpbSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZVR5cGUgPSBkZXRlcm1pbmVSZXNwb25zZVR5cGUoaGFzRmlsZUV4dGVuc2lvbiwgaGVhZGVycyk7XG4gICAgaWYgKHJlc3BvbnNlVHlwZSAhPT0gU0VSVkUpIHtcbiAgICAgIHJldHVybiBoYW5kbGVTaG93UmVuZGVyKHJlcSwgcmVzKTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHNlcnZlIHJlcXVlc3RcbiAgICAvLyBzZW5kIGdvb2dsZSBhbmFseXRpY3NcbiAgICBzZW5kR0FTZXJ2ZUV2ZW50KGhlYWRlcnMsIGlwLCBvcmlnaW5hbFVybCk7XG4gICAgLy8gcGFyc2UgdGhlIGNsYWltXG4gICAgbGV0IGNsYWltTmFtZTtcbiAgICB0cnkge1xuICAgICAgKHsgY2xhaW1OYW1lIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0ocGFyYW1zLmNsYWltKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7c3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICB9XG4gICAgLy8gcGFyc2UgdGhlIGlkZW50aWZpZXJcbiAgICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQ7XG4gICAgdHJ5IHtcbiAgICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihwYXJhbXMuaWRlbnRpZmllcikpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlfSk7XG4gICAgfVxuICAgIGlmICghaXNDaGFubmVsKSB7XG4gICAgICBbY2xhaW1JZCwgY2xhaW1OYW1lXSA9IGZsaXBDbGFpbU5hbWVBbmRJZEZvckJhY2t3YXJkc0NvbXBhdGliaWxpdHkoY2xhaW1JZCwgY2xhaW1OYW1lKTtcbiAgICB9XG4gICAgLy8gbG9nIHRoZSByZXF1ZXN0IGRhdGEgZm9yIGRlYnVnZ2luZ1xuICAgIGxvZ1JlcXVlc3REYXRhKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCk7XG4gICAgLy8gZ2V0IHRoZSBjbGFpbSBJZCBhbmQgdGhlbiBzZXJ2ZSB0aGUgYXNzZXRcbiAgICBnZXRDbGFpbUlkQW5kU2VydmVBc3NldChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpO1xuICB9KTtcbiAgLy8gcm91dGUgdG8gc2VydmUgdGhlIHdpbm5pbmcgYXNzZXQgYXQgYSBjbGFpbSBvciBhIGNoYW5uZWwgcGFnZVxuICBhcHAuZ2V0KCcvOmNsYWltJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyBoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwsIHBhcmFtcyB9ID0gcmVxO1xuICAgIC8vIGRlY2lkZSBpZiB0aGlzIGlzIGEgc2hvdyByZXF1ZXN0XG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb247XG4gICAgdHJ5IHtcbiAgICAgICh7IGhhc0ZpbGVFeHRlbnNpb24gfSA9IGxicnlVcmkucGFyc2VNb2RpZmllcihwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2VUeXBlID0gZGV0ZXJtaW5lUmVzcG9uc2VUeXBlKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpO1xuICAgIGlmIChyZXNwb25zZVR5cGUgIT09IFNFUlZFKSB7XG4gICAgICByZXR1cm4gaGFuZGxlU2hvd1JlbmRlcihyZXEsIHJlcyk7XG4gICAgfVxuICAgIC8vIGhhbmRsZSBzZXJ2ZSByZXF1ZXN0XG4gICAgLy8gc2VuZCBnb29nbGUgYW5hbHl0aWNzXG4gICAgc2VuZEdBU2VydmVFdmVudChoZWFkZXJzLCBpcCwgb3JpZ2luYWxVcmwpO1xuICAgIC8vIHBhcnNlIHRoZSBjbGFpbVxuICAgIGxldCBjbGFpbU5hbWU7XG4gICAgdHJ5IHtcbiAgICAgICh7Y2xhaW1OYW1lfSA9IGxicnlVcmkucGFyc2VDbGFpbShwYXJhbXMuY2xhaW0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgIH1cbiAgICAvLyBsb2cgdGhlIHJlcXVlc3QgZGF0YSBmb3IgZGVidWdnaW5nXG4gICAgbG9nUmVxdWVzdERhdGEocmVzcG9uc2VUeXBlLCBjbGFpbU5hbWUsIG51bGwsIG51bGwpO1xuICAgIC8vIGdldCB0aGUgY2xhaW0gSWQgYW5kIHRoZW4gc2VydmUgdGhlIGFzc2V0XG4gICAgZ2V0Q2xhaW1JZEFuZFNlcnZlQXNzZXQobnVsbCwgbnVsbCwgY2xhaW1OYW1lLCBudWxsLCBvcmlnaW5hbFVybCwgaXAsIHJlcyk7XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9yb3V0ZXMvYXNzZXQtcm91dGVzLmpzIiwiY29uc3QgbG9nZ2VyID0gcmVxdWlyZSgnd2luc3RvbicpO1xuY29uc3QgeyBnZXRDbGFpbUlkLCBnZXRMb2NhbEZpbGVSZWNvcmQgfSA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3NlcnZlQ29udHJvbGxlci5qcycpO1xuY29uc3QgeyBoYW5kbGVFcnJvclJlc3BvbnNlIH0gPSByZXF1aXJlKCcuL2Vycm9ySGFuZGxlcnMuanMnKTtcblxuY29uc3QgU0VSVkUgPSAnU0VSVkUnO1xuY29uc3QgU0hPVyA9ICdTSE9XJztcbmNvbnN0IE5PX0ZJTEUgPSAnTk9fRklMRSc7XG5jb25zdCBOT19DSEFOTkVMID0gJ05PX0NIQU5ORUwnO1xuY29uc3QgTk9fQ0xBSU0gPSAnTk9fQ0xBSU0nO1xuXG5mdW5jdGlvbiBjbGllbnRBY2NlcHRzSHRtbCAoe2FjY2VwdH0pIHtcbiAgcmV0dXJuIGFjY2VwdCAmJiBhY2NlcHQubWF0Y2goL3RleHRcXC9odG1sLyk7XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0SXNGcm9tQnJvd3NlciAoaGVhZGVycykge1xuICByZXR1cm4gaGVhZGVyc1sndXNlci1hZ2VudCddICYmIGhlYWRlcnNbJ3VzZXItYWdlbnQnXS5tYXRjaCgvTW96aWxsYS8pO1xufTtcblxuZnVuY3Rpb24gY2xpZW50V2FudHNBc3NldCAoe2FjY2VwdCwgcmFuZ2V9KSB7XG4gIGNvbnN0IGltYWdlSXNXYW50ZWQgPSBhY2NlcHQgJiYgYWNjZXB0Lm1hdGNoKC9pbWFnZVxcLy4qLykgJiYgIWFjY2VwdC5tYXRjaCgvdGV4dFxcL2h0bWwvKSAmJiAhYWNjZXB0Lm1hdGNoKC90ZXh0XFwvXFwqLyk7XG4gIGNvbnN0IHZpZGVvSXNXYW50ZWQgPSBhY2NlcHQgJiYgcmFuZ2U7XG4gIHJldHVybiBpbWFnZUlzV2FudGVkIHx8IHZpZGVvSXNXYW50ZWQ7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkQ2xhaW1JZCAoY2xhaW1JZCkge1xuICByZXR1cm4gKChjbGFpbUlkLmxlbmd0aCA9PT0gNDApICYmICEvW15BLVphLXowLTldL2cudGVzdChjbGFpbUlkKSk7XG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZCAoY2xhaW1JZCkge1xuICByZXR1cm4gY2xhaW1JZC5sZW5ndGggPT09IDE7ICAvLyBpdCBzaG91bGQgcmVhbGx5IGV2YWx1YXRlIHRoZSBzaG9ydCB1cmwgaXRzZWxmXG59O1xuXG5mdW5jdGlvbiBpc1ZhbGlkU2hvcnRJZE9yQ2xhaW1JZCAoaW5wdXQpIHtcbiAgcmV0dXJuIChpc1ZhbGlkQ2xhaW1JZChpbnB1dCkgfHwgaXNWYWxpZFNob3J0SWQoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIHNlcnZlQXNzZXRUb0NsaWVudCAoY2xhaW1JZCwgbmFtZSwgcmVzKSB7XG4gIHJldHVybiBnZXRMb2NhbEZpbGVSZWNvcmQoY2xhaW1JZCwgbmFtZSlcbiAgICAudGhlbihmaWxlUmVjb3JkID0+IHtcbiAgICAgIC8vIGNoZWNrIHRoYXQgYSBsb2NhbCByZWNvcmQgd2FzIGZvdW5kXG4gICAgICBpZiAoZmlsZVJlY29yZCA9PT0gTk9fRklMRSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygzMDcpLnJlZGlyZWN0KGAvYXBpL2NsYWltL2dldC8ke25hbWV9LyR7Y2xhaW1JZH1gKTtcbiAgICAgIH1cbiAgICAgIC8vIHNlcnZlIHRoZSBmaWxlXG4gICAgICBjb25zdCB7ZmlsZVBhdGgsIGZpbGVUeXBlfSA9IGZpbGVSZWNvcmQ7XG4gICAgICBsb2dnZXIudmVyYm9zZShgc2VydmluZyBmaWxlOiAke2ZpbGVQYXRofWApO1xuICAgICAgY29uc3Qgc2VuZEZpbGVPcHRpb25zID0ge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ1gtQ29udGVudC1UeXBlLU9wdGlvbnMnOiAnbm9zbmlmZicsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZScgICAgICAgICAgOiBmaWxlVHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmRGaWxlKGZpbGVQYXRoLCBzZW5kRmlsZU9wdGlvbnMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENsYWltSWRBbmRTZXJ2ZUFzc2V0IChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltTmFtZSwgY2xhaW1JZCwgb3JpZ2luYWxVcmwsIGlwLCByZXMpIHtcbiAgICAvLyBnZXQgdGhlIGNsYWltIElkIGFuZCB0aGVuIHNlcnZlIHRoZSBhc3NldFxuICAgIGdldENsYWltSWQoY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbU5hbWUsIGNsYWltSWQpXG4gICAgICAudGhlbihmdWxsQ2xhaW1JZCA9PiB7XG4gICAgICAgIGlmIChmdWxsQ2xhaW1JZCA9PT0gTk9fQ0xBSU0pIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2xhaW0gaWQgY291bGQgYmUgZm91bmQnfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZnVsbENsYWltSWQgPT09IE5PX0NIQU5ORUwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe3N1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiAnbm8gY2hhbm5lbCBpZCBjb3VsZCBiZSBmb3VuZCd9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXJ2ZUFzc2V0VG9DbGllbnQoZnVsbENsYWltSWQsIGNsYWltTmFtZSwgcmVzKTtcbiAgICAgICAgLy8gcG9zdFRvU3RhdHMocmVzcG9uc2VUeXBlLCBvcmlnaW5hbFVybCwgaXAsIGNsYWltTmFtZSwgZnVsbENsYWltSWQsICdzdWNjZXNzJyk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaGFuZGxlRXJyb3JSZXNwb25zZShvcmlnaW5hbFVybCwgaXAsIGVycm9yLCByZXMpO1xuICAgICAgICAvLyBwb3N0VG9TdGF0cyhyZXNwb25zZVR5cGUsIG9yaWdpbmFsVXJsLCBpcCwgY2xhaW1OYW1lLCBmdWxsQ2xhaW1JZCwgJ2ZhaWwnKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZXRlcm1pbmVSZXNwb25zZVR5cGUgKGhhc0ZpbGVFeHRlbnNpb24sIGhlYWRlcnMpIHtcbiAgICBsZXQgcmVzcG9uc2VUeXBlO1xuICAgIGlmIChoYXNGaWxlRXh0ZW5zaW9uKSB7XG4gICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTsgIC8vIGFzc3VtZSBhIHNlcnZlIHJlcXVlc3QgaWYgZmlsZSBleHRlbnNpb24gaXMgcHJlc2VudFxuICAgICAgaWYgKGNsaWVudEFjY2VwdHNIdG1sKGhlYWRlcnMpKSB7ICAvLyBpZiB0aGUgcmVxdWVzdCBjb21lcyBmcm9tIGEgYnJvd3NlciwgY2hhbmdlIGl0IHRvIGEgc2hvdyByZXF1ZXN0XG4gICAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IFNIT1c7XG4gICAgICBpZiAoY2xpZW50V2FudHNBc3NldChoZWFkZXJzKSAmJiByZXF1ZXN0SXNGcm9tQnJvd3NlcihoZWFkZXJzKSkgeyAgLy8gdGhpcyBpcyBpbiBjYXNlIHNvbWVvbmUgZW1iZWRzIGEgc2hvdyB1cmxcbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdTaG93IHJlcXVlc3QgY2FtZSBmcm9tIGJyb3dzZXIgYnV0IHdhbnRzIGFuIGltYWdlL3ZpZGVvLiBDaGFuZ2luZyByZXNwb25zZSB0byBzZXJ2ZS4uLicpO1xuICAgICAgICByZXNwb25zZVR5cGUgPSBTRVJWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgfSxcbiAgZmxpcENsYWltTmFtZUFuZElkRm9yQmFja3dhcmRzQ29tcGF0aWJpbGl0eSAoaWRlbnRpZmllciwgbmFtZSkge1xuICAgIC8vIHRoaXMgaXMgYSBwYXRjaCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdHkgd2l0aCAnL25hbWUvY2xhaW1faWQnIHVybCBmb3JtYXRcbiAgICBpZiAoaXNWYWxpZFNob3J0SWRPckNsYWltSWQobmFtZSkgJiYgIWlzVmFsaWRTaG9ydElkT3JDbGFpbUlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0ZW1wTmFtZSA9IG5hbWU7XG4gICAgICBuYW1lID0gaWRlbnRpZmllcjtcbiAgICAgIGlkZW50aWZpZXIgPSB0ZW1wTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIFtpZGVudGlmaWVyLCBuYW1lXTtcbiAgfSxcbiAgbG9nUmVxdWVzdERhdGEgKHJlc3BvbnNlVHlwZSwgY2xhaW1OYW1lLCBjaGFubmVsTmFtZSwgY2xhaW1JZCkge1xuICAgIGxvZ2dlci5kZWJ1ZygncmVzcG9uc2VUeXBlID09PScsIHJlc3BvbnNlVHlwZSk7XG4gICAgbG9nZ2VyLmRlYnVnKCdjbGFpbSBuYW1lID09PSAnLCBjbGFpbU5hbWUpO1xuICAgIGxvZ2dlci5kZWJ1ZygnY2hhbm5lbCBuYW1lID09PScsIGNoYW5uZWxOYW1lKTtcbiAgICBsb2dnZXIuZGVidWcoJ2NsYWltIGlkID09PScsIGNsYWltSWQpO1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL3NlcnZlSGVscGVycy5qcyIsImNvbnN0IGxvZ2dlciA9IHJlcXVpcmUoJ3dpbnN0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJFR0VYUF9JTlZBTElEX0NMQUlNICA6IC9bXkEtWmEtejAtOS1dL2csXG4gIFJFR0VYUF9JTlZBTElEX0NIQU5ORUw6IC9bXkEtWmEtejAtOS1AXS9nLFxuICBSRUdFWFBfQUREUkVTUyAgICAgICAgOiAvXmIoPz1bXjBPSWxdezMyLDMzfSlbMC05QS1aYS16XXszMiwzM30kLyxcbiAgQ0hBTk5FTF9DSEFSICAgICAgICAgIDogJ0AnLFxuICBwYXJzZUlkZW50aWZpZXIgICAgICAgOiBmdW5jdGlvbiAoaWRlbnRpZmllcikge1xuICAgIGxvZ2dlci5kZWJ1ZygncGFyc2luZyBpZGVudGlmaWVyOicsIGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjL10qKScgKyAvLyB2YWx1ZSAoc3RvcHMgYXQgdGhlIGZpcnN0IHNlcGFyYXRvciBvciBlbmQpXG4gICAgICAnKFs6JCNdPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCB2YWx1ZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoaWRlbnRpZmllcilcbiAgICAgIC5tYXAobWF0Y2ggPT4gbWF0Y2ggfHwgbnVsbCk7XG4gICAgbG9nZ2VyLmRlYnVnKGAke3Byb3RvfSwgJHt2YWx1ZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIHByb2Nlc3MgbmFtZVxuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hlY2sgeW91ciB1cmwuICBObyBjaGFubmVsIG5hbWUgcHJvdmlkZWQgYmVmb3JlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cImApO1xuICAgIH1cbiAgICBjb25zdCBpc0NoYW5uZWwgPSB2YWx1ZS5zdGFydHNXaXRoKG1vZHVsZS5leHBvcnRzLkNIQU5ORUxfQ0hBUik7XG4gICAgY29uc3QgY2hhbm5lbE5hbWUgPSBpc0NoYW5uZWwgPyB2YWx1ZSA6IG51bGw7XG4gICAgbGV0IGNsYWltSWQ7XG4gICAgaWYgKGlzQ2hhbm5lbCkge1xuICAgICAgaWYgKCFjaGFubmVsTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5uZWwgbmFtZSBhZnRlciBALicpO1xuICAgICAgfVxuICAgICAgY29uc3QgbmFtZUJhZENoYXJzID0gKGNoYW5uZWxOYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DSEFOTkVMKTtcbiAgICAgIGlmIChuYW1lQmFkQ2hhcnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2hhbm5lbCBuYW1lOiAke25hbWVCYWRDaGFycy5qb2luKCcsICcpfS5gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2xhaW1JZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGNoYW5uZWxDbGFpbUlkO1xuICAgIGlmIChtb2RpZmllclNlcGVyYXRvcikge1xuICAgICAgaWYgKCFtb2RpZmllcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1vZGlmaWVyIHByb3ZpZGVkIGFmdGVyIHNlcGFyYXRvciBcIiR7bW9kaWZpZXJTZXBlcmF0b3J9XCJgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yID09PSAnOicpIHtcbiAgICAgICAgY2hhbm5lbENsYWltSWQgPSBtb2RpZmllcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIFwiJHttb2RpZmllclNlcGVyYXRvcn1cIiBtb2RpZmllciBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGFubmVsLFxuICAgICAgY2hhbm5lbE5hbWUsXG4gICAgICBjaGFubmVsQ2xhaW1JZCxcbiAgICAgIGNsYWltSWQsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VDbGFpbTogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG5hbWU6JywgY2xhaW0pO1xuICAgIGNvbnN0IGNvbXBvbmVudHNSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgICAnKFteOiQjLy5dKiknICsgLy8gbmFtZSAoc3RvcHMgYXQgdGhlIGZpcnN0IG1vZGlmaWVyKVxuICAgICAgJyhbOiQjLl0/KShbXi9dKiknIC8vIG1vZGlmaWVyIHNlcGFyYXRvciwgbW9kaWZpZXIgKHN0b3BzIGF0IHRoZSBmaXJzdCBwYXRoIHNlcGFyYXRvciBvciBlbmQpXG4gICAgKTtcbiAgICBjb25zdCBbcHJvdG8sIGNsYWltTmFtZSwgbW9kaWZpZXJTZXBlcmF0b3IsIG1vZGlmaWVyXSA9IGNvbXBvbmVudHNSZWdleFxuICAgICAgLmV4ZWMoY2xhaW0pXG4gICAgICAubWFwKG1hdGNoID0+IG1hdGNoIHx8IG51bGwpO1xuICAgIGxvZ2dlci5kZWJ1ZyhgJHtwcm90b30sICR7Y2xhaW1OYW1lfSwgJHttb2RpZmllclNlcGVyYXRvcn0sICR7bW9kaWZpZXJ9YCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBhbmQgcHJvY2VzcyBuYW1lXG4gICAgaWYgKCFjbGFpbU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2xhaW0gbmFtZSBwcm92aWRlZCBiZWZvcmUgLicpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lQmFkQ2hhcnMgPSAoY2xhaW1OYW1lKS5tYXRjaChtb2R1bGUuZXhwb3J0cy5SRUdFWFBfSU5WQUxJRF9DTEFJTSk7XG4gICAgaWYgKG5hbWVCYWRDaGFycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGNoYXJhY3RlcnMgaW4gY2xhaW0gbmFtZTogJHtuYW1lQmFkQ2hhcnMuam9pbignLCAnKX0uYCk7XG4gICAgfVxuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yKSB7XG4gICAgICBpZiAoIW1vZGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZmlsZSBleHRlbnNpb24gcHJvdmlkZWQgYWZ0ZXIgc2VwYXJhdG9yICR7bW9kaWZpZXJTZXBlcmF0b3J9LmApO1xuICAgICAgfVxuICAgICAgaWYgKG1vZGlmaWVyU2VwZXJhdG9yICE9PSAnLicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJHttb2RpZmllclNlcGVyYXRvcn0gbW9kaWZpZXIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY2xhaW0gbmFtZWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gcmVzdWx0c1xuICAgIHJldHVybiB7XG4gICAgICBjbGFpbU5hbWUsXG4gICAgfTtcbiAgfSxcbiAgcGFyc2VNb2RpZmllcjogZnVuY3Rpb24gKGNsYWltKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdwYXJzaW5nIG1vZGlmaWVyOicsIGNsYWltKTtcbiAgICBjb25zdCBjb21wb25lbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgJyhbXjokIy8uXSopJyArIC8vIG5hbWUgKHN0b3BzIGF0IHRoZSBmaXJzdCBtb2RpZmllcilcbiAgICAgICcoWzokIy5dPykoW14vXSopJyAvLyBtb2RpZmllciBzZXBhcmF0b3IsIG1vZGlmaWVyIChzdG9wcyBhdCB0aGUgZmlyc3QgcGF0aCBzZXBhcmF0b3Igb3IgZW5kKVxuICAgICk7XG4gICAgY29uc3QgW3Byb3RvLCBjbGFpbU5hbWUsIG1vZGlmaWVyU2VwZXJhdG9yLCBtb2RpZmllcl0gPSBjb21wb25lbnRzUmVnZXhcbiAgICAgIC5leGVjKGNsYWltKVxuICAgICAgLm1hcChtYXRjaCA9PiBtYXRjaCB8fCBudWxsKTtcbiAgICBsb2dnZXIuZGVidWcoYCR7cHJvdG99LCAke2NsYWltTmFtZX0sICR7bW9kaWZpZXJTZXBlcmF0b3J9LCAke21vZGlmaWVyfWApO1xuICAgIC8vIFZhbGlkYXRlIGFuZCBwcm9jZXNzIG1vZGlmaWVyXG4gICAgbGV0IGhhc0ZpbGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICBpZiAobW9kaWZpZXJTZXBlcmF0b3IpIHtcbiAgICAgIGhhc0ZpbGVFeHRlbnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGFzRmlsZUV4dGVuc2lvbixcbiAgICB9O1xuICB9LFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2xicnlVcmkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUmVkdWNlciBmcm9tICcuLi8uLi9jbGllbnQvcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBHQUxpc3RlbmVyIGZyb20gJy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0dBTGlzdGVuZXIvaW5kZXgnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi8uLi9jbGllbnQvYXBwJztcbmltcG9ydCByZW5kZXJGdWxsUGFnZSBmcm9tICcuL3JlbmRlckZ1bGxQYWdlJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgaGFuZGxlU2hvd1BhZ2VVcmkgfSBmcm9tICcuLi8uLi9jbGllbnQvc2FnYXMvc2hvd191cmknO1xuaW1wb3J0IHsgb25IYW5kbGVTaG93UGFnZVVyaSB9IGZyb20gJy4uLy4uL2NsaWVudC9hY3Rpb25zL3Nob3cnO1xuXG5pbXBvcnQgSGVsbWV0IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5cbmNvbnN0IHJldHVyblNhZ2FXaXRoUGFyYW1zID0gKHNhZ2EsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gKiAoKSB7XG4gICAgeWllbGQgY2FsbChzYWdhLCBwYXJhbXMpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMpID0+IHtcbiAgbGV0IGNvbnRleHQgPSB7fTtcblxuICAvLyBjcmVhdGUgYW5kIGFwcGx5IG1pZGRsZXdhcmVcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xuICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgYSBuZXcgUmVkdXggc3RvcmUgaW5zdGFuY2VcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShSZWR1Y2VyLCBtaWRkbGV3YXJlKTtcblxuICAvLyBjcmVhdGUgc2FnYVxuICBjb25zdCBhY3Rpb24gPSBvbkhhbmRsZVNob3dQYWdlVXJpKHJlcS5wYXJhbXMpO1xuICBjb25zdCBzYWdhID0gcmV0dXJuU2FnYVdpdGhQYXJhbXMoaGFuZGxlU2hvd1BhZ2VVcmksIGFjdGlvbik7XG5cbiAgLy8gcnVuIHRoZSBzYWdhIG1pZGRsZXdhcmVcbiAgc2FnYU1pZGRsZXdhcmVcbiAgICAucnVuKHNhZ2EpXG4gICAgLmRvbmVcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICAvLyByZW5kZXIgY29tcG9uZW50IHRvIGEgc3RyaW5nXG4gICAgICBjb25zdCBodG1sID0gcmVuZGVyVG9TdHJpbmcoXG4gICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3JlcS51cmx9IGNvbnRleHQ9e2NvbnRleHR9PlxuICAgICAgICAgICAgPEdBTGlzdGVuZXI+XG4gICAgICAgICAgICAgIDxBcHAgLz5cbiAgICAgICAgICAgIDwvR0FMaXN0ZW5lcj5cbiAgICAgICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICk7XG5cbiAgICAgIC8vIGdldCBoZWFkIHRhZ3MgZnJvbSBoZWxtZXRcbiAgICAgIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKTtcblxuICAgICAgLy8gY2hlY2sgZm9yIGEgcmVkaXJlY3RcbiAgICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgY29udGV4dC51cmwpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIGluaXRpYWwgc3RhdGUgZnJvbSBvdXIgUmVkdXggc3RvcmVcbiAgICAgIGNvbnN0IHByZWxvYWRlZFN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgICAgLy8gc2VuZCB0aGUgcmVuZGVyZWQgcGFnZSBiYWNrIHRvIHRoZSBjbGllbnRcbiAgICAgIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKGhlbG1ldCwgaHRtbCwgcHJlbG9hZGVkU3RhdGUpKTtcbiAgICB9KTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9oYW5kbGVTaG93UmVuZGVyLmpzeCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCJcbi8vIG1vZHVsZSBpZCA9IDE1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjYWxsLCBwdXQsIHRha2VMYXRlc3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICdjb25zdGFudHMvc2hvd19hY3Rpb25fdHlwZXMnO1xuaW1wb3J0IHsgb25SZXF1ZXN0RXJyb3IsIG9uTmV3Q2hhbm5lbFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IG5ld0Fzc2V0UmVxdWVzdCB9IGZyb20gJ3NhZ2FzL3Nob3dfYXNzZXQnO1xuaW1wb3J0IHsgbmV3Q2hhbm5lbFJlcXVlc3QgfSBmcm9tICdzYWdhcy9zaG93X2NoYW5uZWwnO1xuaW1wb3J0IGxicnlVcmkgZnJvbSAndXRpbHMvbGJyeVVyaSc7XG5cbmZ1bmN0aW9uICogcGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0gKG1vZGlmaWVyLCBjbGFpbSkge1xuICAvLyB0aGlzIGlzIGEgcmVxdWVzdCBmb3IgYW4gYXNzZXRcbiAgLy8gY2xhaW0gd2lsbCBiZSBhbiBhc3NldCBjbGFpbVxuICAvLyB0aGUgaWRlbnRpZmllciBjb3VsZCBiZSBhIGNoYW5uZWwgb3IgYSBjbGFpbSBpZFxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQsIGNsYWltSWQsIGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7IGlzQ2hhbm5lbCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxDbGFpbUlkLCBjbGFpbUlkIH0gPSBsYnJ5VXJpLnBhcnNlSWRlbnRpZmllcihtb2RpZmllcikpO1xuICAgICh7IGNsYWltTmFtZSwgZXh0ZW5zaW9uIH0gPSBsYnJ5VXJpLnBhcnNlQ2xhaW0oY2xhaW0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyB0cmlnZ2VyIGFuIG5ldyBhY3Rpb24gdG8gdXBkYXRlIHRoZSBzdG9yZVxuICBpZiAoaXNDaGFubmVsKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIG51bGwsIGNoYW5uZWxOYW1lLCBjaGFubmVsQ2xhaW1JZCwgZXh0ZW5zaW9uKSk7XG4gIH07XG4gIHlpZWxkIGNhbGwobmV3QXNzZXRSZXF1ZXN0LCBvbk5ld0Fzc2V0UmVxdWVzdChjbGFpbU5hbWUsIGNsYWltSWQsIG51bGwsIG51bGwsIGV4dGVuc2lvbikpO1xufVxuZnVuY3Rpb24gKiBwYXJzZUFuZFVwZGF0ZUNsYWltT25seSAoY2xhaW0pIHtcbiAgLy8gdGhpcyBjb3VsZCBiZSBhIHJlcXVlc3QgZm9yIGFuIGFzc2V0IG9yIGEgY2hhbm5lbCBwYWdlXG4gIC8vIGNsYWltIGNvdWxkIGJlIGFuIGFzc2V0IGNsYWltIG9yIGEgY2hhbm5lbCBjbGFpbVxuICBsZXQgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQ7XG4gIHRyeSB7XG4gICAgKHsgaXNDaGFubmVsLCBjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQgfSA9IGxicnlVcmkucGFyc2VJZGVudGlmaWVyKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gdHJpZ2dlciBhbiBuZXcgYWN0aW9uIHRvIHVwZGF0ZSB0aGUgc3RvcmVcbiAgLy8gcmV0dXJuIGVhcmx5IGlmIHRoaXMgcmVxdWVzdCBpcyBmb3IgYSBjaGFubmVsXG4gIGlmIChpc0NoYW5uZWwpIHtcbiAgICByZXR1cm4geWllbGQgY2FsbChuZXdDaGFubmVsUmVxdWVzdCwgb25OZXdDaGFubmVsUmVxdWVzdChjaGFubmVsTmFtZSwgY2hhbm5lbENsYWltSWQpKTtcbiAgfVxuICAvLyBpZiBub3QgZm9yIGEgY2hhbm5lbCwgcGFyc2UgdGhlIGNsYWltIHJlcXVlc3RcbiAgbGV0IGNsYWltTmFtZSwgZXh0ZW5zaW9uO1xuICB0cnkge1xuICAgICh7Y2xhaW1OYW1lLCBleHRlbnNpb259ID0gbGJyeVVyaS5wYXJzZUNsYWltKGNsYWltKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgY2FsbChuZXdBc3NldFJlcXVlc3QsIG9uTmV3QXNzZXRSZXF1ZXN0KGNsYWltTmFtZSwgbnVsbCwgbnVsbCwgbnVsbCwgZXh0ZW5zaW9uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqIGhhbmRsZVNob3dQYWdlVXJpIChhY3Rpb24pIHtcbiAgY29uc3QgeyBpZGVudGlmaWVyLCBjbGFpbSB9ID0gYWN0aW9uLmRhdGE7XG4gIGlmIChpZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIHlpZWxkIGNhbGwocGFyc2VBbmRVcGRhdGVJZGVudGlmaWVyQW5kQ2xhaW0sIGlkZW50aWZpZXIsIGNsYWltKTtcbiAgfVxuICB5aWVsZCBjYWxsKHBhcnNlQW5kVXBkYXRlQ2xhaW1Pbmx5LCBjbGFpbSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaEhhbmRsZVNob3dQYWdlVXJpICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkhBTkRMRV9TSE9XX1VSSSwgaGFuZGxlU2hvd1BhZ2VVcmkpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X3VyaS5qcyIsImltcG9ydCB7IGNhbGwsIHB1dCwgc2VsZWN0LCB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZFJlcXVlc3RUb1JlcXVlc3RMaXN0LCBvblJlcXVlc3RFcnJvciwgb25SZXF1ZXN0VXBkYXRlLCBhZGRBc3NldFRvQXNzZXRMaXN0IH0gZnJvbSAnYWN0aW9ucy9zaG93JztcbmltcG9ydCB7IGdldExvbmdDbGFpbUlkLCBnZXRTaG9ydElkLCBnZXRDbGFpbURhdGEgfSBmcm9tICdhcGkvYXNzZXRBcGknO1xuaW1wb3J0IHsgc2VsZWN0U2hvd1N0YXRlIH0gZnJvbSAnc2VsZWN0b3JzL3Nob3cnO1xuaW1wb3J0IHsgc2VsZWN0U2l0ZUhvc3QgfSBmcm9tICdzZWxlY3RvcnMvc2l0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiAqIG5ld0Fzc2V0UmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgbmFtZSwgbW9kaWZpZXIgfSA9IGFjdGlvbi5kYXRhO1xuICAvLyBwdXQgYW4gYWN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVxdWVzdCBpbiByZWR1eFxuICB5aWVsZCBwdXQob25SZXF1ZXN0VXBkYXRlKHJlcXVlc3RUeXBlLCByZXF1ZXN0SWQpKTtcbiAgLy8gaXMgdGhpcyBhbiBleGlzdGluZyByZXF1ZXN0P1xuICAvLyBJZiB0aGlzIHVyaSBpcyBpbiB0aGUgcmVxdWVzdCBsaXN0LCBpdCdzIGFscmVhZHkgYmVlbiBmZXRjaGVkXG4gIGNvbnN0IHN0YXRlID0geWllbGQgc2VsZWN0KHNlbGVjdFNob3dTdGF0ZSk7XG4gIGNvbnN0IGhvc3QgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2l0ZUhvc3QpO1xuICBpZiAoc3RhdGUucmVxdWVzdExpc3RbcmVxdWVzdElkXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGdldCBsb25nIGlkICYmIGFkZCByZXF1ZXN0IHRvIHJlcXVlc3QgbGlzdFxuICBsZXQgbG9uZ0lkO1xuICB0cnkge1xuICAgICh7ZGF0YTogbG9uZ0lkfSA9IHlpZWxkIGNhbGwoZ2V0TG9uZ0NsYWltSWQsIGhvc3QsIG5hbWUsIG1vZGlmaWVyKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgY29uc3QgYXNzZXRLZXkgPSBgYSMke25hbWV9IyR7bG9uZ0lkfWA7XG4gIHlpZWxkIHB1dChhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdChyZXF1ZXN0SWQsIG51bGwsIGFzc2V0S2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgYXNzZXQ/XG4gIC8vIElmIHRoaXMgYXNzZXQgaXMgaW4gdGhlIGFzc2V0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmFzc2V0TGlzdFthc3NldEtleV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBnZXQgc2hvcnQgSWRcbiAgbGV0IHNob3J0SWQ7XG4gIHRyeSB7XG4gICAgKHtkYXRhOiBzaG9ydElkfSA9IHlpZWxkIGNhbGwoZ2V0U2hvcnRJZCwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gZ2V0IGFzc2V0IGNsYWltIGRhdGFcbiAgbGV0IGNsYWltRGF0YTtcbiAgdHJ5IHtcbiAgICAoe2RhdGE6IGNsYWltRGF0YX0gPSB5aWVsZCBjYWxsKGdldENsYWltRGF0YSwgaG9zdCwgbmFtZSwgbG9uZ0lkKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gYWRkIGFzc2V0IHRvIGFzc2V0IGxpc3RcbiAgeWllbGQgcHV0KGFkZEFzc2V0VG9Bc3NldExpc3QoYXNzZXRLZXksIG51bGwsIG5hbWUsIGxvbmdJZCwgc2hvcnRJZCwgY2xhaW1EYXRhKSk7XG4gIC8vIGNsZWFyIGFueSBlcnJvcnMgaW4gcmVxdWVzdCBlcnJvclxuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICogd2F0Y2hOZXdBc3NldFJlcXVlc3QgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQVNTRVRfUkVRVUVTVF9ORVcsIG5ld0Fzc2V0UmVxdWVzdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NhZ2FzL3Nob3dfYXNzZXQuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExvbmdDbGFpbUlkIChob3N0LCBuYW1lLCBtb2RpZmllcikge1xuICBsZXQgYm9keSA9IHt9O1xuICAvLyBjcmVhdGUgcmVxdWVzdCBwYXJhbXNcbiAgaWYgKG1vZGlmaWVyKSB7XG4gICAgaWYgKG1vZGlmaWVyLmlkKSB7XG4gICAgICBib2R5WydjbGFpbUlkJ10gPSBtb2RpZmllci5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keVsnY2hhbm5lbE5hbWUnXSA9IG1vZGlmaWVyLmNoYW5uZWwubmFtZTtcbiAgICAgIGJvZHlbJ2NoYW5uZWxDbGFpbUlkJ10gPSBtb2RpZmllci5jaGFubmVsLmlkO1xuICAgIH1cbiAgfVxuICBib2R5WydjbGFpbU5hbWUnXSA9IG5hbWU7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgYm9keSAgIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gIH07XG4gIC8vIGNyZWF0ZSB1cmxcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2xvbmctaWRgO1xuICAvLyByZXR1cm4gdGhlIHJlcXVlc3QgcHJvbWlzZVxuICByZXR1cm4gUmVxdWVzdCh1cmwsIHBhcmFtcyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hvcnRJZCAoaG9zdCwgbmFtZSwgY2xhaW1JZCkge1xuICBjb25zdCB1cmwgPSBgJHtob3N0fS9hcGkvY2xhaW0vc2hvcnQtaWQvJHtjbGFpbUlkfS8ke25hbWV9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFpbURhdGEgKGhvc3QsIG5hbWUsIGNsYWltSWQpIHtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NsYWltL2RhdGEvJHtuYW1lfS8ke2NsYWltSWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvYXBpL2Fzc2V0QXBpLmpzIiwiaW1wb3J0IHtjYWxsLCBwdXQsIHNlbGVjdCwgdGFrZUxhdGVzdH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnY29uc3RhbnRzL3Nob3dfYWN0aW9uX3R5cGVzJztcbmltcG9ydCB7IGFkZE5ld0NoYW5uZWxUb0NoYW5uZWxMaXN0LCBhZGRSZXF1ZXN0VG9SZXF1ZXN0TGlzdCwgb25SZXF1ZXN0RXJyb3IsIG9uUmVxdWVzdFVwZGF0ZSwgdXBkYXRlQ2hhbm5lbENsYWltcyB9IGZyb20gJ2FjdGlvbnMvc2hvdyc7XG5pbXBvcnQgeyBnZXRDaGFubmVsQ2xhaW1zLCBnZXRDaGFubmVsRGF0YSB9IGZyb20gJ2FwaS9jaGFubmVsQXBpJztcbmltcG9ydCB7IHNlbGVjdFNob3dTdGF0ZSB9IGZyb20gJ3NlbGVjdG9ycy9zaG93JztcbmltcG9ydCB7IHNlbGVjdFNpdGVIb3N0IH0gZnJvbSAnc2VsZWN0b3JzL3NpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gKiBuZXdDaGFubmVsUmVxdWVzdCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgcmVxdWVzdFR5cGUsIHJlcXVlc3RJZCwgY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCB9ID0gYWN0aW9uLmRhdGE7XG4gIC8vIHB1dCBhbiBhY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGluIHJlZHV4XG4gIHlpZWxkIHB1dChvblJlcXVlc3RVcGRhdGUocmVxdWVzdFR5cGUsIHJlcXVlc3RJZCkpO1xuICAvLyBpcyB0aGlzIGFuIGV4aXN0aW5nIHJlcXVlc3Q/XG4gIC8vIElmIHRoaXMgdXJpIGlzIGluIHRoZSByZXF1ZXN0IGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgY29uc3Qgc3RhdGUgPSB5aWVsZCBzZWxlY3Qoc2VsZWN0U2hvd1N0YXRlKTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGlmIChzdGF0ZS5yZXF1ZXN0TGlzdFtyZXF1ZXN0SWRdKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgbG9uZyBpZFxuICBsZXQgbG9uZ0lkLCBzaG9ydElkO1xuICB0cnkge1xuICAgICh7IGRhdGE6IHtsb25nQ2hhbm5lbENsYWltSWQ6IGxvbmdJZCwgc2hvcnRDaGFubmVsQ2xhaW1JZDogc2hvcnRJZH0gfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbERhdGEsIGhvc3QsIGNoYW5uZWxOYW1lLCBjaGFubmVsSWQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4geWllbGQgcHV0KG9uUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgfVxuICAvLyBzdG9yZSB0aGUgcmVxdWVzdCBpbiB0aGUgY2hhbm5lbCByZXF1ZXN0cyBsaXN0XG4gIGNvbnN0IGNoYW5uZWxLZXkgPSBgYyMke2NoYW5uZWxOYW1lfSMke2xvbmdJZH1gO1xuICB5aWVsZCBwdXQoYWRkUmVxdWVzdFRvUmVxdWVzdExpc3QocmVxdWVzdElkLCBudWxsLCBjaGFubmVsS2V5KSk7XG4gIC8vIGlzIHRoaXMgYW4gZXhpc3RpbmcgY2hhbm5lbD9cbiAgLy8gSWYgdGhpcyBjaGFubmVsIGlzIGluIHRoZSBjaGFubmVsIGxpc3QsIGl0J3MgYWxyZWFkeSBiZWVuIGZldGNoZWRcbiAgaWYgKHN0YXRlLmNoYW5uZWxMaXN0W2NoYW5uZWxLZXldKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gZ2V0IGNoYW5uZWwgY2xhaW1zIGRhdGFcbiAgbGV0IGNsYWltc0RhdGE7XG4gIHRyeSB7XG4gICAgKHsgZGF0YTogY2xhaW1zRGF0YSB9ID0geWllbGQgY2FsbChnZXRDaGFubmVsQ2xhaW1zLCBob3N0LCBsb25nSWQsIGNoYW5uZWxOYW1lLCAxKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgLy8gc3RvcmUgdGhlIGNoYW5uZWwgZGF0YSBpbiB0aGUgY2hhbm5lbCBsaXN0XG4gIHlpZWxkIHB1dChhZGROZXdDaGFubmVsVG9DaGFubmVsTGlzdChjaGFubmVsS2V5LCBjaGFubmVsTmFtZSwgc2hvcnRJZCwgbG9uZ0lkLCBjbGFpbXNEYXRhKSk7XG4gIC8vIGNsZWFyIGFueSByZXF1ZXN0IGVycm9yc1xuICB5aWVsZCBwdXQob25SZXF1ZXN0RXJyb3IobnVsbCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaE5ld0NoYW5uZWxSZXF1ZXN0ICgpIHtcbiAgeWllbGQgdGFrZUxhdGVzdChhY3Rpb25zLkNIQU5ORUxfUkVRVUVTVF9ORVcsIG5ld0NoYW5uZWxSZXF1ZXN0KTtcbn07XG5cbmZ1bmN0aW9uICogZ2V0TmV3Q2xhaW1zQW5kVXBkYXRlQ2hhbm5lbCAoYWN0aW9uKSB7XG4gIGNvbnN0IHsgY2hhbm5lbEtleSwgbmFtZSwgbG9uZ0lkLCBwYWdlIH0gPSBhY3Rpb24uZGF0YTtcbiAgY29uc3QgaG9zdCA9IHlpZWxkIHNlbGVjdChzZWxlY3RTaXRlSG9zdCk7XG4gIGxldCBjbGFpbXNEYXRhO1xuICB0cnkge1xuICAgICh7IGRhdGE6IGNsYWltc0RhdGEgfSA9IHlpZWxkIGNhbGwoZ2V0Q2hhbm5lbENsYWltcywgaG9zdCwgbG9uZ0lkLCBuYW1lLCBwYWdlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHlpZWxkIHB1dChvblJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gIH1cbiAgeWllbGQgcHV0KHVwZGF0ZUNoYW5uZWxDbGFpbXMoY2hhbm5lbEtleSwgY2xhaW1zRGF0YSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gKiB3YXRjaFVwZGF0ZUNoYW5uZWxDbGFpbXMgKCkge1xuICB5aWVsZCB0YWtlTGF0ZXN0KGFjdGlvbnMuQ0hBTk5FTF9DTEFJTVNfVVBEQVRFX0FTWU5DLCBnZXROZXdDbGFpbXNBbmRVcGRhdGVDaGFubmVsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zYWdhcy9zaG93X2NoYW5uZWwuanMiLCJpbXBvcnQgUmVxdWVzdCBmcm9tICd1dGlscy9yZXF1ZXN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoYW5uZWxEYXRhIChob3N0LCBpZCwgbmFtZSkge1xuICBpZiAoIWlkKSBpZCA9ICdub25lJztcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvZGF0YS8ke25hbWV9LyR7aWR9YDtcbiAgcmV0dXJuIFJlcXVlc3QodXJsKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFubmVsQ2xhaW1zIChob3N0LCBsb25nSWQsIG5hbWUsIHBhZ2UpIHtcbiAgaWYgKCFwYWdlKSBwYWdlID0gMTtcbiAgY29uc3QgdXJsID0gYCR7aG9zdH0vYXBpL2NoYW5uZWwvY2xhaW1zLyR7bmFtZX0vJHtsb25nSWR9LyR7cGFnZX1gO1xuICByZXR1cm4gUmVxdWVzdCh1cmwpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9hcGkvY2hhbm5lbEFwaS5qcyIsImNvbnN0IGhhbmRsZVBhZ2VSZW5kZXIgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2hhbmRsZVBhZ2VSZW5kZXIuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwID0+IHtcbiAgLy8gYSBjYXRjaC1hbGwgcm91dGUgaWYgc29tZW9uZSB2aXNpdHMgYSBwYWdlIHRoYXQgZG9lcyBub3QgZXhpc3RcbiAgYXBwLnVzZSgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgIC8vIHNlbmQgcmVzcG9uc2VcbiAgICBoYW5kbGVQYWdlUmVuZGVyKHJlcSwgcmVzKTtcbiAgfSk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmVyL3JvdXRlcy9mYWxsYmFjay1yb3V0ZXMuanMiLCJjb25zdCB7IGxvZ0xldmVsIH0gPSByZXF1aXJlKCcuLi8uLi9jb25maWcvbG9nZ2VyQ29uZmlnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHdpbnN0b24pID0+IHtcbiAgLy8gY29uZmlndXJlXG4gIHdpbnN0b24uY29uZmlndXJlKHtcbiAgICB0cmFuc3BvcnRzOiBbXG4gICAgICBuZXcgKHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKSh7XG4gICAgICAgIGxldmVsICAgICAgICAgICAgICAgICAgICAgICAgICA6IGxvZ0xldmVsLFxuICAgICAgICB0aW1lc3RhbXAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY29sb3JpemUgICAgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgcHJldHR5UHJpbnQgICAgICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgaGFuZGxlRXhjZXB0aW9ucyAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgICAgaHVtYW5SZWFkYWJsZVVuaGFuZGxlZEV4Y2VwdGlvbjogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuICAvLyB0ZXN0IGFsbCB0aGUgbG9nIGxldmVsc1xuICB3aW5zdG9uLmVycm9yKCdMZXZlbCAwJyk7XG4gIHdpbnN0b24ud2FybignTGV2ZWwgMScpO1xuICB3aW5zdG9uLmluZm8oJ0xldmVsIDInKTtcbiAgd2luc3Rvbi52ZXJib3NlKCdMZXZlbCAzJyk7XG4gIHdpbnN0b24uZGVidWcoJ0xldmVsIDQnKTtcbiAgd2luc3Rvbi5zaWxseSgnTGV2ZWwgNScpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9oZWxwZXJzL2NvbmZpZ3VyZUxvZ2dlci5qcyIsImNvbnN0IGxvZ2dlckNvbmZpZyA9IHtcbiAgbG9nTGV2ZWw6ICdkZWJ1ZycsICAvLyBvcHRpb25zOiBzaWxseSwgZGVidWcsIHZlcmJvc2UsIGluZm9cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbG9nZ2VyQ29uZmlnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29uZmlnL2xvZ2dlckNvbmZpZy5qcyIsImNvbnN0IHdpbnN0b25TbGFja1dlYkhvb2sgPSByZXF1aXJlKCd3aW5zdG9uLXNsYWNrLXdlYmhvb2snKS5TbGFja1dlYkhvb2s7XG5jb25zdCBzbGFja0NvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9zbGFja0NvbmZpZy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICh3aW5zdG9uKSA9PiB7XG4gIGNvbnN0IHtzbGFja1dlYkhvb2ssIHNsYWNrRXJyb3JDaGFubmVsLCBzbGFja0luZm9DaGFubmVsfSA9IHNsYWNrQ29uZmlnO1xuICBpZiAoc2xhY2tXZWJIb29rKSB7XG4gICAgLy8gYWRkIGEgdHJhbnNwb3J0IGZvciBlcnJvcnMgdG8gc2xhY2tcbiAgICBpZiAoc2xhY2tFcnJvckNoYW5uZWwpIHtcbiAgICAgIHdpbnN0b24uYWRkKHdpbnN0b25TbGFja1dlYkhvb2ssIHtcbiAgICAgICAgbmFtZSAgICAgIDogJ3NsYWNrLWVycm9ycy10cmFuc3BvcnQnLFxuICAgICAgICBsZXZlbCAgICAgOiAnd2FybicsXG4gICAgICAgIHdlYmhvb2tVcmw6IHNsYWNrV2ViSG9vayxcbiAgICAgICAgY2hhbm5lbCAgIDogc2xhY2tFcnJvckNoYW5uZWwsXG4gICAgICAgIHVzZXJuYW1lICA6ICdzcGVlLmNoJyxcbiAgICAgICAgaWNvbkVtb2ppIDogJzpmYWNlX3dpdGhfaGVhZF9iYW5kYWdlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChzbGFja0luZm9DaGFubmVsKSB7XG4gICAgICB3aW5zdG9uLmFkZCh3aW5zdG9uU2xhY2tXZWJIb29rLCB7XG4gICAgICAgIG5hbWUgICAgICA6ICdzbGFjay1pbmZvLXRyYW5zcG9ydCcsXG4gICAgICAgIGxldmVsICAgICA6ICdpbmZvJyxcbiAgICAgICAgd2ViaG9va1VybDogc2xhY2tXZWJIb29rLFxuICAgICAgICBjaGFubmVsICAgOiBzbGFja0luZm9DaGFubmVsLFxuICAgICAgICB1c2VybmFtZSAgOiAnc3BlZS5jaCcsXG4gICAgICAgIGljb25FbW9qaSA6ICc6bmVyZF9mYWNlOicsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIC8vIHNlbmQgdGVzdCBtZXNzYWdlXG4gICAgd2luc3Rvbi5lcnJvcignU2xhY2sgXCJlcnJvclwiIGxvZ2dpbmcgaXMgb25saW5lLicpO1xuICAgIHdpbnN0b24uaW5mbygnU2xhY2sgXCJpbmZvXCIgbG9nZ2luZyBpcyBvbmxpbmUuJyk7XG4gIH0gZWxzZSB7XG4gICAgd2luc3Rvbi53YXJuKCdTbGFjayBsb2dnaW5nIGlzIG5vdCBlbmFibGVkIGJlY2F1c2Ugbm8gc2xhY2tXZWJIb29rIGNvbmZpZyB2YXIgcHJvdmlkZWQuJyk7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIvaGVscGVycy9jb25maWd1cmVTbGFjay5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpbnN0b24tc2xhY2std2ViaG9va1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpbnN0b24tc2xhY2std2ViaG9va1wiXG4vLyBtb2R1bGUgaWQgPSAxNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL1wiOiA1MCxcblx0XCIuL0FjdGl2ZVN0YXR1c0JhclwiOiAyNCxcblx0XCIuL0FjdGl2ZVN0YXR1c0Jhci9cIjogMjQsXG5cdFwiLi9BY3RpdmVTdGF0dXNCYXIvaW5kZXhcIjogMjQsXG5cdFwiLi9BY3RpdmVTdGF0dXNCYXIvaW5kZXguanN4XCI6IDI0LFxuXHRcIi4vQXNzZXRQcmV2aWV3XCI6IDM0LFxuXHRcIi4vQXNzZXRQcmV2aWV3L1wiOiAzNCxcblx0XCIuL0Fzc2V0UHJldmlldy9pbmRleFwiOiAzNCxcblx0XCIuL0Fzc2V0UHJldmlldy9pbmRleC5qc1wiOiAzNCxcblx0XCIuL0Fzc2V0UHJldmlldy92aWV3XCI6IDc4LFxuXHRcIi4vQXNzZXRQcmV2aWV3L3ZpZXcuanN4XCI6IDc4LFxuXHRcIi4vRXhwYW5kaW5nVGV4dEFyZWFcIjogMzYsXG5cdFwiLi9FeHBhbmRpbmdUZXh0QXJlYS9cIjogMzYsXG5cdFwiLi9FeHBhbmRpbmdUZXh0QXJlYS9pbmRleFwiOiAzNixcblx0XCIuL0V4cGFuZGluZ1RleHRBcmVhL2luZGV4LmpzeFwiOiAzNixcblx0XCIuL0dBTGlzdGVuZXJcIjogMTMsXG5cdFwiLi9HQUxpc3RlbmVyL1wiOiAxMyxcblx0XCIuL0dBTGlzdGVuZXIvaW5kZXhcIjogMTMsXG5cdFwiLi9HQUxpc3RlbmVyL2luZGV4LmpzeFwiOiAxMyxcblx0XCIuL0luYWN0aXZlU3RhdHVzQmFyXCI6IDI1LFxuXHRcIi4vSW5hY3RpdmVTdGF0dXNCYXIvXCI6IDI1LFxuXHRcIi4vSW5hY3RpdmVTdGF0dXNCYXIvaW5kZXhcIjogMjUsXG5cdFwiLi9JbmFjdGl2ZVN0YXR1c0Jhci9pbmRleC5qc3hcIjogMjUsXG5cdFwiLi9Mb2dvXCI6IDIxLFxuXHRcIi4vTG9nby9cIjogMjEsXG5cdFwiLi9Mb2dvL2luZGV4XCI6IDIxLFxuXHRcIi4vTG9nby9pbmRleC5qc3hcIjogMjEsXG5cdFwiLi9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duXCI6IDIyLFxuXHRcIi4vTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9cIjogMjIsXG5cdFwiLi9OYXZCYXJDaGFubmVsT3B0aW9uc0Ryb3Bkb3duL2luZGV4XCI6IDIyLFxuXHRcIi4vTmF2QmFyQ2hhbm5lbE9wdGlvbnNEcm9wZG93bi9pbmRleC5qc3hcIjogMjIsXG5cdFwiLi9Qcm9ncmVzc0JhclwiOiAxMCxcblx0XCIuL1Byb2dyZXNzQmFyL1wiOiAxMCxcblx0XCIuL1Byb2dyZXNzQmFyL2luZGV4XCI6IDEwLFxuXHRcIi4vUHJvZ3Jlc3NCYXIvaW5kZXguanN4XCI6IDEwLFxuXHRcIi4vUHVibGlzaFByZXZpZXdcIjogMzcsXG5cdFwiLi9QdWJsaXNoUHJldmlldy9cIjogMzcsXG5cdFwiLi9QdWJsaXNoUHJldmlldy9pbmRleFwiOiAzNyxcblx0XCIuL1B1Ymxpc2hQcmV2aWV3L2luZGV4LmpzeFwiOiAzNyxcblx0XCIuL1B1Ymxpc2hVcmxNaWRkbGVEaXNwbGF5XCI6IDM4LFxuXHRcIi4vUHVibGlzaFVybE1pZGRsZURpc3BsYXkvXCI6IDM4LFxuXHRcIi4vUHVibGlzaFVybE1pZGRsZURpc3BsYXkvaW5kZXhcIjogMzgsXG5cdFwiLi9QdWJsaXNoVXJsTWlkZGxlRGlzcGxheS9pbmRleC5qc3hcIjogMzgsXG5cdFwiLi9TRU9cIjogNyxcblx0XCIuL1NFTy9cIjogNyxcblx0XCIuL1NFTy9pbmRleFwiOiA3LFxuXHRcIi4vU0VPL2luZGV4LmpzXCI6IDcsXG5cdFwiLi9TRU8vdmlld1wiOiA2Nixcblx0XCIuL1NFTy92aWV3LmpzeFwiOiA2Nixcblx0XCIuL2luZGV4XCI6IDUwLFxuXHRcIi4vaW5kZXguanNcIjogNTBcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxNjg7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jbGllbnQvY29tcG9uZW50cyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSAxNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL1wiOiA1Mixcblx0XCIuL0Fzc2V0RGlzcGxheVwiOiAxNyxcblx0XCIuL0Fzc2V0RGlzcGxheS9cIjogMTcsXG5cdFwiLi9Bc3NldERpc3BsYXkvaW5kZXhcIjogMTcsXG5cdFwiLi9Bc3NldERpc3BsYXkvaW5kZXguanNcIjogMTcsXG5cdFwiLi9Bc3NldERpc3BsYXkvdmlld1wiOiA3Mixcblx0XCIuL0Fzc2V0RGlzcGxheS92aWV3LmpzeFwiOiA3Mixcblx0XCIuL0Fzc2V0SW5mb1wiOiAzMSxcblx0XCIuL0Fzc2V0SW5mby9cIjogMzEsXG5cdFwiLi9Bc3NldEluZm8vaW5kZXhcIjogMzEsXG5cdFwiLi9Bc3NldEluZm8vaW5kZXguanNcIjogMzEsXG5cdFwiLi9Bc3NldEluZm8vdmlld1wiOiA3NSxcblx0XCIuL0Fzc2V0SW5mby92aWV3LmpzeFwiOiA3NSxcblx0XCIuL0Fzc2V0VGl0bGVcIjogMzAsXG5cdFwiLi9Bc3NldFRpdGxlL1wiOiAzMCxcblx0XCIuL0Fzc2V0VGl0bGUvaW5kZXhcIjogMzAsXG5cdFwiLi9Bc3NldFRpdGxlL2luZGV4LmpzXCI6IDMwLFxuXHRcIi4vQXNzZXRUaXRsZS92aWV3XCI6IDc0LFxuXHRcIi4vQXNzZXRUaXRsZS92aWV3LmpzeFwiOiA3NCxcblx0XCIuL0NoYW5uZWxDbGFpbXNEaXNwbGF5XCI6IDMzLFxuXHRcIi4vQ2hhbm5lbENsYWltc0Rpc3BsYXkvXCI6IDMzLFxuXHRcIi4vQ2hhbm5lbENsYWltc0Rpc3BsYXkvaW5kZXhcIjogMzMsXG5cdFwiLi9DaGFubmVsQ2xhaW1zRGlzcGxheS9pbmRleC5qc1wiOiAzMyxcblx0XCIuL0NoYW5uZWxDbGFpbXNEaXNwbGF5L3ZpZXdcIjogNzcsXG5cdFwiLi9DaGFubmVsQ2xhaW1zRGlzcGxheS92aWV3LmpzeFwiOiA3Nyxcblx0XCIuL0NoYW5uZWxDcmVhdGVGb3JtXCI6IDE2LFxuXHRcIi4vQ2hhbm5lbENyZWF0ZUZvcm0vXCI6IDE2LFxuXHRcIi4vQ2hhbm5lbENyZWF0ZUZvcm0vaW5kZXhcIjogMTYsXG5cdFwiLi9DaGFubmVsQ3JlYXRlRm9ybS9pbmRleC5qc1wiOiAxNixcblx0XCIuL0NoYW5uZWxDcmVhdGVGb3JtL3ZpZXdcIjogNjksXG5cdFwiLi9DaGFubmVsQ3JlYXRlRm9ybS92aWV3LmpzeFwiOiA2OSxcblx0XCIuL0NoYW5uZWxMb2dpbkZvcm1cIjogMTUsXG5cdFwiLi9DaGFubmVsTG9naW5Gb3JtL1wiOiAxNSxcblx0XCIuL0NoYW5uZWxMb2dpbkZvcm0vaW5kZXhcIjogMTUsXG5cdFwiLi9DaGFubmVsTG9naW5Gb3JtL2luZGV4LmpzXCI6IDE1LFxuXHRcIi4vQ2hhbm5lbExvZ2luRm9ybS92aWV3XCI6IDY4LFxuXHRcIi4vQ2hhbm5lbExvZ2luRm9ybS92aWV3LmpzeFwiOiA2OCxcblx0XCIuL0NoYW5uZWxTZWxlY3RcIjogMzksXG5cdFwiLi9DaGFubmVsU2VsZWN0L1wiOiAzOSxcblx0XCIuL0NoYW5uZWxTZWxlY3QvaW5kZXhcIjogMzksXG5cdFwiLi9DaGFubmVsU2VsZWN0L2luZGV4LmpzXCI6IDM5LFxuXHRcIi4vQ2hhbm5lbFNlbGVjdC92aWV3XCI6IDgxLFxuXHRcIi4vQ2hhbm5lbFNlbGVjdC92aWV3LmpzeFwiOiA4MSxcblx0XCIuL0Ryb3B6b25lXCI6IDE4LFxuXHRcIi4vRHJvcHpvbmUvXCI6IDE4LFxuXHRcIi4vRHJvcHpvbmUvaW5kZXhcIjogMTgsXG5cdFwiLi9Ecm9wem9uZS9pbmRleC5qc1wiOiAxOCxcblx0XCIuL0Ryb3B6b25lL3ZpZXdcIjogODIsXG5cdFwiLi9Ecm9wem9uZS92aWV3LmpzeFwiOiA4Mixcblx0XCIuL0ZvdXJPaEZvdXJQYWdlXCI6IDM1LFxuXHRcIi4vRm91ck9oRm91clBhZ2UvXCI6IDM1LFxuXHRcIi4vRm91ck9oRm91clBhZ2UvaW5kZXhcIjogMzUsXG5cdFwiLi9Gb3VyT2hGb3VyUGFnZS9pbmRleC5qc3hcIjogMzUsXG5cdFwiLi9Gb3VyT2hGb3VyUGFnZS92aWV3XCI6IDc5LFxuXHRcIi4vRm91ck9oRm91clBhZ2Uvdmlldy5qc3hcIjogNzksXG5cdFwiLi9OYXZCYXJcIjogNSxcblx0XCIuL05hdkJhci9cIjogNSxcblx0XCIuL05hdkJhci9pbmRleFwiOiA1LFxuXHRcIi4vTmF2QmFyL2luZGV4LmpzXCI6IDUsXG5cdFwiLi9OYXZCYXIvdmlld1wiOiA2NSxcblx0XCIuL05hdkJhci92aWV3LmpzeFwiOiA2NSxcblx0XCIuL1B1Ymxpc2hEZXRhaWxzXCI6IDQwLFxuXHRcIi4vUHVibGlzaERldGFpbHMvXCI6IDQwLFxuXHRcIi4vUHVibGlzaERldGFpbHMvaW5kZXhcIjogNDAsXG5cdFwiLi9QdWJsaXNoRGV0YWlscy9pbmRleC5qc1wiOiA0MCxcblx0XCIuL1B1Ymxpc2hEZXRhaWxzL3ZpZXdcIjogODMsXG5cdFwiLi9QdWJsaXNoRGV0YWlscy92aWV3LmpzeFwiOiA4Myxcblx0XCIuL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2VcIjogNDUsXG5cdFwiLi9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL1wiOiA0NSxcblx0XCIuL1B1Ymxpc2hEaXNhYmxlZE1lc3NhZ2UvaW5kZXhcIjogNDUsXG5cdFwiLi9QdWJsaXNoRGlzYWJsZWRNZXNzYWdlL2luZGV4LmpzXCI6IDQ1LFxuXHRcIi4vUHVibGlzaERpc2FibGVkTWVzc2FnZS92aWV3XCI6IDg4LFxuXHRcIi4vUHVibGlzaERpc2FibGVkTWVzc2FnZS92aWV3LmpzeFwiOiA4OCxcblx0XCIuL1B1Ymxpc2hNZXRhZGF0YUlucHV0c1wiOiA0NCxcblx0XCIuL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy9cIjogNDQsXG5cdFwiLi9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXhcIjogNDQsXG5cdFwiLi9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvaW5kZXguanNcIjogNDQsXG5cdFwiLi9QdWJsaXNoTWV0YWRhdGFJbnB1dHMvdmlld1wiOiA4Nyxcblx0XCIuL1B1Ymxpc2hNZXRhZGF0YUlucHV0cy92aWV3LmpzeFwiOiA4Nyxcblx0XCIuL1B1Ymxpc2hTdGF0dXNcIjogNDYsXG5cdFwiLi9QdWJsaXNoU3RhdHVzL1wiOiA0Nixcblx0XCIuL1B1Ymxpc2hTdGF0dXMvaW5kZXhcIjogNDYsXG5cdFwiLi9QdWJsaXNoU3RhdHVzL2luZGV4LmpzXCI6IDQ2LFxuXHRcIi4vUHVibGlzaFN0YXR1cy92aWV3XCI6IDg5LFxuXHRcIi4vUHVibGlzaFN0YXR1cy92aWV3LmpzeFwiOiA4OSxcblx0XCIuL1B1Ymxpc2hUaHVtYm5haWxJbnB1dFwiOiA0Myxcblx0XCIuL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC9cIjogNDMsXG5cdFwiLi9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvaW5kZXhcIjogNDMsXG5cdFwiLi9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvaW5kZXguanNcIjogNDMsXG5cdFwiLi9QdWJsaXNoVGh1bWJuYWlsSW5wdXQvdmlld1wiOiA4Nixcblx0XCIuL1B1Ymxpc2hUaHVtYm5haWxJbnB1dC92aWV3LmpzeFwiOiA4Nixcblx0XCIuL1B1Ymxpc2hUaXRsZUlucHV0XCI6IDQxLFxuXHRcIi4vUHVibGlzaFRpdGxlSW5wdXQvXCI6IDQxLFxuXHRcIi4vUHVibGlzaFRpdGxlSW5wdXQvaW5kZXhcIjogNDEsXG5cdFwiLi9QdWJsaXNoVGl0bGVJbnB1dC9pbmRleC5qc1wiOiA0MSxcblx0XCIuL1B1Ymxpc2hUaXRsZUlucHV0L3ZpZXdcIjogODQsXG5cdFwiLi9QdWJsaXNoVGl0bGVJbnB1dC92aWV3LmpzeFwiOiA4NCxcblx0XCIuL1B1Ymxpc2hUb29sXCI6IDQ3LFxuXHRcIi4vUHVibGlzaFRvb2wvXCI6IDQ3LFxuXHRcIi4vUHVibGlzaFRvb2wvaW5kZXhcIjogNDcsXG5cdFwiLi9QdWJsaXNoVG9vbC9pbmRleC5qc1wiOiA0Nyxcblx0XCIuL1B1Ymxpc2hUb29sL3ZpZXdcIjogOTAsXG5cdFwiLi9QdWJsaXNoVG9vbC92aWV3LmpzeFwiOiA5MCxcblx0XCIuL1B1Ymxpc2hVcmxJbnB1dFwiOiA0Mixcblx0XCIuL1B1Ymxpc2hVcmxJbnB1dC9cIjogNDIsXG5cdFwiLi9QdWJsaXNoVXJsSW5wdXQvaW5kZXhcIjogNDIsXG5cdFwiLi9QdWJsaXNoVXJsSW5wdXQvaW5kZXguanNcIjogNDIsXG5cdFwiLi9QdWJsaXNoVXJsSW5wdXQvdmlld1wiOiA4NSxcblx0XCIuL1B1Ymxpc2hVcmxJbnB1dC92aWV3LmpzeFwiOiA4NSxcblx0XCIuL1Nob3dBc3NldERldGFpbHNcIjogMjksXG5cdFwiLi9TaG93QXNzZXREZXRhaWxzL1wiOiAyOSxcblx0XCIuL1Nob3dBc3NldERldGFpbHMvaW5kZXhcIjogMjksXG5cdFwiLi9TaG93QXNzZXREZXRhaWxzL2luZGV4LmpzXCI6IDI5LFxuXHRcIi4vU2hvd0Fzc2V0RGV0YWlscy92aWV3XCI6IDczLFxuXHRcIi4vU2hvd0Fzc2V0RGV0YWlscy92aWV3LmpzeFwiOiA3Myxcblx0XCIuL1Nob3dBc3NldExpdGVcIjogMjcsXG5cdFwiLi9TaG93QXNzZXRMaXRlL1wiOiAyNyxcblx0XCIuL1Nob3dBc3NldExpdGUvaW5kZXhcIjogMjcsXG5cdFwiLi9TaG93QXNzZXRMaXRlL2luZGV4LmpzXCI6IDI3LFxuXHRcIi4vU2hvd0Fzc2V0TGl0ZS92aWV3XCI6IDcxLFxuXHRcIi4vU2hvd0Fzc2V0TGl0ZS92aWV3LmpzeFwiOiA3MSxcblx0XCIuL1Nob3dDaGFubmVsXCI6IDMyLFxuXHRcIi4vU2hvd0NoYW5uZWwvXCI6IDMyLFxuXHRcIi4vU2hvd0NoYW5uZWwvaW5kZXhcIjogMzIsXG5cdFwiLi9TaG93Q2hhbm5lbC9pbmRleC5qc1wiOiAzMixcblx0XCIuL1Nob3dDaGFubmVsL3ZpZXdcIjogNzYsXG5cdFwiLi9TaG93Q2hhbm5lbC92aWV3LmpzeFwiOiA3Nixcblx0XCIuL2luZGV4XCI6IDUyLFxuXHRcIi4vaW5kZXguanNcIjogNTJcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxNjk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jbGllbnQvY29udGFpbmVycyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSAxNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNvbnN0IExPQURfU1RBUlQgPSAnTE9BRF9TVEFSVCc7XG5leHBvcnQgY29uc3QgTE9BRElORyA9ICdMT0FESU5HJztcbmV4cG9ydCBjb25zdCBQVUJMSVNISU5HID0gJ1BVQkxJU0hJTkcnO1xuZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgRkFJTEVEID0gJ0ZBSUxFRCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvY29uc3RhbnRzL3B1Ymxpc2hfY2xhaW1fc3RhdGVzLmpzIiwidmFyIG1hcCA9IHtcblx0XCIuL1wiOiA1Myxcblx0XCIuL0Fib3V0UGFnZVwiOiAyMCxcblx0XCIuL0Fib3V0UGFnZS9cIjogMjAsXG5cdFwiLi9BYm91dFBhZ2UvaW5kZXhcIjogMjAsXG5cdFwiLi9BYm91dFBhZ2UvaW5kZXguanN4XCI6IDIwLFxuXHRcIi4vRXJyb3JQYWdlXCI6IDEyLFxuXHRcIi4vRXJyb3JQYWdlL1wiOiAxMixcblx0XCIuL0Vycm9yUGFnZS9pbmRleFwiOiAxMixcblx0XCIuL0Vycm9yUGFnZS9pbmRleC5qc3hcIjogMTIsXG5cdFwiLi9Ib21lUGFnZVwiOiA1NCxcblx0XCIuL0hvbWVQYWdlL1wiOiA1NCxcblx0XCIuL0hvbWVQYWdlL2luZGV4XCI6IDU0LFxuXHRcIi4vSG9tZVBhZ2UvaW5kZXguanN4XCI6IDU0LFxuXHRcIi4vTG9naW5QYWdlXCI6IDIzLFxuXHRcIi4vTG9naW5QYWdlL1wiOiAyMyxcblx0XCIuL0xvZ2luUGFnZS9pbmRleFwiOiAyMyxcblx0XCIuL0xvZ2luUGFnZS9pbmRleC5qc1wiOiAyMyxcblx0XCIuL0xvZ2luUGFnZS92aWV3XCI6IDY3LFxuXHRcIi4vTG9naW5QYWdlL3ZpZXcuanN4XCI6IDY3LFxuXHRcIi4vU2hvd1BhZ2VcIjogMjYsXG5cdFwiLi9TaG93UGFnZS9cIjogMjYsXG5cdFwiLi9TaG93UGFnZS9pbmRleFwiOiAyNixcblx0XCIuL1Nob3dQYWdlL2luZGV4LmpzXCI6IDI2LFxuXHRcIi4vU2hvd1BhZ2Uvdmlld1wiOiA3MCxcblx0XCIuL1Nob3dQYWdlL3ZpZXcuanN4XCI6IDcwLFxuXHRcIi4vaW5kZXhcIjogNTMsXG5cdFwiLi9pbmRleC5qc1wiOiA1M1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDE3MTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NsaWVudC9wYWdlcyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSAxNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==