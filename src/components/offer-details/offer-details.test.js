import React from "react";
import renderer from "react-test-renderer";
import OfferDetails from "./offer-details.jsx";


const offer = {
  id: 100500,
  title: `Lorem ipsum`,
  previewImage: `https://i.picsum.photos/id/77/260/200.jpg`,
  price: 200,
  rating: 5.0,
  type: `apartment`,
  bedrooms: 11,
  maxAdults: 12,
  isFavorite: true,
  isPremium: true,
};


it(`Should offer details render correctly`, () => {
  const tree = renderer
    .create(<OfferDetails offer={offer} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
