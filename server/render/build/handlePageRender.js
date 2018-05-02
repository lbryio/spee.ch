"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _spee = require("spee.ch-components");

var _renderFullPage = _interopRequireDefault(require("../renderFullPage.js"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  ^ note: to do this right, maybe
  these should be passed in from the implementation (www.spee.ch) itself,
  so that there are no conflicts between the SSR here and
  the bundle sent to the server?
  there might also be issues if this package uses a different version of spee.ch-components than www.spee.ch does?
*/
var siteConfig = require('../../../config/siteConfig.js');

var viewsConfig = require('../../../config/viewsConfig.js');

module.exports = function (req, res) {
  var context = {}; // customize the reducer by passing in intial state configs

  var MyReducers = (0, _spee.Reducers)(siteConfig);
  var MyApp = (0, _spee.App)(viewsConfig);
  var MyGAListener = (0, _spee.GAListener)(siteConfig); // create a new Redux store instance

  var store = (0, _redux.createStore)(MyReducers); // render component to a string

  var html = (0, _server.renderToString)(_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_reactRouterDom.StaticRouter, {
    location: req.url,
    context: context
  }, _react.default.createElement(MyGAListener, null, _react.default.createElement(MyApp, null))))); // get head tags from helmet

  var helmet = _reactHelmet.default.renderStatic(); // check for a redirect


  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url);
  } else {} // we're good, send the response
  // get the initial state from our Redux store


  var preloadedState = store.getState(); // send the rendered page back to the client

  res.send((0, _renderFullPage.default)(helmet, html, preloadedState));
};