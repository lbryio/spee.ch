import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import Reducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga  from 'sagas';
import Root from './root';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

let store = createStore(
  Reducer,
  compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

sagaMiddleware.run(rootSaga);

render(
  <Root store={store} />,
  document.getElementById('react-app')
);
