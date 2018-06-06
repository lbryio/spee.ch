import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Reducers from '@reducers';
import GAListener from '@components/GAListener';
import App from '@app';
import renderFullPage from '../renderFullPage.js';
import Helmet from 'react-helmet';

const siteConfig = require('@config/siteConfig');

module.exports = (req, res) => {
  let context = {};

  // customize the reducer by passing in intial state configs
  const MyReducers = Reducers(siteConfig);
  const MyApp = App;
  const MyGAListener = GAListener(siteConfig);

  // create a new Redux store instance
  const store = createStore(MyReducers);

  // render component to a string
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <MyGAListener>
          <MyApp />
        </MyGAListener>
      </StaticRouter>
    </Provider>
  );

  // get head tags from helmet
  const helmet = Helmet.renderStatic();

  // check for a redirect
  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url);
  } else {
    // we're good, send the response
  }

  // get the initial state from our Redux store
  const preloadedState = store.getState();

  // send the rendered page back to the client
  res.send(renderFullPage(helmet, html, preloadedState));
};
