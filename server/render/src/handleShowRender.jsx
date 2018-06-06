import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import renderFullPage from '../renderFullPage';
import createSagaMiddleware from 'redux-saga';
import { call } from 'redux-saga/effects';
import Reducers from '@reducers';
import GAListener from '@components/GAListener';
import App from '@app';
import Sagas from '@sagas';
import Actions from '@actions';
import Helmet from 'react-helmet';

const returnSagaWithParams = (saga, params) => {
  return function * () {
    yield call(saga, params);
  };
};

module.exports = (req, res) => {
  let context = {};

  // create and apply middleware
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);

  // create a new Redux store instance
  const store = createStore(Reducers, middleware);

  // create saga
  const action = Actions.onHandleShowPageUri(req.params);
  const saga = returnSagaWithParams(Sagas.handleShowPageUri, action);

  // run the saga middleware
  sagaMiddleware
    .run(saga)
    .done
    .then(() => {
      // render component to a string
      const html = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <GAListener>
              <App />
            </GAListener>
          </StaticRouter>
        </Provider>
      );

      // get head tags from helmet
      const helmet = Helmet.renderStatic();

      // check for a redirect
      if (context.url) {
        return res.redirect(301, context.url);
      }

      // get the initial state from our Redux store
      const preloadedState = store.getState();

      // send the rendered page back to the client
      res.send(renderFullPage(helmet, html, preloadedState));
    });
};
