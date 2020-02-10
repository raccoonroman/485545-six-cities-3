import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";


const places = [
  `Zolochiv Castle`,
  `Sofiyivsky Park`,
  `Kiev Pechersk Lavra`
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      amsterdamPlaces={places}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
