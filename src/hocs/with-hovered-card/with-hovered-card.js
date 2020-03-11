import React from 'react';
import PropTypes from 'prop-types';


const withHoveredCard = (Component) => {
  class WithHoveredCard extends React.PureComponent {
    constructor(props) {
      super(props);
      this._handleOfferCardHover = this._handleOfferCardHover.bind(this);
      this.state = {
        hoveredCardId: null,
      };
    }

    _handleOfferCardHover(offerId) {
      return () => {
        this.setState({
          hoveredCardId: offerId,
        });
      };
    }

    render() {
      const {hoveredCardId} = this.state;

      return (
        <Component
          {...this.props}
          hoveredCardId={hoveredCardId}
          onCardHover={this._handleOfferCardHover}
        />
      );
    }
  }

  WithHoveredCard.propTypes = {
    currentCity: PropTypes.string.isRequired,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          city: PropTypes.shape({
            name: PropTypes.string.isRequired,
            location: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired
    ).isRequired,
    onCityChange: PropTypes.func.isRequired,
    onOfferTitleClick: PropTypes.func.isRequired,
  };


  return WithHoveredCard;
};


export default withHoveredCard;
