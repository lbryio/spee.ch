import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './reducers/index.js';
import PublishTool from './containers/PublishTool.jsx';

let store = createStore(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <PublishTool />
  </Provider>,
  document.getElementById('react-publish-tool')
)
