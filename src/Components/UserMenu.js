import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/slices/authSlice";

function UserMenu() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const logoutBtn = () => {
    dispatch(logout());
  };
  return (
    <span>
      {isAuth ? (
        <span>
          <span className="element">
            <div style={{ padding: "1rem" }} onClick={logoutBtn}>
              로그아웃
            </div>
          </span>
        </span>
      ) : (
        <span>
          <span className="element">
            <Link to="/login" style={{ padding: "1rem" }}>
              로그인
            </Link>
          </span>
          <span className="element">
            <Link to="/register" style={{ padding: "1rem" }}>
              회원가입
            </Link>
          </span>
        </span>
      )}
    </span>
  );
}

export default UserMenu;
