import React from "react";
import PropTypes from "prop-types";
import OfferCard from '../offer-card/offer-card.jsx';


export default class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleOfferCardHover = this.handleOfferCardHover.bind(this);
    this.state = {
      activeCardId: null,
    };
  }

  handleOfferCardHover(offerId) {
    return () => {
      this.setState({
        activeCard: offerId,
      });
    };
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => {
          const {id, offerInfo} = offer;
          return <OfferCard
            key={id}
            offerId={id}
            offerInfo={offerInfo}
            onCardHover={this.handleOfferCardHover}
          />;
        })}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
