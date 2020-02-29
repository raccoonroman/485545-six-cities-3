import {CITIES} from "./const.js";
import {extend} from "./utils.js";


const initialState = {
  currentCity: CITIES[0].name,
  offers: [],
};

const ActionType = {
  SET_CITY: `SET_CITY`,
  SET_OFFERS: `SET_OFFERS`,
};

const ActionCreator = {
  setCity: (city) => ({
    type: ActionType.SET_CITY,
    payload: {
      city,
    },
  }),
  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: {
      offers,
    },
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CITY: {
      return extend(state, {currentCity: action.payload.city});
    }
    case ActionType.SET_OFFERS: {
      return extend(state, {offers: action.payload.offers});
    }
    default:
      return state;
  }
};


export {reducer, ActionCreator};
