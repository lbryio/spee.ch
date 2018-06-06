"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _renderFullPage = _interopRequireDefault(require("../renderFullPage"));

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _effects = require("redux-saga/effects");

var _reducers = _interopRequireDefault(require("@reducers"));

var _GAListener = _interopRequireDefault(require("@components/GAListener"));

var _app = _interopRequireDefault(require("@app"));

var _sagas = _interopRequireDefault(require("@sagas"));

var _actions = _interopRequireDefault(require("@actions"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var context = {}; // create and apply middleware

  var sagaMiddleware = (0, _reduxSaga.default)();
  var middleware = (0, _redux.applyMiddleware)(sagaMiddleware); // create a new Redux store instance

  var store = (0, _redux.createStore)(_reducers.default, middleware); // create saga

  var action = _actions.default.onHandleShowPageUri(req.params);

  var saga = returnSagaWithParams(_sagas.default.handleShowPageUri, action); // run the saga middleware

  sagaMiddleware.run(saga).done.then(function () {
    // render component to a string
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
  });
};