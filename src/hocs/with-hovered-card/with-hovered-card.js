import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentCity} from '../../selectors/selectors.js';


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
    onOfferTitleClick: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => {
    const currentCity = getCurrentCity(state);
    return {currentCity};
  };

  return connect(mapStateToProps)(WithHoveredCard);
};


export default withHoveredCard;
