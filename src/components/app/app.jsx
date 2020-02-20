import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";


const handleOfferTitleClick = () => {};


export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {offers} = this.props;

    return (
      <Main
        offers={offers}
        onOfferTitleClick={handleOfferTitleClick}
      />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <OfferDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
