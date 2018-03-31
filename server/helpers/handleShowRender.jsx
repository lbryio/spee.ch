import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import renderFullPage from './renderFullPage';
import createSagaMiddleware from 'redux-saga';
import { call } from 'redux-saga/effects';
import { Reducers, GAListener, App, Sagas, Actions } from 'spee.ch-components';
/*
  ^ note: to do this right, maybe
  these should be passed in from the implementation (www.spee.ch) itself,
  so that there are no conflicts between the SSR here and
  the bundle sent to the server?
  there might also be issues if this package uses a different version of spee.ch-components than www.spee.ch does?
*/
import Helmet from 'react-helmet';

// configure the reducers by passing initial state configs
const siteConfig = require('siteConfig.js');
const CustomizedReducers = Reducers(siteConfig);
const CustomizedApp = App(siteConfig);

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
  const store = createStore(CustomizedReducers, middleware);

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
              <CustomizedApp />
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

  console.log('hello from spee.ch handleShowRender.jsx');
};
