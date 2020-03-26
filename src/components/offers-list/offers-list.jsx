import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';


const OffersList = ({className, cardsType, offers, onCardHover}) => {
  return (
    <div className={className}>
      {offers.map((offer) => {
        const {id} = offer;
        return (
          <OfferCard
            key={id}
            cardType={cardsType}
            offer={offer}
            onCardHover={onCardHover}
          />
        );
      })}
    </div>
  );
};

OffersList.propTypes = {
  className: PropTypes.string.isRequired,
  cardsType: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardHover: PropTypes.func,
};


export default OffersList;
