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
      currentPageOfferId: null,
    };
  }

  _getOfferById(currentId) {
    const {offers} = this.props;
    return offers.find(({id}) => id === currentId);
  }

  _handleOfferTitleClick(id) {
    return (evt) => {
      evt.preventDefault();
      this.setState({
        currentPage: Page.OFFER_DETAILS,
        currentPageOfferId: id,
      });
    };
  }

  _renderApp() {
    const {offers} = this.props;
    const {currentPage, currentPageOfferId} = this.state;

    switch (currentPage) {
      case Page.MAIN:
        return (
          <Main
            offers={offers}
            onOfferTitleClick={this._handleOfferTitleClick}
          />
        );
      case Page.OFFER_DETAILS:
        const offer = this._getOfferById(currentPageOfferId);
        return <OfferDetails offer={offer} />;
      default:
        return null;
    }
  }

  render() {
    const {offers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer">
            <OfferDetails offer={offers[0]} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
