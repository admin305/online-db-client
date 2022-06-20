import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "store/store";

import { createGlobalStyle } from "styled-components";

import App from "./App";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Rubik', sans-serif;

  
    a {
      text-decoration: none;
    }
  }
`;

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById("root")
);
