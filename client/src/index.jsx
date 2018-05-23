// app, reducers, sagas, actions
import App from './app';
import Reducers from './reducers';
import Sagas from './sagas';
import Actions from './actions';
import GAListener from './components/GAListener';

// can it be a function and pass in the config like this?,
// or should all the configs just come from the store (assuming the initial config can be used to config the store)?
module.exports = {
    App,
    Reducers,
    Sagas, // includes all the sagas
    Actions, // includes all the actions
    GAListener,
};
