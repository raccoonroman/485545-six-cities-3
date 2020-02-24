import {getRandomIntInclusive} from '../utils';


const getRandomImageUrl = () => {
  const id = getRandomIntInclusive(0, 100);
  return `https://i.picsum.photos/id/${id}/260/200.jpg`;
};

export default [
  {
    id: 0,
    offerInfo: {
      title: `Beautiful & luxurious apartment at great location`,
      price: 120,
      mark: `Premium`,
      category: `apartment`,
      rating: 4.2,
      imageUrl: getRandomImageUrl(),
      coords: [52.3909553943508, 4.85309666406198],
    }
  },
  {
    id: 1,
    offerInfo: {
      title: `Wood and stone place`,
      price: 80,
      category: `room`,
      rating: 4.8,
      imageUrl: getRandomImageUrl(),
      coords: [52.369553943508, 4.85309666406198],
    }
  },
  {
    id: 2,
    offerInfo: {
      title: `Canal View Prinsengracht`,
      price: 132,
      category: `house`,
      rating: 3.4,
      imageUrl: getRandomImageUrl(),
      coords: [52.3909553943508, 4.929309666406198],
    }
  },
  {
    id: 3,
    offerInfo: {
      title: `Nice, cozy, warm big bed apartment`,
      price: 180,
      mark: `Premium`,
      category: `hotel`,
      rating: 4.7,
      imageUrl: getRandomImageUrl(),
      coords: [52.3809553943508, 4.939309666406198],
    }
  },
];
