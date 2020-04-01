import * as React from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {getCitiesList} from '../../selectors/selectors';
import {setCity} from '../../actions/actions';


const CitiesList = ({cities, currentCity, onCityChange}) => {
  const getTabClass = (city) => cn({
    'locations__item-link tabs__item': true,
    'tabs__item--active': city === currentCity,
  });

  const handleCityTabClick = (city) => (evt) => {
    evt.preventDefault();
    onCityChange(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <a onClick={handleCityTabClick(city)} className={getTabClass(city)} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: getCitiesList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(cityName) {
    dispatch(setCity(cityName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
