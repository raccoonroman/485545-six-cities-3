import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card.jsx";


const offer = {
  id: 100500,
  offerInfo: {
    title: `Hole`,
    price: 12,
    category: `Slum`,
    rating: 2,
    imageUrl: `https://i.picsum.photos/id/199/260/200.jpg`,
  }
};

it(`Should offer card render correctly`, () => {
  const tree = renderer
    .create(<OfferCard
      offerId={offer.id}
      offerInfo={offer.offerInfo}
      onCardHover={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
