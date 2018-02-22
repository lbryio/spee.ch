import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import Reducer from '../react/reducers';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import GAListener from '../react/components/GAListener';
import App from '../react/app';
import renderFullPage from './renderFullPage';
import createSagaMiddleware from 'redux-saga';
import { call } from 'redux-saga/effects';
import { handleShowPageUri } from '../react/sagas/show_uri';
import { onHandleShowPageUri } from '../react/actions/show';

// const waitAll = (sagas) => {
//   console.log('sagas', sagas);
//   return function * () {
//     const tasks = yield sagas.map(([saga, params]) => {
//       console.log('saga to fork:', saga);
//       console.log('params fork:', params);
//       fork(saga, params);
//     });
//     console.log('tasks', tasks);
//     console.log('before join');
//     yield tasks.map(join);
//     console.log('after join');
//   };
// };
//
// const getPreloaders = (req) => {
//   let preloaders = [];
//   routes.some(route => {
//     const match = matchPath(req.path, route);
//     if (match) {
//       let preloadData = route.component.preloadData;
//       if (preloadData instanceof Function) {
//         preloaders.push([preloadData(), mockAction(match.params)]);
//       };
//     };
//   });
//   return preloaders;
// };

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
  const store = createStore(Reducer, middleware);

  // get params
  const action = onHandleShowPageUri(req.params);
  // create saga
  const saga = returnSagaWithParams(handleShowPageUri, action);

  // run the saga middleware
  sagaMiddleware
    .run(saga)
    .done
    .then(() => {
      console.log('preload sagas are done');
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
