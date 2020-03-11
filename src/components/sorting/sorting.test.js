import React from 'react';
import renderer from 'react-test-renderer';
import {SortType} from '../../const.js';
import Sorting from './sorting.jsx';


it(`Should <Sorting /> render correctly`, () => {
  const tree = renderer
    .create(<Sorting
      sortBy={SortType.POPULAR}
      onSortTypeChange={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
