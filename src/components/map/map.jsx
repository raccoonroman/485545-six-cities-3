import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";


const Pin = {
  PATH: `img/pin.svg`,
  SIZES: [30, 30],
};

const TitleLayer = {
  PATH: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};


const buildMap = (container, offers, cityLocation) => {
  if (!container) {
    return null;
  }

  const {latitude, longitude, zoom} = cityLocation;

  const icon = leaflet.icon({
    iconUrl: Pin.PATH,
    iconSize: Pin.SIZES,
  });

  const map = leaflet.map(container, {
    center: [latitude, longitude],
    zoom,
    zoomControl: false,
    marker: true,
  });
  map.setView([latitude, longitude], zoom);

  leaflet
    .tileLayer(TitleLayer.PATH, {attribution: TitleLayer.ATTRIBUTION})
    .addTo(map);

  offers.forEach(({location}) => {
    const {latitude: x, longitude: y} = location;
    leaflet.marker([x, y], {icon}).addTo(map);
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
    const {offers, cityLocation} = this.props;
    const mapElement = this._mapRef.current;
    this._map = buildMap(mapElement, offers, cityLocation);
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
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired
  ).isRequired,
  cityLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
};
