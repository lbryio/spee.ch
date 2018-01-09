import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './reducers/index.js';
import PublishTool from './components/PublishTool.jsx';

let store = createStore(Reducers)

ReactDOM.render(
  <Provider store={store}>
    <PublishTool />
  </Provider>,
  document.getElementById('react-publish-tool')
)
