import Reducer from './client/reducers';
import rootSaga  from './client/sagas';
import GAListener from './client/components/GAListener';
const App = require('./client/app.js');
const Server = require('./server');
const Pages = require('./client/pages');
const Components = require('./client/components');
const Containers = require('./client/containers');

const exports = {
  App,
  Reducer,
  rootSaga,
  GAListener,
  Server,
  Pages,
  Components,
  Containers,
};

module.exports = exports;
