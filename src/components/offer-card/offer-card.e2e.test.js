import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card.jsx";

configure({adapter: new Adapter()});

const offer = {
  id: 100500,
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


it(`Click on offer card title`, () => {
  const handleCardHover = jest.fn();
  const handleCardTitleClick = jest.fn();

  const card = shallow(<OfferCard
    offer={offer}
    onCardHover={handleCardHover}
    onOfferTitleClick={handleCardTitleClick}
  />);

  const cardOneTitle = card.find(`.place-card__name a`).at(0);

  cardOneTitle.simulate(`click`);

  expect(handleCardTitleClick).toHaveBeenCalledTimes(1);

  expect(handleCardTitleClick.mock.calls[0][0]).toBe(100500);
});

it(`Hover on offer card`, () => {
  const handleCardHover = jest.fn();
  const handleCardTitleClick = jest.fn();

  const card = shallow(<OfferCard
    offer={offer}
    onCardHover={handleCardHover}
    onOfferTitleClick={handleCardTitleClick}
  />);

  const cardOne = card.find(`.place-card`).at(0);

  cardOne.simulate(`hover`);

  expect(handleCardHover).toHaveBeenCalledTimes(2);

  expect(handleCardHover.mock.calls[0][0]).toBe(100500);
});
