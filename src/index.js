import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./Nav.css"
import App from "./App";
import { Main, Login, Register, Sample } from "./Pages";
import PrivateRoute from "./utils/PrivateRoute"; //로그인한 사용자만 들어갈 수 있음
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import NavBar from "./Pages/Sections/NavBar";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="main" element={<PrivateRoute component={Main} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="sample" element={<Sample />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);
