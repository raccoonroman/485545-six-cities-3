import {combineReducers} from 'redux';
import {DEFAULT_CITIES, ActionType, AuthorizationStatus} from '../const.js';
import {getCitiesByOffers} from '../utils';


const InitialState = {
  CITIES: {
    currentCity: DEFAULT_CITIES[0],
    cities: DEFAULT_CITIES,
  },
  AUTHORIZATION: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
  USER_DATA: {
    email: ``,
  },
};

const offers = (state = [], action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS: {
      return action.payload;
    }
    case ActionType.UPDATE_OFFER: {
      const newOffer = action.payload;
      const {id: newOfferId} = newOffer;
      const i = state.findIndex(({id}) => id === newOfferId);
      return [...state.slice(0, i), newOffer, ...state.slice(i + 1)];
    }
  }

  return state;
};

const cities = (state = InitialState.CITIES, action) => {
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

const authorization = (state = InitialState.AUTHORIZATION, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION: {
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    }
  }

  return state;
};

const userData = (state = InitialState.USER_DATA, action) => {
  switch (action.type) {
    case ActionType.SET_EMAIL: {
      return Object.assign({}, state, {
        email: action.payload,
      });
    }
  }

  return state;
};

const commentsByOffer = (state = [], action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS: {
      return action.payload;
    }
  }

  return state;
};

const nearbyOffers = (state = [], action) => {
  switch (action.type) {
    case ActionType.LOAD_NEARBY_OFFERS: {
      return action.payload;
    }
  }

  return state;
};


export {
  offers,
  cities,
  authorization,
  userData,
  commentsByOffer,
  nearbyOffers,
};

export default combineReducers({
  offers,
  cities,
  authorization,
  userData,
  commentsByOffer,
  nearbyOffers,
});
