import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); 

import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "./assets/fonts/Kronika.ttf";
import "./assets/fonts/NunitoSans-Regular.ttf";
import "./assets/fonts/KGCorneroftheSky.ttf";
import "./assets/fonts/Jost-regular.ttf";

import "./index.css";

import App from "./App";

root.render(<App />);
