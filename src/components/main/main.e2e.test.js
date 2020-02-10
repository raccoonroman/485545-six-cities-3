import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";


const places = [
  `Starik Hem`,
  `Bernardazzi`,
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should place titles be pressed`, () => {
  const onPlaceTitleClick = jest.fn();

  const main = shallow(
      <Main
        amsterdamPlaces={places}
        onPlaceTitleClick={onPlaceTitleClick}
      />
  );

  const placeTitles = main.find(`.place-card__name a`);

  placeTitles.forEach((title) => title.props().onClick());

  expect(onPlaceTitleClick.mock.calls.length).toBe(2);
});
