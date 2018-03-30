import Reducer from './client/reducers';
import rootSaga  from './client/sagas';
import GAListener from './client/components/GAListener';
const Pages = require('./client/pages');
const Server = require('./server');
const App = require('./client/app.js');
const Components = require('./client/components');
const Containers = require('./client/containers');

const exports = {
  Server,
  App,
  Reducer,
  rootSaga,
  GAListener,
  Pages,
  Components,
  Containers,
};

module.exports = exports;
