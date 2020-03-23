import {AuthorizationStatus} from './const.js';


export const getRatingStarsStyle = (rating) => ({width: `${rating / 5 * 100}%`});

export const getCitiesByOffers = (offers) => {
  const cities = offers.map(({city}) => city.name);
  return [...new Set(cities)];
};

export const getOffersByCity = (currentCity, offers) => {
  return offers.filter(({city}) => currentCity === city.name);
};

export const getDistanceBetweenPoints = ([x1, y1], [x2, y2]) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const isAuthorized = (authorizationStatus) => {
  return authorizationStatus === AuthorizationStatus.AUTH;
};

export const getTime = (timestamp) => new Date(timestamp).getTime();
