"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _renderFullPage = _interopRequireDefault(require("../renderFullPage"));

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _effects = require("redux-saga/effects");

var _spee = require("spee.ch-components");

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var siteConfig = require('../../../config/siteConfig.js'); // const viewsConfig = require('../../../config/viewsConfig.js');


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
  var context = {}; // configure the reducers by passing initial state configs

  var MyReducers = (0, _spee.Reducers)(siteConfig);
  var MyApp = _spee.App;
  var MyGAListener = (0, _spee.GAListener)(siteConfig); // create and apply middleware

  var sagaMiddleware = (0, _reduxSaga.default)();
  var middleware = (0, _redux.applyMiddleware)(sagaMiddleware); // create a new Redux store instance

  var store = (0, _redux.createStore)(MyReducers, middleware); // create saga

  var action = _spee.Actions.onHandleShowPageUri(req.params);

  var saga = returnSagaWithParams(_spee.Sagas.handleShowPageUri, action); // run the saga middleware

  sagaMiddleware.run(saga).done.then(function () {
    // render component to a string
    var html = (0, _server.renderToString)(_react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_reactRouterDom.StaticRouter, {
      location: req.url,
      context: context
    }, _react.default.createElement(MyGAListener, null, _react.default.createElement(MyApp, null))))); // get head tags from helmet

    var helmet = _reactHelmet.default.renderStatic(); // check for a redirect


    if (context.url) {
      return res.redirect(301, context.url);
    } // get the initial state from our Redux store


    var preloadedState = store.getState(); // send the rendered page back to the client

    res.send((0, _renderFullPage.default)(helmet, html, preloadedState));
  });
};