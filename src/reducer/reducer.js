import {combineReducers} from 'redux';
import {DEFAULT_CITIES, ActionType} from '../const.js';
import {getCitiesByOffers} from '../utils';


const CitiesInitialState = {
  currentCity: DEFAULT_CITIES[0],
  cities: DEFAULT_CITIES,
};

const offers = (state = [], action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS: {
      return action.payload;
    }
  }

  return state;
};

const cities = (state = CitiesInitialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS: {
      const allCities = getCitiesByOffers(action.payload);
      return {
        currentCity: allCities[0],
        cities: allCities,
      };
    }
    case ActionType.SET_CITY: {
      return Object.assign({}, state, {currentCity: action.payload});
    }
  }

  return state;
};


export {offers, cities};

export default combineReducers({
  offers,
  cities,
});
