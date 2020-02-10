import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const places = [
  `Zolochiv Castle`,
  `Sofiyivsky Park`,
  `Kiev Pechersk Lavra`
];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      amsterdamPlaces={places}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
