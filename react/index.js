import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Reducer from 'reducers';
import Root from './root';

let store = createStore(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Root store={store} />,
  document.getElementById('react-app')
)
