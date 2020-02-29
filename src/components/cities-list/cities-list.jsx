import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {CITIES} from "../../const.js";


const CitiesList = ({currentCity, onCityTabClick}) => {
  const getTabClass = (city) => cn({
    'locations__item-link': true,
    'tabs__item': true,
    'tabs__item--active': city === currentCity,
  });

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map(({name}) => (
        <li key={name} className="locations__item">
          <a onClick={onCityTabClick(name)} className={getTabClass(name)} href="#">
            <span>{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onCityTabClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCityTabClick: (city) => (evt) => {
    evt.preventDefault();
    dispatch(ActionCreator.setCity(city));
  },
});


export {CitiesList};
export default connect(null, mapDispatchToProps)(CitiesList);
