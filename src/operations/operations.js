import * as actions from '../actions/actions.js';
import {AuthorizationStatus} from '../const.js';


export const loadOffers = () => (dispatch, getState, api) => {
  return api
    .get(`/hotels`)
    .then((response) => {
      dispatch(actions.loadOffers(response.data));
    });
};

export const checkAuth = () => (dispatch, getState, api) => {
  return api
    .get(`/login`)
    .then((response) => {
      dispatch(actions.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(actions.setEmail(response.data.email));
    })
    .catch((err) => {
      throw err;
    });
};

export const login = (authData) => (dispatch, getState, api) => {
  return api
    .post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      dispatch(actions.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(actions.setEmail(response.data.email));
    });
};

export const loadComments = (offerId) => (dispatch, getState, api) => {
  return api
    .get(`/comments/${offerId}`)
    .then((response) => {
      dispatch(actions.loadComments(response.data));
    });
};

export const postComment = (commentData, offerId) => (dispatch, getState, api) => {
  return api
    .post(`/comments/${offerId}`)
    .then((response) => {
      dispatch(actions.loadComments(response.data));
    });
};
