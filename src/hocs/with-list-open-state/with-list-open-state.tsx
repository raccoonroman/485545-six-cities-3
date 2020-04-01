import * as React from 'react';
import PropTypes from 'prop-types';


const withListOpenState = (Component) => {
  class WithListOpenState extends React.PureComponent {
    constructor(props) {
      super(props);
      this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
      this._handleSortItemClick = this._handleSortItemClick.bind(this);
      this.state = {
        sortListOpened: false,
      };
    }

    _handleSortTypeClick() {
      this.setState(({sortListOpened}) => ({
        sortListOpened: !sortListOpened,
      }));
    }

    _handleSortItemClick(sortType) {
      const {onSortTypeChange} = this.props;
      return () => {
        this.setState({sortListOpened: false});
        onSortTypeChange(sortType);
      };
    }

    render() {
      const {sortListOpened} = this.state;
      const {sortBy} = this.props;

      return (
        <Component
          sortBy={sortBy}
          sortListOpened={sortListOpened}
          onSortTypeClick={this._handleSortTypeClick}
          onSortItemClick={this._handleSortItemClick}
        />
      );
    }
  }

  WithListOpenState.propTypes = {
    sortBy: PropTypes.string.isRequired,
    onSortTypeChange: PropTypes.func.isRequired,
  };


  return WithListOpenState;
};


export default withListOpenState;
