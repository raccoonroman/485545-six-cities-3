const OFFER_CATEGORIES = [`apartment`, `room`, `house`, `hotel`];
const DEFAULT_CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED_FIRST: `Top rated first`,
};

const CardType = {
  CITY: `city`,
  NEAR: `near`,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  SET_CITY: `SET_CITY`,
};

export {
  OFFER_CATEGORIES,
  DEFAULT_CITIES,
  SortType,
  CardType,
  ActionType,
};
