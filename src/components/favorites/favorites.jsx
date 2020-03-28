import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getFavoriteOffers} from '../../selectors/selectors.js';
import Header from '../header/header.jsx';


const Favorites = () => {
  return (
    <div className="page page--favorites-empty">
      <Header />

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favoriteOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
});

export default connect(mapStateToProps)(Favorites);
