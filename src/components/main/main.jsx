import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {OFFER_CATEGORIES} from '../../const.js';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';


const Main = ({currentCity, offers, onCityChange, onOfferTitleClick}) => {
  const offersByCity = offers.filter(({offerInfo: {city}}) => currentCity === city);

  const renderOffersSection = () => {
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
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex="0">Popular</li>
            <li className="places__option" tabIndex="0">Price: low to high</li>
            <li className="places__option" tabIndex="0">Price: high to low</li>
            <li className="places__option" tabIndex="0">Top rated first</li>
          </ul>
        </form>

        <OffersList
          offers={offersByCity}
          onOfferTitleClick={onOfferTitleClick}
        />

      </section>
    );
  };

  const renderMap = () => {
    if (!offersByCity.length) {
      return null;
    }

    return <Map offers={offersByCity} city={currentCity} />;
  };

  const mainElementClass = cn({
    'page__main': true,
    'page__main--index': true,
    'page__main--index-empty': offersByCity.length === 0,
  });

  const offersContainerClass = cn({
    'cities__places-container': true,
    'container': true,
    'cities__places-container--empty': offersByCity.length === 0,
  });

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={mainElementClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              currentCity={currentCity}
              onCityChange={onCityChange}
            />
          </section>
        </div>
        <div className="cities">
          <div className={offersContainerClass}>
            {renderOffersSection()}
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
        id: PropTypes.number.isRequired,
        offerInfo: PropTypes.shape({
          title: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          mark: PropTypes.string,
          category: PropTypes.oneOf(OFFER_CATEGORIES).isRequired,
          rating: PropTypes.number.isRequired,
          imageUrl: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
  ).isRequired,
  onCityChange: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};


export default Main;
