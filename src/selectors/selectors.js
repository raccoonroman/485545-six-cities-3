import {createSelector} from 'reselect';
import {mapToClient} from '../adapter.js';


export const getOffers = (state) => state.offers;
export const getCitiesList = (state) => state.cities.cities;
export const getCurrentCity = (state) => state.cities.currentCity;

export const getMappedOffers = createSelector(
    getOffers,
    (offers) => offers.map((offer) => mapToClient(offer))
);
