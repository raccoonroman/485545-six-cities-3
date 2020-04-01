import * as React from 'react';
import PropTypes from 'prop-types';
import {SortType, CardType} from '../../const';
import Sorting from '../../components/sorting/sorting';


const sortTypes = [
  {
    name: SortType.POPULAR,
    sort: (offers) => offers,
  },
  {
    name: SortType.PRICE_LOW_TO_HIGH,
    sort: (offers) => offers.slice().sort((a, b) => a.price - b.price),
  },
  {
    name: SortType.PRICE_HIGH_TO_LOW,
    sort: (offers) => offers.slice().sort((a, b) => b.price - a.price),
  },
  {
    name: SortType.TOP_RATED_FIRST,
    sort: (offers) => offers.slice().sort((a, b) => b.rating - a.rating),
  },
];


const withSorting = (Component) => {
  class WithSorting extends React.PureComponent {
    constructor(props) {
      super(props);
      this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
      this.state = {
        sortBy: SortType.POPULAR,
      };
    }

    _handleSortTypeChange(sortType) {
      this.setState({sortBy: sortType});
    }

    _getSortedOffers(offers, sortType) {
      const {sort} = sortTypes.find(({name}) => sortType === name);
      return sort(offers);
    }

    render() {
      const {sortBy} = this.state;
      const {history, offers, currentCity, onCardHover} = this.props;

      const sortedOffers = this._getSortedOffers(offers, sortBy);

      return (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offers.length} places to stay in {currentCity}
          </b>
          <Sorting
            sortBy={sortBy}
            onSortTypeChange={this._handleSortTypeChange}
          />
          <Component
            history={history}
            className={`cities__places-list places__list`}
            cardsType={CardType.CITY}
            offers={sortedOffers}
            onCardHover={onCardHover}
          />
        </section>
      );
    }
  }

  WithSorting.propTypes = {
    history: PropTypes.object.isRequired,
    offers: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentCity: PropTypes.string.isRequired,
    onCardHover: PropTypes.func.isRequired,
  };


  return WithSorting;
};


export default withSorting;
