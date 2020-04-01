import * as React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const';
import {isAuthorized} from '../../utils';
import {getAuthorizationStatus} from '../../selectors/selectors';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import OfferDetails from '../offer-details/offer-details';
import Favorites from '../favorites/favorites';


const App = ({authorizationStatus}) => {
  const authorized = isAuthorized(authorizationStatus);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT} render={({history}) => (
          <Main history={history} />
        )} />
        <Route exact path={`${AppRoute.OFFER}/:id`} render={(props) => (
          <OfferDetails {...props} />
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

