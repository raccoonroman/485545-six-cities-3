import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card.jsx";

configure({adapter: new Adapter()});

const offer = {
  id: 100500,
  offerInfo: {
    title: `Hole`,
    price: 12,
    category: `Slum`,
    rating: 2,
    imageUrl: `https://i.picsum.photos/id/199/260/200.jpg`,
  }
};


it(`Click on offer card title`, () => {
  const handleCardHover = jest.fn();
  const handleCardTitleClick = jest.fn();

  const card = shallow(<OfferCard
    offerId={offer.id}
    offerInfo={offer.offerInfo}
    onCardHover={handleCardHover}
    onOfferTitleClick={handleCardTitleClick}
  />);

  const cardOneTitle = card.find(`.place-card__name a`).at(0);

  cardOneTitle.simulate(`click`);

  expect(handleCardTitleClick).toHaveBeenCalledTimes(1);
});

it(`Hover on offer card`, () => {
  const handleCardHover = jest.fn();
  const handleCardTitleClick = jest.fn();

  const card = shallow(<OfferCard
    offerId={offer.id}
    offerInfo={offer.offerInfo}
    onCardHover={handleCardHover}
    onOfferTitleClick={handleCardTitleClick}
  />);

  const cardOne = card.find(`.place-card`).at(0);

  cardOne.simulate(`hover`);

  expect(handleCardHover).toHaveBeenCalledTimes(1);

  expect(handleCardHover.mock.calls[0][0]).toBe(100500);
});
