import React,  { Suspense }  from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import { ToastProvider } from "@/context/toastContext";
import { checkAuth } from "./utils/auth";
import store from "./redux/store";
import Routes from "./Routes/Routes";

import AOS from "aos";
import "aos/dist/aos.css";

checkAuth(store);


AOS.init({
  offset: 200,
  duration: 600,
  delay: 100
});

const App = () => (
  // <ErrorBoundary>
  //   <Suspense fallback={<p>Spinner Here</p>}>

  <Provider store={store}>
    <ToastProvider autoClose={3000}>
      <Routes />
    </ToastProvider>
  </Provider>

  //   </Suspense>
  // </ErrorBoundary>
);

export default App;


