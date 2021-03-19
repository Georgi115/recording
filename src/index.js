import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import rootReducers from "./redux/redusers/rootReducers";
import { Provider } from "react-redux";

const store = createStore(rootReducers);
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);
