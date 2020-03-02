import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import OfferDetails from "../offer-details/offer-details.jsx";


const Page = {
  MAIN: `main`,
  OFFER_DETAILS: `offer details`
};


class App extends React.PureComponent {
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
    const {currentCity, offers, onCityChange} = this.props;
    const {currentPage, currentPageOfferId} = this.state;

    switch (currentPage) {
      case Page.MAIN:
        return (
          <Main
            currentCity={currentCity}
            offers={offers}
            onCityChange={onCityChange}
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
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = ({currentCity, offers}) => ({currentCity, offers});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(cityName) {
    dispatch(ActionCreator.setCity(cityName));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
