import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {AuthorizationStatus} from './const.js';
import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {requireAuthorization} from './actions/actions.js';
import {loadOffers, checkAuth, loadFavoriteOffers} from './operations/operations.js';
import {createAPI} from './api.js';


const onUnauthorized = () => {
  store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(loadOffers());
store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
