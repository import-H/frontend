import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Main, Login, Register, Board } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="main" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);
