import React from 'react';
import PropTypes from 'prop-types';
import {getCities, getOffersByCity} from '../../utils.js';
import withSorting from '../../hocs/with-sorting/with-sorting.js';
import Header from '../../components/header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';


const OffersListWithSorting = withSorting(OffersList);


class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this._handleOfferCardHover = this._handleOfferCardHover.bind(this);
    this.state = {
      hoveredCardId: null,
    };
  }

  _handleOfferCardHover(offerId) {
    return () => {
      this.setState({
        hoveredCardId: offerId,
      });
    };
  }

  render() {
    const {hoveredCardId} = this.state;
    const {
      currentCity,
      offers,
      onCityChange,
      onOfferTitleClick,
    } = this.props;

    const offersByCity = getOffersByCity(currentCity, offers);
    const {location: currentCityLocation} = offersByCity[0].city;

    return (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                cities={getCities(offers)}
                currentCity={currentCity}
                onCityChange={onCityChange}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">

              <OffersListWithSorting
                offers={offersByCity}
                currentCity={currentCity}
                onCardHover={this._handleOfferCardHover}
                onOfferTitleClick={onOfferTitleClick}
              />

              <div className="cities__right-section">
                <Map
                  className="cities__map map"
                  offers={offersByCity}
                  cityLocation={currentCityLocation}
                  currentOfferId={hoveredCardId}
                />
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.shape({
          name: PropTypes.string.isRequired,
          location: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired
  ).isRequired,
  onCityChange: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};


export default Main;
