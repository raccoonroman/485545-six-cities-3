import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../const.js';
import Header from './header.jsx';


const mockStore = configureStore([]);

describe(`Render <CitiesList />`, () => {
  it(`When user is not authorized`, () => {
    const store = mockStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      userData: {
        email: ``,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Header />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`When user is authorized`, () => {
    const store = mockStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      userData: {
        email: `name@gmail.com`,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Header />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
