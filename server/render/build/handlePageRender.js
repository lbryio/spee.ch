"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reducers = _interopRequireDefault(require("@reducers"));

var _GAListener = _interopRequireDefault(require("@components/GAListener"));

var _app = _interopRequireDefault(require("@app"));

var _renderFullPage = _interopRequireDefault(require("../renderFullPage.js"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res) {
  var context = {}; // create a new Redux store instance

  var store = (0, _redux.createStore)(_reducers.default); // render component to a string

  var html = (0, _server.renderToString)(_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_reactRouterDom.StaticRouter, {
    location: req.url,
    context: context
  }, _react.default.createElement(_GAListener.default, null, _react.default.createElement(_app.default, null))))); // get head tags from helmet

  var helmet = _reactHelmet.default.renderStatic(); // check for a redirect


  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url);
  } else {} // we're good, send the response
  // get the initial state from our Redux store


  var preloadedState = store.getState(); // send the rendered page back to the client

  res.send((0, _renderFullPage.default)(helmet, html, preloadedState));
};