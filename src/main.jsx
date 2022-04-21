import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "./assets/fonts/Kronika.ttf";
import "./assets/fonts/NunitoSans-Regular.ttf";
import "./assets/fonts/KGCorneroftheSky.ttf";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
