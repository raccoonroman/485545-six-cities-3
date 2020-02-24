import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";


const AMSTERDAM_CITY_COORDS = [52.38333, 4.9];
const ZOOM_LEVEL = 12;

const Pin = {
  PATH: `img/pin.svg`,
  SIZES: [30, 30],
};

const TitleLayer = {
  PATH: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
  ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
};


const buildMap = (container, offers) => {
  if (container) {
    const icon = leaflet.icon({
      iconUrl: Pin.PATH,
      iconSize: Pin.SIZES,
    });

    const map = leaflet.map(container, {
      center: AMSTERDAM_CITY_COORDS,
      zoom: ZOOM_LEVEL,
      zoomControl: false,
      marker: true,
    });
    map.setView(AMSTERDAM_CITY_COORDS, ZOOM_LEVEL);

    leaflet
      .tileLayer(TitleLayer.PATH, {attribution: TitleLayer.ATTRIBUTION})
      .addTo(map);

    offers.forEach(({offerInfo: {coords}}) => {
      leaflet.marker(coords, {icon}).addTo(map);
    });
  }
};


export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._mapRef = React.createRef();
  }

  componentDidMount() {
    const {offers} = this.props;
    const mapElement = this._mapRef.current;
    buildMap(mapElement, offers);
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
};
