import {extend, getCities} from './utils.js';
import offers from './mocks/offers.js';


const firstCity = getCities(offers)[0];

const initialState = {
  currentCity: firstCity,
  offers,
};

const ActionType = {
  SET_CITY: `SET_CITY`,
  SET_OFFERS: `SET_OFFERS`,
};

const ActionCreator = {
  setCity: (cityName) => ({
    type: ActionType.SET_CITY,
    payload: {
      cityName,
    },
  }),
  setOffers: (offerItems) => ({
    type: ActionType.SET_OFFERS,
    payload: {
      offerItems,
    },
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY: {
      return extend(state, {currentCity: action.payload.cityName});
    }
    case ActionType.SET_OFFERS: {
      return extend(state, {offers: action.payload.offerItems});
    }
    default:
      return state;
  }
};


export {reducer, ActionCreator, ActionType};
