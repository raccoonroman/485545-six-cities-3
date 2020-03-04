import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Map from "./map.jsx";
import {CITIES} from '../../const.js';


configure({adapter: new Adapter()});

const offers = [
  {
    id: 0,
    offerInfo: {
      city: `Amsterdam`,
      title: `Lorem ipsum dolor sit amet`,
      price: 62,
      mark: `Premium`,
      category: `apartment`,
      rating: 4.1,
      imageUrl: `https://i.picsum.photos/id/63/260/200.jpg`,
      coords: [48.871613, 2.363295],
    }
  },
  {
    id: 1,
    offerInfo: {
      city: `Amsterdam`,
      title: `consectetur adipiscing elit`,
      price: 85,
      category: `room`,
      rating: 4.6,
      imageUrl: `https://i.picsum.photos/id/64/260/200.jpg`,
      coords: [52.369553943508, 4.85309666406198],
    }
  },
  {
    id: 2,
    offerInfo: {
      city: `Amsterdam`,
      title: `sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
      price: 17,
      category: `house`,
      rating: 3.5,
      imageUrl: `https://i.picsum.photos/id/65/260/200.jpg`,
      coords: [52.3909553943508, 4.929309666406198],
    }
  },
  {
    id: 3,
    offerInfo: {
      city: `Amsterdam`,
      title: `Ut enim ad minim veniam`,
      price: 92,
      mark: `Premium offer`,
      category: `hotel`,
      rating: 4.1,
      imageUrl: `https://i.picsum.photos/id/66/260/200.jpg`,
      coords: [52.3809553943508, 4.939309666406198],
    }
  },
];


const AMSTERDAM = CITIES[3].name;


it(`Should <Map /> render correctly`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);
  const tree = mount(
      <Map offers={offers} city={AMSTERDAM} />,
      {attachTo: div}
  );

  expect(tree.getDOMNode()).toMatchSnapshot();
});
