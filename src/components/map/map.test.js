import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Map from "./map.jsx";


configure({adapter: new Adapter()});

const offers = [
  {
    id: 10,
    offerInfo: {
      title: `Title 10`,
      price: 105,
      category: `house`,
      rating: 4,
      imageUrl: `https://i.picsum.photos/id/10/260/200.jpg`,
      coords: [52.3909553943508, 4.929309666406198],
    }
  },
  {
    id: 11,
    offerInfo: {
      title: `Title 11`,
      price: 125,
      mark: `some mark`,
      category: `hotel`,
      rating: 3.6,
      imageUrl: `https://i.picsum.photos/id/11/260/200.jpg`,
      coords: [52.3909553943508, 4.85309666406198],
    }
  },
  {
    id: 12,
    offerInfo: {
      title: `Title 12`,
      price: 160,
      category: `apartment`,
      rating: 4.6,
      imageUrl: `https://i.picsum.photos/id/12/260/200.jpg`,
      coords: [52.369553943508, 4.85309666406198],
    }
  },
];


it(`Should <Map /> render correctly`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);
  const tree = mount(<Map offers={offers} />, {attachTo: div});

  expect(tree.getDOMNode()).toMatchSnapshot();
});
