import * as React from 'react';


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

  return WithHoveredCard;
};


export default withHoveredCard;
