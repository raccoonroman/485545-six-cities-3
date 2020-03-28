import React from 'react';
import cn from 'classnames';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {OFFER_CATEGORIES, CardType, AppRoute} from '../../const.js';
import {getRatingStarsStyle, isAuthorized} from '../../utils.js';
import {getAuthorizationStatus} from '../../selectors/selectors.js';
import * as operations from '../../operations/operations.js';


const OfferCard = (props) => {
  const {
    history,
    cardType,
    offer,
    onCardHover,
    authorizationStatus,
    setFavoriteStatus,
  } = props;

  const {
    id,
    title,
    previewImage,
    price,
    rating,
    type,
    isFavorite,
    isPremium,
  } = offer;

  const authorized = isAuthorized(authorizationStatus);
  const ratingRounded = Math.round(rating);

  const handleBookmarkButtonClick = () => {
    if (!authorized) {
      history.push(AppRoute.LOGIN);
    } else {
      const status = +(!isFavorite);
      setFavoriteStatus(id, status);
    }
  };


  const placeCardClass = cn({
    'cities__place-card': cardType === CardType.CITY,
    'near-places__card': cardType === CardType.NEAR,
    'place-card': true,
  });
  const imageWrapperClass = cn({
    'cities__image-wrapper': cardType === CardType.CITY,
    'near-places__image-wrapper': cardType === CardType.NEAR,
    'place-card__image-wrapper': true,
  });
  const bookmarkButtonClass = cn({
    'place-card__bookmark-button button': true,
    'place-card__bookmark-button--active': isFavorite,
  });

  return (
    <article
      onMouseEnter={onCardHover && onCardHover(id)}
      onMouseLeave={onCardHover && onCardHover(null)}
      className={placeCardClass}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className={imageWrapperClass}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleBookmarkButtonClick} className={bookmarkButtonClass} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getRatingStarsStyle(ratingRounded)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  history: PropTypes.object.isRequired,
  cardType: PropTypes.string.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf(OFFER_CATEGORIES).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
  }).isRequired,
  onCardHover: PropTypes.func,
  authorizationStatus: PropTypes.string.isRequired,
  setFavoriteStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  setFavoriteStatus(offerId, status) {
    dispatch(operations.setFavoriteStatus(offerId, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
