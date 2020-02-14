import {getRandomIntInclusive} from '../utils';


const getRandomImageUrl = () => {
  const id = getRandomIntInclusive(0, 1000);
  return `https://i.picsum.photos/id/${id}/260/200.jpg`;
};

export default [
  {
    name: `Beautiful & luxurious apartment at great location`,
    price: 120,
    category: `Apartment`,
    rating: 4,
    image: getRandomImageUrl(),
  },
  {
    name: `Wood and stone place`,
    price: 80,
    category: `Private room`,
    rating: 5,
    image: getRandomImageUrl(),
  },
  {
    name: `Canal View Prinsengracht`,
    price: 132,
    category: `Apartment`,
    rating: 3,
    image: getRandomImageUrl(),
  },
  {
    name: `Nice, cozy, warm big bed apartment`,
    price: 180,
    category: `Apartment`,
    rating: 5,
    image: getRandomImageUrl(),
  },
];
