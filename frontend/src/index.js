import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "./index.css";
import App from "app";

import { store } from "./Redux/store";
import { Provider } from "react-redux";

// ** Toast & ThemeColors Context
import { ToastContainer } from "react-toastify";
// ** React Toastify
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer newestOnTop />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
