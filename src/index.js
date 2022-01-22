import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Main, Login, Register } from "./Pages";
import PrivateRoute from "./utils/PrivateRoute"; //로그인한 사용자만 들어갈 수 있음
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import Header from "./Components/Header";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="main" element={<PrivateRoute component={Main} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  rootElement
);
