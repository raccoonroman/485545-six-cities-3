import React from "react";
import Main from "../main/main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {numberOfPlaces} = props;

  return (
    <Main numberOfPlaces={numberOfPlaces} />
  );
};


export default App;
