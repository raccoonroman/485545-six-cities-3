import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const.js';
import {isAuthorized} from '../../utils.js';
import {getAuthorizationStatus} from '../../selectors/selectors.js';
import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import OfferDetails from '../offer-details/offer-details.jsx';
import Favorites from '../favorites/favorites.jsx';


const App = ({authorizationStatus}) => {
  const authorized = isAuthorized(authorizationStatus);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT} render={({history}) => (
          <Main history={history} />
        )} />
        <Route exact path={`${AppRoute.OFFER}/:id`} render={({match}) => (
          <OfferDetails match={match} />
        )} />
        <Route exact path={AppRoute.LOGIN} render={({history}) => (
          !authorized ? <SignIn history={history} /> : <Redirect to={AppRoute.ROOT} />
        )} />
        <Route exact path={AppRoute.FAVORITES} render={() => (
          authorized ? <Favorites /> : <Redirect to={AppRoute.LOGIN} />
        )} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(App);

