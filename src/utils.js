import {AuthorizationStatus} from './const.js';


const getRatingStarsStyle = (rating) => ({width: `${rating / 5 * 100}%`});

const getCitiesByOffers = (offers) => {
  const cities = offers.map(({city}) => city.name);
  return [...new Set(cities)];
};

const getOffersByCity = (currentCity, offers) => {
  return offers.filter(({city}) => currentCity === city.name);
};

const getDistanceBetweenPoints = ([x1, y1], [x2, y2]) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const isAuthorized = (authorizationStatus) => {
  return authorizationStatus === AuthorizationStatus.AUTH;
};


export {
  getRatingStarsStyle,
  getCitiesByOffers,
  getOffersByCity,
  getDistanceBetweenPoints,
  isAuthorized,
};
