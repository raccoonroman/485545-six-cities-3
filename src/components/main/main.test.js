import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";


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

const handleOfferTitleClick = () => {};

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      offers={offers}
      onOfferTitleClick={handleOfferTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
