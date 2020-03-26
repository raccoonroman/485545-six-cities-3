export const OFFER_CATEGORIES = [`apartment`, `room`, `house`, `hotel`];
export const DEFAULT_CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`,
};

export const CardType = {
  CITY: `city`,
  NEAR: `near`,
};

export const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  SET_CITY: `SET_CITY`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_EMAIL: `SET_EMAIL`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
};
