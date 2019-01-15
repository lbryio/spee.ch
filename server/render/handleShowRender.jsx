import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import renderFullPage from './renderFullPage';
import createSagaMiddleware from 'redux-saga';
import { call } from 'redux-saga/effects';
import Helmet from 'react-helmet';
import * as httpContext from 'express-http-context';

import Reducers from '@reducers';
import GAListener from '@components/GAListener';
import App from '@app';

const createCanonicalLink = require('@globalutils/createCanonicalLink');

const getCanonicalUrlFromShow = show => {
  const requestId = show.requestList[show.request.id];
  const requestType = show.request.type;

  if (!requestId || !requestType) {
    return null;
  }

  switch (requestType) {
    case 'ASSET_DETAILS':
      const asset = show.assetList[requestId.key];
      return createCanonicalLink({ asset: { ...asset.claimData, shortId: asset.shortId }});
    case 'CHANNEL':
      return createCanonicalLink({ channel: show.channelList[requestId.key] });
    default:
      return null;
  }
};

const returnSagaWithParams = (saga, params) => {
  return function * () {
    yield call(saga, params);
  };
};

export default (req, res) => {
  let context = {};

  const {
    action = false,
    saga = false,
  } = httpContext.get('routeData');

  if (action === 'fallback') {
    res.status(404);
  }

  const runSaga = (action !== false && saga !== false);
  const renderPage = (store) => {
    // Workaround, remove when a solution for async httpContext exists
    const showState = store.getState().show;
    const assetKeys = Object.keys(showState.assetList);

    if (assetKeys.length !== 0) {
      res.claimId = showState.assetList[assetKeys[0]].claimId;
    } else {
      const channelKeys = Object.keys(showState.channelList);

      if (channelKeys.length !== 0) {
        res.claimId = showState.channelList[channelKeys[0]].longId;
        res.isChannel = true;
      }
    }

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
  };

  if (runSaga) {
    // create and apply middleware
    const sagaMiddleware = createSagaMiddleware();
    const middleware = applyMiddleware(sagaMiddleware);

    // create a new Redux store instance
    const store = createStore(Reducers, middleware);

    // create an action to handle the given url,
    // and create a the saga needed to handle that action
    const boundAction = action(req.params, req.url);
    const boundSaga = returnSagaWithParams(saga, boundAction);

    // run the saga middleware with the saga call
    sagaMiddleware
      .run(boundSaga)
      .done
      .then(() => {
        // redirect if request does not use canonical url
        const canonicalUrl = getCanonicalUrlFromShow(store.getState().show);

        if (!canonicalUrl) {
          res.status(404);
        }

        if (canonicalUrl && canonicalUrl !== req.originalUrl) {
          console.log(`redirecting ${req.originalUrl} to ${canonicalUrl}`);
          res.redirect(canonicalUrl);
        }

        return renderPage(store);
      });
  } else {
    const store = createStore(Reducers);
    renderPage(store);
  }
};
