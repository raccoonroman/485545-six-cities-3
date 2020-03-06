import React from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../const.js';
import {getCities} from '../../utils.js';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Sorting from '../sorting/sorting.jsx';
import Map from '../map/map.jsx';


const sortTypes = [
  {
    name: SortType.POPULAR,
    sort: (offers) => offers,
  },
  {
    name: SortType.PRICE_LOW_TO_HIGH,
    sort: (offers) => offers.slice().sort((a, b) => a.price - b.price),
  },
  {
    name: SortType.PRICE_HIGH_TO_LOW,
    sort: (offers) => offers.slice().sort((a, b) => b.price - a.price),
  },
  {
    name: SortType.TOP_RATED_FIRST,
    sort: (offers) => offers.slice().sort((a, b) => b.rating - a.rating),
  },
];


class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this.state = {
      sortBy: SortType.POPULAR,
    };
  }

  _getSortedOffersByCity(offers, currentCity, sortType) {
    const offersByCity = offers.filter(({city}) => currentCity === city.name);
    const {sort} = sortTypes.find(({name}) => sortType === name);
    return sort(offersByCity);
  }

  _onSortTypeChange(sortType) {
    this.setState({sortBy: sortType});
  }

  render() {
    const {sortBy} = this.state;
    const {
      currentCity,
      offers,
      onCityChange,
      onOfferTitleClick,
    } = this.props;

    const offersByCity = this._getSortedOffersByCity(offers, currentCity, sortBy);
    const {location: currentCityLocation} = offersByCity[0].city;

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

              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersByCity.length} places to stay in {currentCity}
                </b>
                <Sorting
                  sortBy={sortBy}
                  onSortTypeChange={this._onSortTypeChange}
                />
                <OffersList
                  offers={offersByCity}
                  onOfferTitleClick={onOfferTitleClick}
                />
              </section>

              <div className="cities__right-section">
                <Map
                  className="cities__map map"
                  offers={offersByCity}
                  cityLocation={currentCityLocation}
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
        }).isRequired,
      }).isRequired
  ).isRequired,
  onCityChange: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};


export default Main;
