import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reducer from 'reducers';
import Publish from 'containers/PublishTool';
import NavBar from 'containers/NavBar';

let store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <NavBar />
  </Provider>,
  document.getElementById('react-nav-bar')
)

ReactDOM.render(
  <Provider store={store}>
    <Publish />
  </Provider>,
  document.getElementById('react-publish-tool')
)
