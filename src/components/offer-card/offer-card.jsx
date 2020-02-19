import React from "react";
import PropTypes from "prop-types";


const convertRatingToPercentageFormat = (rating) => rating / 5 * 100;


const OfferCard = ({offerId, offerInfo, onCardHover, onOfferTitleClick}) => {
  const {title, price, category, rating, imageUrl} = offerInfo;
  const ratingStarsStyle = {width: `${convertRatingToPercentageFormat(rating)}%`};

  return (
    <article onMouseEnter={onCardHover(offerId)} className="cities__place-card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={imageUrl} width="260" height="200" alt="Place image" />
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
            <span style={ratingStarsStyle}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a onClick={onOfferTitleClick} href="#">{title}</a>
        </h2>
        <p className="place-card__type">{category}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offerId: PropTypes.number.isRequired,
  offerInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
  onCardHover: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};


export default OfferCard;
