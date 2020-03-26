import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import OfferDetails from '../offer-details/offer-details.jsx';
import Favorites from '../favorites/favorites.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT} component={Main} />
        <Route exact path={`${AppRoute.OFFER}/:id`} component={OfferDetails} />
        <Route exact path={AppRoute.LOGIN} component={SignIn} />
        <Route exact path={AppRoute.FAVORITES} component={Favorites} />
      </Switch>
    </BrowserRouter>
  );
};


export default App;
