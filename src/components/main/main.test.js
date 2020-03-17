import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Main from './main.jsx';


const mockStore = configureStore([]);

const offers = [
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
      zoom: 14,
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
      zoom: 13,
    },
    city: {
      name: `Lviv`,
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
      zoom: 13,
    },
    city: {
      name: `Kyiv`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 13,
      },
    },
  },
];

const cities = [`Vinnytsya`, `Lviv`, `Kyiv`];


it(`Render <Main />`, () => {
  const store = mockStore({
    cities: {
      currentCity: cities[0],
      cities,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            offers={offers}
            onOfferTitleClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
