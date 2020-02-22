import React from "react";
import renderer from "react-test-renderer";
import OffersList from "./offers-list.jsx";


const offers = [
  {
    id: 10,
    offerInfo: {
      title: `Title 10`,
      price: 105,
      category: `house`,
      rating: 4,
      imageUrl: `https://i.picsum.photos/id/10/260/200.jpg`,
    }
  },
  {
    id: 11,
    offerInfo: {
      title: `Title 11`,
      price: 125,
      mark: `some mark`,
      category: `hotel`,
      rating: 3.6,
      imageUrl: `https://i.picsum.photos/id/11/260/200.jpg`,
    }
  },
  {
    id: 12,
    offerInfo: {
      title: `Title 12`,
      price: 160,
      category: `apartment`,
      rating: 4.6,
      imageUrl: `https://i.picsum.photos/id/12/260/200.jpg`,
    }
  },
];

const handleOfferTitleClick = () => {};

it(`Should offers list render correctly`, () => {
  const tree = renderer
    .create(<OffersList
      offers={offers}
      onOfferTitleClick={handleOfferTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
