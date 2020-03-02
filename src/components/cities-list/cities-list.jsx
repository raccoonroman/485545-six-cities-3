import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {CITIES} from "../../const.js";


const CitiesList = ({currentCity, onCityChange}) => {
  const getTabClass = (city) => cn({
    'locations__item-link': true,
    'tabs__item': true,
    'tabs__item--active': city === currentCity,
  });

  const handleCityTabClick = (cityName) => (evt) => {
    evt.preventDefault();
    onCityChange(cityName);
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map(({name}) => (
        <li key={name} className="locations__item">
          <a onClick={handleCityTabClick(name)} className={getTabClass(name)} href="#">
            <span>{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};


export default CitiesList;
