import React from "react";
import PropTypes from "prop-types";
import {getRatingStarsStyle} from "../../utils.js";


const CATEGORIES = [`apartment`, `room`, `house`, `hotel`];


const OfferCard = ({offer, onCardHover, onOfferTitleClick}) => {
  const {id, offerInfo} = offer;
  const {title, price, mark, category, rating, imageUrl} = offerInfo;
  const ratingRounded = Math.round(rating);

  return (
    <article onMouseEnter={onCardHover(id)} className="cities__place-card place-card">
      {mark && <div className="place-card__mark">
        <span>{mark}</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={imageUrl} width="260" height="200" alt={title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
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
          <a onClick={onOfferTitleClick(offer)} href="#">{title}</a>
        </h2>
        <p className="place-card__type">{category}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    offerInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      mark: PropTypes.string,
      category: PropTypes.oneOf(CATEGORIES).isRequired,
      rating: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default OfferCard;
