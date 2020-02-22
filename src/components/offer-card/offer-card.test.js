import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card.jsx";


const offer = {
  id: 100500,
  offerInfo: {
    title: `Hole`,
    price: 12,
    mark: `Premium quality`,
    category: `house`,
    rating: 2.9,
    imageUrl: `https://i.picsum.photos/id/199/260/200.jpg`,
  }
};

const handleCardHover = () => {};
const handleOfferTitleClick = () => {};

it(`Should offer card render correctly`, () => {
  const tree = renderer
    .create(<OfferCard
      offer={offer}
      onCardHover={handleCardHover}
      onOfferTitleClick={handleOfferTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
