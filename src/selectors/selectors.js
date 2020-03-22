import {createSelector} from 'reselect';
import {mapOffersToClient, mapCommentsToClient} from '../adapter.js';


export const getOffers = (state) => state.offers;
export const getCitiesList = (state) => state.cities.cities;
export const getCurrentCity = (state) => state.cities.currentCity;
export const getAuthorizationStatus = (state) => state.authorization.authorizationStatus;
export const getUserEmail = (state) => state.userData.email;
export const getCommentsByOffer = (state) => state.commentsByOffer;

export const getMappedOffers = createSelector(
    getOffers,
    (offers) => offers.map((offer) => mapOffersToClient(offer))
);

export const getMappedComments = createSelector(
    getCommentsByOffer,
    (comments) => comments.map((comment) => mapCommentsToClient(comment))
);

export const getTenSortedComments = createSelector(
    getMappedComments,
    (mappedComments) => mappedComments.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)
);
