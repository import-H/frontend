import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/slices/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const logoutBtn = () => {
    dispatch(logout());
    console.log(authData);
  };
  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid black" }}>
      <Link to="/main" style={{ padding: "1rem" }}>
        메인
      </Link>
      <Link to="/register" style={{ padding: "1rem" }}>
        회원가입
      </Link>
      <Link to="/login" style={{ padding: "1rem" }}>
        로그인
      </Link>
      <button onClick={logoutBtn}>로그아웃</button>
    </div>
  );
};

export default Header;
