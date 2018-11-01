"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _renderFullPage = _interopRequireDefault(require("../renderFullPage"));

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _effects = require("redux-saga/effects");

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var httpContext = _interopRequireWildcard(require("express-http-context"));

var _reducers = _interopRequireDefault(require("@reducers"));

var _GAListener = _interopRequireDefault(require("@components/GAListener"));

var _app = _interopRequireDefault(require("@app"));

var _sagas = _interopRequireDefault(require("@sagas"));

var _actions = _interopRequireDefault(require("@actions"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCanonicalLink = require('../../../utils/createCanonicalLink');

var getCanonicalUrlFromShow = function getCanonicalUrlFromShow(show) {
  var requestId = show.requestList[show.request.id];
  var requestType = show.request.type;

  switch (requestType) {
    case 'ASSET_DETAILS':
      return createCanonicalLink({
        asset: show.assetList[requestId.key]
      });

    case 'CHANNEL':
      return createCanonicalLink({
        channel: show.channelList[requestId.key]
      });

    default:
      return null;
  }
};

var returnSagaWithParams = function returnSagaWithParams(saga, params) {
  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _effects.call)(saga, params);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })
  );
};

module.exports = function (req, res) {
  var context = {};

  var _httpContext$get = httpContext.get('routeData'),
      _httpContext$get$acti = _httpContext$get.action,
      action = _httpContext$get$acti === void 0 ? false : _httpContext$get$acti,
      _httpContext$get$saga = _httpContext$get.saga,
      saga = _httpContext$get$saga === void 0 ? false : _httpContext$get$saga;

  var runSaga = action !== false && saga !== false;

  var renderPage = function renderPage(store) {
    // Workaround, remove when a solution for async httpContext exists
    var showState = store.getState().show;
    var assetKeys = Object.keys(showState.assetList);

    if (assetKeys.length !== 0) {
      res.claimId = showState.assetList[assetKeys[0]].claimId;
    } else {
      var channelKeys = Object.keys(showState.channelList);

      if (channelKeys.length !== 0) {
        res.claimId = showState.channelList[channelKeys[0]].longId;
        res.isChannel = true;
      }
    } // render component to a string


    var html = (0, _server.renderToString)(_react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_reactRouterDom.StaticRouter, {
      location: req.url,
      context: context
    }, _react.default.createElement(_GAListener.default, null, _react.default.createElement(_app.default, null))))); // get head tags from helmet

    var helmet = _reactHelmet.default.renderStatic(); // check for a redirect


    if (context.url) {
      return res.redirect(301, context.url);
    } // get the initial state from our Redux store


    var preloadedState = store.getState(); // send the rendered page back to the client

    res.send((0, _renderFullPage.default)(helmet, html, preloadedState));
  };

  if (runSaga) {
    // create and apply middleware
    var sagaMiddleware = (0, _reduxSaga.default)();
    var middleware = (0, _redux.applyMiddleware)(sagaMiddleware); // create a new Redux store instance

    var store = (0, _redux.createStore)(_reducers.default, middleware); // create an action to handle the given url,
    // and create a the saga needed to handle that action

    var boundAction = action(req.params, req.url);
    var boundSaga = returnSagaWithParams(saga, boundAction); // run the saga middleware with the saga call

    sagaMiddleware.run(boundSaga).done.then(function () {
      // redirect if request does not use canonical url
      var canonicalUrl = getCanonicalUrlFromShow(store.getState().show);

      if (canonicalUrl && canonicalUrl !== req.originalUrl) {
        console.log("redirecting ".concat(req.originalUrl, " to ").concat(canonicalUrl));
        res.redirect(canonicalUrl);
      }

      return renderPage(store);
    });
  } else {
    var _store = (0, _redux.createStore)(_reducers.default);

    renderPage(_store);
  }
};