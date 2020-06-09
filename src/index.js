import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import "../node_modules/normalize.css";

import Calendar from "./components/calendar";
import theme from "./theme";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Calendar />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
