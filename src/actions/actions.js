import {ActionType} from '../const.js';


export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers,
});

export const setCity = (cityName) => ({
  type: ActionType.SET_CITY,
  payload: cityName,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});
