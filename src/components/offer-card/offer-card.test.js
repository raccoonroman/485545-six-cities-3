import React from "react";
import renderer from "react-test-renderer";
import OfferCard from "./offer-card.jsx";


const offer = {
  id: 100502,
  title: `Excepteur sint occaecat cupidatat non proident`,
  previewImage: `https://i.picsum.photos/id/24/260/200.jpg`,
  price: 13,
  rating: 4.9,
  type: `house`,
  bedrooms: 3,
  maxAdults: 3,
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.359160,
    longitude: 4.849366,
  },
  city: {
    name: `Vinnytsia`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 13,
    },
  },
};


it(`Should offer card render correctly`, () => {
  const tree = renderer
    .create(<OfferCard
      offer={offer}
      onCardHover={() => {}}
      onOfferTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
