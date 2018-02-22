import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import Reducer from '../react/reducers';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';
import GAListener from '../react/components/GAListener';
import App from '../react/app';
import renderFullPage from './renderFullPage';
import routes from '../react/routes';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../react/sagas';

module.exports = (req, res) => {
  let context = {};

  // create and apply middleware
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);

  // create a new Redux store instance
  const store = createStore(Reducer, middleware);

  // run the saga middlweare
  sagaMiddleware.run(rootSaga);

  // get data as promises
  const promises = [];
  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match) {
      let fetchData = route.component.fetchData;
      if (fetchData instanceof Function) {
        promises.push(fetchData(store, match));
      };
    };
  });
  console.log('promises', promises);

  // after promises have resolved, render the component
  Promise.all(promises).then(data => {
    console.log('data:', data);
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

    // check for a redirect
    if (context.url) {
      console.log('REDIRECTING:', context.url);
      return res.redirect(301, context.url);
    } else {
      console.log(`we're good, send the response`, html);
    }

    // get the initial state from our Redux store
    const preloadedState = store.getState();

    // send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState));
  });
};
