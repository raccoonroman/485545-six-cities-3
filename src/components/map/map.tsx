import * as React from 'react';
import PropTypes from 'prop-types';
import withLeaflet from '../../hocs/with-leaflet/with-leaflet';


const Map = ({className, children}) => {
  return <section className={className}>{children}</section>;
};

Map.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default withLeaflet(Map);
