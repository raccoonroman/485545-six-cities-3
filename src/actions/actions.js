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

export const setEmail = (email) => ({
  type: ActionType.SET_EMAIL,
  payload: email,
});

export const loadComments = (comments) => ({
  type: ActionType.LOAD_COMMENTS,
  payload: comments,
});

export const loadFavoriteOffers = (favoriteOffers) => ({
  type: ActionType.LOAD_FAVORITE_OFFERS,
  payload: favoriteOffers,
});

export const loadNearbyOffers = (nearbyOffers) => ({
  type: ActionType.LOAD_NEARBY_OFFERS,
  payload: nearbyOffers,
});
