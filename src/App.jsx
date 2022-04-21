import React from "react";
import { Provider } from "react-redux";
import { ToastProvider } from "@/context/toastContext";
import { checkAuth } from "./utils/auth";
import store from "./redux/store";
import Routes from "./routes/Routes";

import AOS from "aos";
import "aos/dist/aos.css";

checkAuth(store);


AOS.init({
  offset: 200,
  duration: 600,
  delay: 100
});

const App = () => (
  <Provider store={store}>
    <ToastProvider autoClose={3000}>
      <Routes />
    </ToastProvider>
  </Provider>
);

export default App;


