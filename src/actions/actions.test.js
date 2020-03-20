import * as actions from './actions.js';
import {ActionType, AuthorizationStatus} from '../const.js';


describe(`Action creators work correctly`, () => {
  it(`Action creator for loading offers returns correct action`, () => {
    expect(actions.loadOffers([])).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: [],
    });
  });

  it(`Action creator for setting city returns correct action`, () => {
    expect(actions.setCity(`cityName`)).toEqual({
      type: ActionType.SET_CITY,
      payload: `cityName`,
    });
  });

  it(`Action creator for require authorization returns correct action`, () => {
    expect(actions.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(actions.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for setting email returns correct action`, () => {
    expect(actions.setEmail(`email`)).toEqual({
      type: ActionType.SET_EMAIL,
      payload: `email`,
    });
  });
});
