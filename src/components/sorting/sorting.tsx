import * as React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {SortType} from '../../const';
import withListOpenState from '../../hocs/with-list-open-state/with-list-open-state';


const Sorting = ({sortBy, sortListOpened, onSortTypeClick, onSortItemClick}) => {
  const sortListClass = cn({
    'places__options places__options--custom': true,
    'places__options--opened': sortListOpened,
  });

  const renderSortItems = () => {
    const sortTypes = Object.values(SortType);

    return sortTypes.map((sortType) => {
      const sortItemClass = cn({
        'places__option': true,
        'places__option--active': sortType === sortBy,
      });
      return (
        <li
          key={sortType}
          onClick={onSortItemClick(sortType)}
          className={sortItemClass}
          tabIndex="0"
        >
          {sortType}
        </li>
      );
    });
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={onSortTypeClick} className="places__sorting-type" tabIndex="0">
        {sortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortListClass}>{renderSortItems()}</ul>
    </form>
  );
};

Sorting.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortListOpened: PropTypes.bool.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onSortItemClick: PropTypes.func.isRequired,
};

export default withListOpenState(Sorting);
