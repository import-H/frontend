// react
import React from "react";
import ReactDOM from "react-dom";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// component
import App from "./App";
import {
  Login,
  Register,
  Board,
  Post,
  PersonalBoard,
  MyPage,
  Admin,
  Leave,
  UserList,
  ChangePassword,
} from "./Pages";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import WritePost from "./Components/WritePost";
import EditPost from "./Components/EditPost";

// route
import PrivateRoute from "./utils/PrivateRoute"; //로그인한 사용자만 접근 가능
import AdminRoute from "./utils/AdminRoute"; // 관리자만 접근 가능
import { BrowserRouter, Routes, Route } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./reducers/store";

// style
import "./index.css";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="board" element={<PrivateRoute component={Board} />} /> */}
          <Route path="/board/:id" element={<Board />} />
          <Route
            path="/write/:boardId"
            element={<PrivateRoute component={WritePost} />}
          />
          <Route
            path="/edit/:boardId/:postId"
            element={<PrivateRoute component={EditPost} />}
          />
          <Route path="/posts" element={<UserList />} />
          <Route path="/posts/:personId" element={<PersonalBoard />} />
          <Route path="/board/:boardId/:postId" element={<Post />} />
          <Route path="/mypage" element={<PrivateRoute component={MyPage} />} />
          <Route path="/admin" element={<AdminRoute component={Admin} />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/changepw" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <Footer />
      </footer>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
