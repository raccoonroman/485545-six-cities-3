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
      category: `Apartment`,
      rating: 4,
      imageUrl: getRandomImageUrl(),
    }
  },
  {
    id: 1,
    offerInfo: {
      title: `Wood and stone place`,
      price: 80,
      category: `Private room`,
      rating: 5,
      imageUrl: getRandomImageUrl(),
    }
  },
  {
    id: 2,
    offerInfo: {
      title: `Canal View Prinsengracht`,
      price: 132,
      category: `Apartment`,
      rating: 3,
      imageUrl: getRandomImageUrl(),
    }
  },
  {
    id: 3,
    offerInfo: {
      title: `Nice, cozy, warm big bed apartment`,
      price: 180,
      category: `Apartment`,
      rating: 5,
      imageUrl: getRandomImageUrl(),
    }
  },
];
