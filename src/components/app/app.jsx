import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getOffersByCity, getDistanceBetweenPoints} from '../../utils.js';
import {getMappedOffers, getAuthorizationStatus} from '../../selectors/selectors.js';
import * as operations from '../../operations/operations.js';
import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
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
    const {offers} = this.props;
    const {currentPage, currentPageOfferId} = this.state;

    switch (currentPage) {
      case Page.MAIN: {
        return (
          <Main
            offers={offers}
            onOfferTitleClick={this._handleOfferTitleClick}
          />
        );
      }
      case Page.OFFER_DETAILS: {
        const currentOffer = this._getOfferById(currentPageOfferId);
        const {name: currentOfferCity} = currentOffer.city;
        const offersByCity = getOffersByCity(currentOfferCity, offers);
        const neighbourhoodOffers = this._getNeighbourhoodOffers(currentOffer, offersByCity);
        return (
          <OfferDetails
            offer={currentOffer}
            neighbourhoodOffers={neighbourhoodOffers}
            onOfferTitleClick={this._handleOfferTitleClick}
          />
        );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const {login, offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {this._renderApp()}
          </Route>
          <Route exact path='/dev-offer'>
            <OfferDetails offer={offers[0]} />
          </Route>
          <Route exact path="/dev-auth">
            <SignIn onSubmit={login} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  offers: getMappedOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(operations.login(authData));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
