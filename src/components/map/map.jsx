import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {CITIES} from "../../const.js";


const ZOOM_LEVEL = 12;

const Pin = {
  PATH: `img/pin.svg`,
  SIZES: [30, 30],
};

const TitleLayer = {
  PATH: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};

const getCityCoords = (cityName) => {
  const city = CITIES.find(({name}) => name === cityName);
  return city.coords;
};


const buildMap = (container, offers, city) => {
  if (!container) {
    return null;
  }

  const cityCoords = getCityCoords(city);

  const icon = leaflet.icon({
    iconUrl: Pin.PATH,
    iconSize: Pin.SIZES,
  });

  const map = leaflet.map(container, {
    center: cityCoords,
    zoom: ZOOM_LEVEL,
    zoomControl: false,
    marker: true,
  });
  map.setView(cityCoords, ZOOM_LEVEL);

  leaflet
    .tileLayer(TitleLayer.PATH, {attribution: TitleLayer.ATTRIBUTION})
    .addTo(map);

  offers.forEach(({offerInfo: {coords}}) => {
    leaflet.marker(coords, {icon}).addTo(map);
  });

  return map;
};


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this._mapRef = React.createRef();
    this._map = null;
  }

  componentDidMount() {
    this._buildMap();
  }

  componentDidUpdate() {
    this._removeMap();
    this._buildMap();
  }

  componentWillUnmount() {
    this._removeMap();
  }

  _buildMap() {
    const {offers, city} = this.props;
    const mapElement = this._mapRef.current;
    this._map = buildMap(mapElement, offers, city);
  }

  _removeMap() {
    if (this._map) {
      this._map.remove();
      this._map = null;
    }
  }

  render() {
    return (
      <section className="cities__map map">
        <div ref={this._mapRef} id="map"></div>
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    offerInfo: PropTypes.shape({
      coords: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
  })).isRequired,
  city: PropTypes.string.isRequired,
};
