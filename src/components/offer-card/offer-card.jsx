import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';
import {OFFER_CATEGORIES} from "../../const.js";
import {getRatingStarsStyle} from "../../utils.js";


const OfferCard = ({offer, onCardHover, onOfferTitleClick}) => {
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

  const ratingRounded = Math.round(rating);

  const bookmarkButtonClass = cn({
    'place-card__bookmark-button button': true,
    'place-card__bookmark-button--active': isFavorite,
  });

  return (
    <article onMouseEnter={onCardHover(id)} onMouseLeave={onCardHover(null)} className="cities__place-card place-card">
      {isPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
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
          <button className={bookmarkButtonClass} type="button">
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
          <a onClick={onOfferTitleClick(id)} href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
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
  onCardHover: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default OfferCard;
