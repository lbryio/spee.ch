import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import Reducer from '../react/reducers';
import renderFullPage from './renderFullPage.js';

import StaticRouter from 'react-router-dom/StaticRouter';
import GAListener from '../react/components/GAListener';
import App from '../react/app';

module.exports = (req, res) => {
  let context = {};

  // create a new Redux store instance
  const store = createStore(Reducer);

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

  // get the initial state from our Redux store
  const preloadedState = store.getState();

  // send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState));
};
