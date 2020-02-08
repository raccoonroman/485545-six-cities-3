import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";


const NumberOfPlaces = {
  AMSTERDAM: 312,
};

ReactDOM.render(
    <App
      numberOfPlaces={NumberOfPlaces.AMSTERDAM}
    />,
    document.querySelector(`#root`)
);
