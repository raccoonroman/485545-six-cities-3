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
    .then(() => {
      dispatch(actions.requireAuthorization(AuthorizationStatus.AUTH));
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
    .then(() => {
      dispatch(actions.requireAuthorization(AuthorizationStatus.AUTH));
    });
};
