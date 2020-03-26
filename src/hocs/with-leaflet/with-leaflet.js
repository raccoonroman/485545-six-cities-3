import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';


const Pin = {
  PATH: {
    BLUE: `/img/pin.svg`,
    ORANGE: `/img/pin-active.svg`,
  },
  SIZES: [30, 30],
};

const TitleLayer = {
  PATH: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};


const renderMap = (container, location) => {
  if (!container) {
    return null;
  }

  const {latitude, longitude, zoom} = location;

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

  offers.forEach(({id, title, location}) => {
    const {latitude: x, longitude: y} = location;
    const pinType = id === currentOfferId ? Pin.PATH.ORANGE : Pin.PATH.BLUE;
    const icon = createIcon(pinType);
    leaflet
      .marker([x, y], {icon})
      .addTo(markers)
      .bindPopup(title);
  });

  return markers;
};


const withLeaflet = (Component) => {
  class WithLeaflet extends React.PureComponent {
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

    componentDidUpdate({offers: prevOffers}) {
      const {offers, currentOfferId} = this.props;
      const {location: cityLocation} = offers[0].city;
      const {zoom} = cityLocation;

      if (prevOffers[0].city.name !== offers[0].city.name) {
        const {latitude, longitude} = cityLocation;
        this._map.setView([latitude, longitude], zoom);
      }

      if (currentOfferId) {
        const offer = offers.find(({id}) => id === currentOfferId);
        const {latitude, longitude} = offer.location;
        this._map.setView([latitude, longitude], zoom);
      }

      this._renderMarkers();
    }

    componentWillUnmount() {
      this._removeMap();
      this._removeMarkers();
    }

    _renderMap() {
      const {offers} = this.props;
      const {location} = offers[0].city;
      const mapElement = this._mapRef.current;
      this._map = renderMap(mapElement, location);
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
        <Component className={className}>
          <div ref={this._mapRef} id="map"></div>
        </Component>
      );
    }
  }

  WithLeaflet.propTypes = {
    className: PropTypes.string.isRequired,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          location: PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
            zoom: PropTypes.number.isRequired,
          }).isRequired,
          city: PropTypes.shape({
            name: PropTypes.string.isRequired,
            location: PropTypes.shape({
              latitude: PropTypes.number.isRequired,
              longitude: PropTypes.number.isRequired,
              zoom: PropTypes.number.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired
    ).isRequired,
    currentOfferId: PropTypes.number,
  };


  return WithLeaflet;
};


export default withLeaflet;
