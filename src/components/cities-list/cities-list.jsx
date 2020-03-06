import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';


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


export default CitiesList;
