import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Reducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga  from 'sagas';

import GAListener from 'components/GAListener';
import App from './app';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__()) : middleware;

let store = createStore(
  Reducer,
  enhancer,
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <BrowserRouter>
      <GAListener>
        <App />
      </GAListener>
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-app')
);
