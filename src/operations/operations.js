import * as actions from '../actions/actions.js';
import {AuthorizationStatus} from '../const.js';


export const loadOffers = () => (dispatch, getState, api) => {
  return api
    .get(`/hotels`)
    .then((data) => {
      dispatch(actions.loadOffers(data));
    })
    .catch((err) => {
      throw err;
    });
};

export const loadNearbyOffers = (offerId) => (dispatch, getState, api) => {
  return api
    .get(`/hotels/${offerId}/nearby`)
    .then((data) => {
      dispatch(actions.loadNearbyOffers(data));
    })
    .catch((err) => {
      throw err;
    });
};

export const checkAuth = () => (dispatch, getState, api) => {
  return api
    .get(`/login`)
    .then((data) => {
      dispatch(actions.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(actions.setEmail(data.email));
    })
    .catch((err) => {
      throw err;
    });
};

export const login = (authData, goToPreviousPage) => (dispatch, getState, api) => {
  return api
    .post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((data) => {
      goToPreviousPage();
      dispatch(actions.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(actions.setEmail(data.email));
    })
    .catch((err) => {
      throw err;
    });
};

export const loadComments = (offerId) => (dispatch, getState, api) => {
  return api
    .get(`/comments/${offerId}`)
    .then((data) => {
      dispatch(actions.loadComments(data));
    })
    .catch((err) => {
      throw err;
    });
};

export const postComment = (commentData, offerId, enableForm, clearForm) => (dispatch, getState, api) => {
  return api
    .post(`/comments/${offerId}`, {
      comment: commentData.comment,
      rating: commentData.rating,
    })
    .then((data) => {
      enableForm();
      clearForm();
      dispatch(actions.loadComments(data));
    })
    .catch((err) => {
      enableForm();
      throw err;
    });
};
