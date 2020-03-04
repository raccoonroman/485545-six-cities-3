import {reducer, ActionCreator, ActionType} from './reducer.js';


const offers = [
  {
    id: 0,
    offerInfo: {
      city: `Paris`,
      title: `Beautiful & luxurious apartment at great location`,
      price: 120,
      mark: `Premium`,
      category: `apartment`,
      rating: 4.2,
      imageUrl: `https://i.picsum.photos/id/32/260/200.jpg`,
      coords: [48.871613, 2.363295],
    }
  },
  {
    id: 1,
    offerInfo: {
      city: `Amsterdam`,
      title: `Wood and stone place`,
      price: 80,
      category: `room`,
      rating: 4.8,
      imageUrl: `https://i.picsum.photos/id/33/260/200.jpg`,
      coords: [52.369553943508, 4.85309666406198],
    }
  },
  {
    id: 2,
    offerInfo: {
      city: `Amsterdam`,
      title: `Canal View Prinsengracht`,
      price: 132,
      category: `house`,
      rating: 3.4,
      imageUrl: `https://i.picsum.photos/id/34/260/200.jpg`,
      coords: [52.3909553943508, 4.929309666406198],
    }
  },
  {
    id: 3,
    offerInfo: {
      city: `Amsterdam`,
      title: `Nice, cozy, warm big bed apartment`,
      price: 180,
      mark: `Premium`,
      category: `hotel`,
      rating: 4.7,
      imageUrl: `https://i.picsum.photos/id/35/260/200.jpg`,
      coords: [52.3809553943508, 4.939309666406198],
    }
  },
];


it(`Reducer should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentCity: `Paris`,
    offers,
  });
});

it(`Reducer should set current city by a given name`, () => {
  expect(reducer({
    currentCity: `Paris`,
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
