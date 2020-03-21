import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cn from 'classnames';
import {OFFER_CATEGORIES, CardType} from '../../const.js';
import {getRatingStarsStyle} from '../../utils.js';
import * as operations from '../../operations/operations.js';
import Header from '../header/header.jsx';
import Reviews from '../reviews/reviews.jsx';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';


const OfferDetails = ({offer, neighbourhoodOffers, onOfferTitleClick, loadComments}) => {
  const {
    id,
    title,
    price,
    rating,
    type,
    bedrooms,
    maxAdults,
    isFavorite,
    isPremium,
    location: offerLocation,
    description,
    goods,
    hostAvatarUrl,
    hostIsPro,
    hostName,
    images,
  } = offer;

  loadComments(id);

  const MAX_IMAGES = 6;

  const bookmarkButtonClass = cn({
    'property__bookmark-button button': true,
    'property__bookmark-button--active': isFavorite,
  });

  const hostAvatarWrapperClass = cn({
    'property__avatar-wrapper user__avatar-wrapper': true,
    'property__avatar-wrapper--pro': hostIsPro,
  });

  const getNearPlacesTitleText = () => {
    if (neighbourhoodOffers.length) {
      return `Other places in the neighbourhood`;
    }
    return `There is no other places in the neighbourhood`;
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_IMAGES).map((img) => (
                <div key={img + id} className="property__image-wrapper">
                  <img className="property__image" src={img} alt={title} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button className={bookmarkButtonClass} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={getRatingStarsStyle(rating)}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li key={good + id} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={hostAvatarWrapperClass}>
                    <img className="property__avatar user__avatar" src={hostAvatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{hostName}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <Reviews offerdId={id} />
            </div>
          </div>
          <Map
            className="property__map map"
            offers={[...neighbourhoodOffers, offer]}
            location={offerLocation}
            currentOfferId={id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">{getNearPlacesTitleText()}</h2>
            <OffersList
              className={`near-places__list places__list`}
              cardsType={CardType.NEAR}
              offers={neighbourhoodOffers}
              onOfferTitleClick={onOfferTitleClick}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

OfferDetails.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf(OFFER_CATEGORIES).isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string).isRequired,
    hostAvatarUrl: PropTypes.string.isRequired,
    hostId: PropTypes.number.isRequired,
    hostIsPro: PropTypes.bool.isRequired,
    hostName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  neighbourhoodOffers: PropTypes.arrayOf(PropTypes.object),
  onOfferTitleClick: PropTypes.func,
  loadComments: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadComments(offerId) {
    dispatch(operations.loadComments(offerId));
  },
});

export default connect(null, mapDispatchToProps)(OfferDetails);
