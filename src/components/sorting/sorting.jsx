import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {SortType} from '../../const.js';


class Sorting extends React.PureComponent {
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

  _renderSortItems() {
    const {sortBy} = this.props;
    const sortTypes = Object.values(SortType);

    return sortTypes.map((sortType) => {
      const sortItemClass = cn({
        'places__option': true,
        'places__option--active': sortType === sortBy,
      });
      return (
        <li
          key={sortType}
          onClick={this._handleSortItemClick(sortType)}
          className={sortItemClass}
          tabIndex="0"
        >
          {sortType}
        </li>
      );
    });
  }

  render() {
    const {sortListOpened} = this.state;
    const {sortBy} = this.props;

    const sortListClass = cn({
      'places__options places__options--custom': true,
      'places__options--opened': sortListOpened,
    });

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span onClick={this._handleSortTypeClick} className="places__sorting-type" tabIndex="0">
          {sortBy}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={sortListClass}>
          {this._renderSortItems()}
        </ul>
      </form>
    );
  }
}

Sorting.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

export default Sorting;
