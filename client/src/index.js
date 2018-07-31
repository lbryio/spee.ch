import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import Reducers from '@reducers';
import Sagas from '@sagas';
import App from '@app';
import GAListener from '@components/GAListener';

// import scss so webpack will build it
import 'all.scss';

// get the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__ || null;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// create and apply middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const reduxMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__()) : middleware;

// create the store
let store;
if (preloadedState) {
    store = createStore(Reducers, preloadedState, reduxMiddleware);
} else {
    store = createStore(Reducers, reduxMiddleware);
}

sagaMiddleware.run(Sagas.rootSaga);

// render the app
hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <GAListener>
                <App />
            </GAListener>
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-app')
);
