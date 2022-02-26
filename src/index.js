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
import GoogleLogin from "./Components/GoogleLogin";
import OAuth from "./Pages/OAuth";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Routes>
          {/* all user access */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/posts" element={<UserList />} />
          <Route path="/posts/:personId" element={<PersonalBoard />} />
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
          <Route path="/leave" element={<PrivateRoute component={Leave} />} />
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
