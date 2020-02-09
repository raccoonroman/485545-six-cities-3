import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";


const App = ({amsterdamPlaces}) => {
  return (
    <Main amsterdamPlaces={amsterdamPlaces} />
  );
};

App.propTypes = {
  amsterdamPlaces: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default App;
