import React from "react";
import PropTypes from "prop-types";
import OfferCard from '../offer-card/offer-card.jsx';


const OffersList = ({offers, onCardHover, onOfferTitleClick}) => {
  return (
    <div className="cities__places-list places__list">
      {offers.map((offer) => {
        const {id} = offer;
        return (
          <OfferCard
            key={id}
            offer={offer}
            onCardHover={onCardHover}
            onOfferTitleClick={onOfferTitleClick}
          />
        );
      })}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};


export default OffersList;
