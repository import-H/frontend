// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/slices/authSlice";

function UserMenu() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const logoutBtn = () => {
    dispatch(logout());
  };
  return (
    <span>
      {isAuth ? (
        <span>
          <span className="element">
            <Link to="/mypage" className="linkBtn">
              마이페이지
            </Link>
          </span>
          <span className="element">
            <div className="linkBtn" onClick={logoutBtn}>
              로그아웃
            </div>
          </span>
        </span>
      ) : (
        <span>
          <span className="element">
            <Link to="/login" className="linkBtn">
              로그인
            </Link>
          </span>
          <span className="element">
            <Link to="/register" className="linkBtn">
              회원가입
            </Link>
          </span>
        </span>
      )}
    </span>
  );
}

export default UserMenu;
