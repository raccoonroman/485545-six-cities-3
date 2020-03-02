import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';


it(`Render <CitiesList />`, () => {
  const tree = renderer
    .create(
        <CitiesList
          currentCity={`Cologne`}
          onCityChange={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
