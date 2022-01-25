// react
import React from "react";
import ReactDOM from "react-dom";

// component
import App from "./App";
import { Main, Login, Register, Board } from "./Pages";
import Header from "./Components/Header";
import NavBar from "./Pages/Sections/NavBar";

// route
import PrivateRoute from "./utils/PrivateRoute"; //로그인한 사용자만 들어갈 수 있음
import { BrowserRouter, Routes, Route } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./reducers/store";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
          <Route path="board" element={<PrivateRoute component={Board} />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
