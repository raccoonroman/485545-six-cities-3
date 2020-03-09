import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";


const Pin = {
  PATH: {
    BLUE: `img/pin.svg`,
    ORANGE: `img/pin-active.svg`,
  },
  SIZES: [30, 30],
};

const TitleLayer = {
  PATH: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};


const renderMap = (container, cityLocation) => {
  if (!container) {
    return null;
  }

  const {latitude, longitude, zoom} = cityLocation;

  const map = leaflet.map(container, {
    center: [latitude, longitude],
    zoom,
    zoomControl: false,
    scrollWheelZoom: false,
    marker: true,
  });

  leaflet
    .tileLayer(TitleLayer.PATH, {attribution: TitleLayer.ATTRIBUTION})
    .addTo(map);

  leaflet.control
    .zoom({position: `topright`})
    .addTo(map);

  return map;
};


const renderMarkers = (offers, currentOfferId, map) => {
  if (!map) {
    return null;
  }
  const markers = leaflet.layerGroup().addTo(map);

  const createIcon = (pinType) => {
    return leaflet.icon({
      iconUrl: pinType,
      iconSize: Pin.SIZES,
    });
  };

  offers.forEach(({id, location}) => {
    const {latitude: x, longitude: y} = location;
    const pinType = id === currentOfferId ? Pin.PATH.ORANGE : Pin.PATH.BLUE;
    const icon = createIcon(pinType);
    leaflet.marker([x, y], {icon}).addTo(markers);
  });

  return markers;
};


export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._mapRef = React.createRef();
    this._map = null;
    this._markers = null;
  }

  componentDidMount() {
    this._renderMap();
    this._renderMarkers();
  }

  componentDidUpdate() {
    const {latitude, longitude, zoom} = this.props.cityLocation;
    this._map.setView([latitude, longitude], zoom);
    this._renderMarkers();
  }

  componentWillUnmount() {
    this._removeMap();
    this._removeMarkers();
  }

  _renderMap() {
    const {cityLocation} = this.props;
    const mapElement = this._mapRef.current;
    this._map = renderMap(mapElement, cityLocation);
  }

  _renderMarkers() {
    const {offers, currentOfferId} = this.props;
    if (this._markers) {
      this._removeMarkers();
    }
    this._markers = renderMarkers(offers, currentOfferId, this._map);
  }

  _removeMap() {
    if (this._map) {
      this._map.remove();
      this._map = null;
    }
  }

  _removeMarkers() {
    if (this._markers) {
      this._markers.clearLayers();
      this._markers = null;
    }
  }

  render() {
    const {className} = this.props;

    return (
      <section className={className}>
        <div ref={this._mapRef} id="map"></div>
      </section>
    );
  }
}

Map.propTypes = {
  className: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired
  ).isRequired,
  currentOfferId: PropTypes.number,
  cityLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
};
