// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/slices/authSlice";

import noneProfileImg from "../images/none_profile_image.png"

function UserMenu() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const profileImg = useSelector(state => state.auth.authTokens.profileImage);
  const logoutBtn = () => {
    dispatch(logout());
  };
  return (
    <span>
      {isAuth ? (
        <span>
          <span className="element">
            <Link to="/mypage" className="linkBtn">
              {profileImg === null ? (
                <img src={noneProfileImg} width="30" height="30" />
              ) : (
                <img src={profileImg} width="30" height="30" />
              )}
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
