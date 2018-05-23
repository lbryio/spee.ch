"use strict";

var _app = _interopRequireDefault(require("./app"));

var _reducers = _interopRequireDefault(require("./reducers"));

var _sagas = _interopRequireDefault(require("./sagas"));

var _actions = _interopRequireDefault(require("./actions"));

var _GAListener = _interopRequireDefault(require("./components/GAListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// app, reducers, sagas, actions
// can it be a function and pass in the config like this?,
// or should all the configs just come from the store (assuming the initial config can be used to config the store)?
module.exports = {
  App: _app.default,
  Reducers: _reducers.default,
  Sagas: _sagas.default,
  // includes all the sagas
  Actions: _actions.default,
  // includes all the actions
  GAListener: _GAListener.default
};