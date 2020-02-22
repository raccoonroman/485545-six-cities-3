import React from "react";
import renderer from "react-test-renderer";
import OfferDetails from "./offer-details.jsx";


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


it(`Should offer details render correctly`, () => {
  const tree = renderer
    .create(<OfferDetails offer={offer} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
