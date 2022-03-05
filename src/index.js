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
} from "./pages";
import Footer from "./components/Footer";
import WritePost from "./components/WritePost";
import EditPost from "./components/EditPost";
import GoogleLogin from "./components/GoogleLogin";
import OAuth from "./pages/OAuth";
import NavbarC from "./containters/navbar/NavbarC";

// route
import PrivateRoute from "./utils/PrivateRoute"; //로그인한 사용자만 접근 가능
import AdminRoute from "./utils/AdminRoute"; // 관리자만 접근 가능
import { BrowserRouter, Routes, Route } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// style
import "./index.css";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <header>
          <NavbarC />
        </header>
        <Routes>
          {/* all user access */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:personId" element={<PersonalBoard />} />
          <Route path="/board/:boardId/:postId" element={<Post />} />
          <Route path="/google" element={<GoogleLogin />} />
          <Route path="/oauth/:provider" element={<OAuth />} />

          {/* only login user access */}
          <Route
            path="/write/:boardId"
            element={<PrivateRoute component={WritePost} />}
          />
          <Route
            path="/edit/:boardId/:postId"
            element={<PrivateRoute component={EditPost} />}
          />
          <Route path="/mypage" element={<PrivateRoute component={MyPage} />} />
          <Route
            path="/leave/:authType"
            element={<PrivateRoute component={Leave} />}
          />
          <Route
            path="/changepw"
            element={<PrivateRoute component={ChangePassword} />}
          />

          {/* only administrator access */}
          <Route path="/admin" element={<AdminRoute component={Admin} />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <Footer />
      </footer>
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
