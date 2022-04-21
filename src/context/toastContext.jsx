import React from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.min.css";

const ToastContext = React.createContext();

function ToastProvider(props) {
  return (
    <ToastContext.Provider value {...props}>
      <ToastContainer
        autoClose={5000}
        position="top-right"
      />
      {props.children}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  // children: PropTypes.string
};

const useToast = () => React.useContext(ToastContext);

export { ToastProvider, useToast };
