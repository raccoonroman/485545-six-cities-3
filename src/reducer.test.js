import {reducer, ActionCreator, ActionType} from './reducer.js';


const offers = [
  {
    id: 0,
    title: `Beautiful & luxurious studio at great location`,
    previewImage: `https://i.picsum.photos/id/30/260/200.jpg`,
    price: 80,
    rating: 4.8,
    type: `apartment`,
    bedrooms: 3,
    maxAdults: 4,
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
    },
  },
  {
    id: 1,
    title: `Wood and stone place`,
    previewImage: `https://i.picsum.photos/id/31/260/200.jpg`,
    price: 104,
    rating: 4.3,
    type: `room`,
    bedrooms: 1,
    maxAdults: 2,
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.341667,
      longitude: 4.902452,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
    },
  },
  {
    id: 2,
    title: `Canal View Prinsengracht`,
    previewImage: `https://i.picsum.photos/id/32/260/200.jpg`,
    price: 99,
    rating: 3.9,
    type: `house`,
    bedrooms: 2,
    maxAdults: 2,
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.359160,
      longitude: 4.849366,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
    },
  },
  {
    id: 3,
    title: `Nice, cozy, warm big bed apartment`,
    previewImage: `https://i.picsum.photos/id/33/260/200.jpg`,
    price: 177,
    rating: 4.5,
    type: `hotel`,
    bedrooms: 1,
    maxAdults: 1,
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.360120,
      longitude: 4.912557,
    },
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
    },
  },
  {
    id: 4,
    title: `Prosperous place`,
    previewImage: `https://i.picsum.photos/id/34/260/200.jpg`,
    price: 222,
    rating: 4.1,
    type: `apartment`,
    bedrooms: 4,
    maxAdults: 8,
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 50.860828,
      longitude: 4.323657,
    },
    city: {
      name: `Brussels`,
      location: {
        latitude: 50.850402,
        longitude: 4.351012,
        zoom: 13,
      },
    },
  },
  {
    id: 5,
    title: `There is room for improvement`,
    previewImage: `https://i.picsum.photos/id/35/260/200.jpg`,
    price: 96,
    rating: 4.3,
    type: `room`,
    bedrooms: 1,
    maxAdults: 2,
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 48.875550,
      longitude: 2.353581,
    },
    city: {
      name: `Paris`,
      location: {
        latitude: 48.857708,
        longitude: 2.352208,
        zoom: 12,
      },
    },
  },
];


it(`Reducer should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentCity: `Amsterdam`,
    offers,
  });
});

it(`Reducer should set current city by a given name`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    offers,
  }, {
    type: ActionType.SET_CITY,
    payload: {
      cityName: `Brussels`,
    },
  })).toEqual({
    currentCity: `Brussels`,
    offers,
  });
});


describe(`Action creators work correctly`, () => {
  it(`Action creator for setting city returns correct action`, () => {
    expect(ActionCreator.setCity(`Dusseldorf`)).toEqual({
      type: ActionType.SET_CITY,
      payload: {
        cityName: `Dusseldorf`,
      },
    });
  });
});
