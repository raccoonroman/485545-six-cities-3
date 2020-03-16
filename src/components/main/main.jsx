import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {getOffersByCity} from '../../utils.js';
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
    onOfferTitleClick,
    hoveredCardId,
    onCardHover,
  } = props;

  const offersByCity = getOffersByCity(currentCity, offers);


  const renderOffersList = () => {
    if (!offersByCity.length) {
      return (
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property availbale at the moment in {currentCity}
            </p>
          </div>
        </section>
      );
    }

    return (
      <OffersListWithSorting
        offers={offersByCity}
        currentCity={currentCity}
        onCardHover={onCardHover}
        onOfferTitleClick={onOfferTitleClick}
      />
    );
  };

  const renderMap = () => {
    if (!offersByCity.length) {
      return null;
    }

    const {location: cityLocation} = offersByCity[0].city;
    return (
      <Map
        className="cities__map map"
        offers={offersByCity}
        cityLocation={cityLocation}
        currentOfferId={hoveredCardId}
      />
    );
  };

  const mainClass = cn({
    'page__main page__main--index': true,
    'page__main--index-empty': offersByCity.length === 0,
  });

  const offersContainerClass = cn({
    'cities__places-container container': true,
    'cities__places-container--empty': offersByCity.length === 0,
  });

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={currentCity} />
          </section>
        </div>
        <div className="cities">
          <div className={offersContainerClass}>
            {renderOffersList()}

            <div className="cities__right-section">
              {renderMap()}
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
  onOfferTitleClick: PropTypes.func.isRequired,
  hoveredCardId: PropTypes.number,
  onCardHover: PropTypes.func.isRequired,
};

export default withHoveredCard(Main);
