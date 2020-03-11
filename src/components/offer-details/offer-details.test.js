import React from "react";
import renderer from "react-test-renderer";
import OfferDetails from "./offer-details.jsx";


const offer = {
  id: 100490,
  title: `The best title ever`,
  previewImage: `https://i.picsum.photos/id/22/400/200.jpg`,
  price: 333,
  rating: 3.3,
  type: `apartment`,
  bedrooms: 12,
  maxAdults: 12,
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 52.35,
    longitude: 4.67,
  },
  city: {
    name: `Vinnytsya`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
};

const neighbourhoodOffers = [
  {
    id: 100500,
    title: `Lorem ipsum`,
    previewImage: `https://i.picsum.photos/id/22/260/200.jpg`,
    price: 100,
    rating: 4.3,
    type: `apartment`,
    bedrooms: 10,
    maxAdults: 10,
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
    },
    city: {
      name: `Vinnytsya`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
    },
  },
  {
    id: 100501,
    title: `Ut enim ad minim veniam`,
    previewImage: `https://i.picsum.photos/id/23/260/200.jpg`,
    price: 9,
    rating: 4.0,
    type: `room`,
    bedrooms: 4,
    maxAdults: 5,
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.341667,
      longitude: 4.902452,
    },
    city: {
      name: `Vinnytsya`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 11,
      },
    },
  },
  {
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
      name: `Vinnytsya`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 13,
      },
    },
  },
];


it(`Should offer details render correctly`, () => {
  const tree = renderer
    .create(<OfferDetails
      offer={offer}
      neighbourhoodOffers={neighbourhoodOffers}
      onOfferTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
