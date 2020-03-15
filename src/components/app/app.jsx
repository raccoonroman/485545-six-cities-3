import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getOffersByCity, getDistanceBetweenPoints} from '../../utils.js';
import * as actions from '../../actions/actions.js';
import Main from '../main/main.jsx';
import OfferDetails from '../offer-details/offer-details.jsx';


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

  _getNeighbourhoodOffers(currentOffer, offers) {
    const offersWithoutCurrent = offers.filter(({id}) => id !== currentOffer.id);
    const sortedOffersByDistance = offersWithoutCurrent.slice().sort((a, b) => {
      const {longitude: x0, latitude: y0} = currentOffer.location;
      const {longitude: x1, latitude: y1} = a.location;
      const {longitude: x2, latitude: y2} = b.location;
      const distanceToFirstPoint = getDistanceBetweenPoints([x0, y0], [x1, y1]);
      const distanceToSecondPoint = getDistanceBetweenPoints([x0, y0], [x2, y2]);
      return distanceToFirstPoint - distanceToSecondPoint;
    });

    return sortedOffersByDistance.slice(0, 3);
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
        const currentOffer = this._getOfferById(currentPageOfferId);
        const offersByCity = getOffersByCity(currentCity, offers);
        const neighbourhoodOffers = this._getNeighbourhoodOffers(currentOffer, offersByCity);
        return (
          <OfferDetails
            offer={currentOffer}
            neighbourhoodOffers={neighbourhoodOffers}
            onOfferTitleClick={this._handleOfferTitleClick}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {offers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {this._renderApp()}
          </Route>
          <Route exact path='/offer'>
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

// const mapStateToProps = ({currentCity, offers}) => ({currentCity, offers});
const mapStateToProps = ({offers, cities}) => {
  return {
    offers,
    currentCity: cities.currentCity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCityChange(cityName) {
    dispatch(actions.setCity(cityName));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
