import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

const mocks = {
  cities: [`Kyiv`, `Kharkiv`, `Odessa`, `Vinnytsia`, `Lviv`],
  currentCity: `Vinnytsia`,
};

it(`Render <CitiesList />`, () => {
  const {cities, currentCity} = mocks;
  const tree = renderer
    .create(
        <CitiesList
          cities={cities}
          currentCity={currentCity}
          onCityChange={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
