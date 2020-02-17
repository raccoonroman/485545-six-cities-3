import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

configure({adapter: new Adapter()});

const offers = [
  {
    id: 10,
    offerInfo: {
      title: `Title 10`,
      price: 105,
      category: `Hostel`,
      rating: 4,
      imageUrl: `https://i.picsum.photos/id/10/260/200.jpg`,
    }
  },
  {
    id: 11,
    offerInfo: {
      title: `Title 11`,
      price: 125,
      category: `Private room`,
      rating: 3,
      imageUrl: `https://i.picsum.photos/id/11/260/200.jpg`,
    }
  },
  {
    id: 12,
    offerInfo: {
      title: `Title 12`,
      price: 160,
      category: `Apartment`,
      rating: 5,
      imageUrl: `https://i.picsum.photos/id/12/260/200.jpg`,
    }
  },
];

it(`Should place titles be pressed`, () => {
  const handleOfferTitleClick = jest.fn();

  const main = mount(
      <Main
        offers={offers}
        onOfferTitleClick={handleOfferTitleClick}
      />
  );

  const offerTitles = main.find(`.place-card__name a`);

  offerTitles.forEach((title) => title.props().onClick());

  expect(handleOfferTitleClick.mock.calls.length).toBe(3);
});
