import React from 'react';
import PropTypes from 'prop-types';
import {getCities, getOffersByCity} from '../../utils.js';
import withHoveredCard from '../../hocs/with-hovered-card/with-hovered-card.js';
import withSorting from '../../hocs/with-sorting/with-sorting.js';
import Header from '../../components/header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';


const OffersListWithSorting = withSorting(OffersList);


const Main = (props) => {
  const {
    currentCity,
    offers,
    onCityChange,
    onOfferTitleClick,
    hoveredCardId,
    onCardHover,
  } = props;

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
              onCardHover={onCardHover}
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
};

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
  hoveredCardId: PropTypes.number,
  onCardHover: PropTypes.func.isRequired,
};

export default withHoveredCard(Main);
