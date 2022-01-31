// react
import React from "react";
import ReactDOM from "react-dom";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// component
import App from "./App";
import { Main, Login, Register, Board } from "./pages";

// route
//import PrivateRoute from './utils/PrivateRoute'; //로그인한 사용자만 들어갈 수 있음
import { BrowserRouter, Routes, Route } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./reducers/store";

import NavBar from "./components/NavBar";
import "./index.css";
import WritePost from "./components/WritePost";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="board" element={<PrivateRoute component={Board} />} /> */}
          <Route path="/board/:id" element={<Board />} />
          <Route path="/write/:id" element={<WritePost />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/board/:boardId/:postId" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
