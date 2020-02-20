import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";


const Page = {
  MAIN: `main`,
  OFFER_DETAILS: `offer details`
};


export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleOfferTitleClick = this._handleOfferTitleClick.bind(this);
    this.state = {
      currentPage: Page.MAIN,
      currentPageOffer: null,
    };
  }

  _handleOfferTitleClick(offer) {
    return (evt) => {
      evt.preventDefault();
      this.setState({
        currentPage: Page.OFFER_DETAILS,
        currentPageOffer: offer,
      });
    };
  }

  _renderApp() {
    const {offers} = this.props;
    const {currentPage, currentPageOffer} = this.state;

    switch (currentPage) {
      case Page.MAIN:
        return (
          <Main
            offers={offers}
            onOfferTitleClick={this._handleOfferTitleClick}
          />
        );
      case Page.OFFER_DETAILS:
        return (
          <OfferDetails
            offer={currentPageOffer}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-details">
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
