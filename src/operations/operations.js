import * as actions from '../../actions/actions.js';


export const loadOffers = () => (dispatch, getState, api) => {
  return api
    .get(`/hotels`)
    .then((response) => {
      dispatch(actions.loadOffers(response.data));
    });
};
