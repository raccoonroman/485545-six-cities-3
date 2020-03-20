import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../const.js';
import SignIn from './sign-in.jsx';


const mockStore = configureStore([]);

it(`Render <SignIn />`, () => {
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
        <SignIn
          onSubmit={() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
