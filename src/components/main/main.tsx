import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {getOffersByCity} from '../../utils';
import withHoveredCard from '../../hocs/with-hovered-card/with-hovered-card';
import withSorting from '../../hocs/with-sorting/with-sorting';
import {getCurrentCity, getMappedOffers} from '../../selectors/selectors';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';


const OffersListWithSorting = withSorting(OffersList);


const Main = ({history, currentCity, offers, hoveredCardId, onCardHover}) => {
  const offersByCity = getOffersByCity(currentCity, offers);

  const renderOffersList = () => {
    if (!offersByCity.length) {
      return (
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property available at the moment in {currentCity}
            </p>
          </div>
        </section>
      );
    }

    return (
      <OffersListWithSorting
        history={history}
        offers={offersByCity}
        currentCity={currentCity}
        onCardHover={onCardHover}
      />
    );
  };

  const renderMap = () => {
    if (!offersByCity.length) {
      return null;
    }

    return (
      <Map
        className="cities__map map"
        offers={offersByCity}
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
  history: PropTypes.object.isRequired,
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.shape({
          name: PropTypes.string.isRequired,
          location: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired
  ).isRequired,
  hoveredCardId: PropTypes.number,
  onCardHover: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  offers: getMappedOffers(state),
});

export default connect(mapStateToProps)(withHoveredCard(Main));
