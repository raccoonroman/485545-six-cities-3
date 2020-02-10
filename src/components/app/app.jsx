import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";


const placeTitleHandler = () => {};

const App = ({amsterdamPlaces}) => {
  return (
    <Main
      amsterdamPlaces={amsterdamPlaces}
      onPlaceTitleClick={placeTitleHandler}
    />
  );
};

App.propTypes = {
  amsterdamPlaces: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default App;
