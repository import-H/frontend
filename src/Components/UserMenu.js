// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/slices/authSlice";

// style
import styled from "styled-components";

const AuthorImg = styled.div`
  width: 30px;
  height: 30px;
  background: #ddd;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

import noneProfileImg from "../images/none_profile_image.png";

function UserMenu() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth?.isAuth);
  const profileImg = useSelector(state => state.auth.user?.profileImage);
  const logoutBtn = () => {
    dispatch(logout());
  };
  return (
    <span>
      {isAuth ? (
        <span role="afterLogin">
          <div className="element">
            <Link to="/mypage" data-testid="profileLink">
              <AuthorImg>
                {profileImg === "N" ? (
                  <img src={noneProfileImg} />
                ) : (
                  <img src={profileImg} alt="profileImg" />
                )}
              </AuthorImg>
            </Link>
          </div>
          <div className="element">
            {/* Link 태그를 사용해야 링크로 인식해서 마우스를 올리면 클릭 표시가 뜸 */}
            <Link to="" className="linkBtn" onClick={logoutBtn}>
              로그아웃
            </Link>
          </div>
          {/* 관리자 페이지 링크 조건부 렌더링 아직 미구현 */}
          <div className="element">
            <Link to="/admin" className="linkBtn">
              관리자 페이지
            </Link>
          </div>
        </span>
      ) : (
        <span role="beforeLogin">
          <div className="element">
            <Link to="/login" className="linkBtn">
              로그인
            </Link>
          </div>
          <div className="element">
            <Link to="/register" className="linkBtn">
              회원가입
            </Link>
          </div>
        </span>
      )}
    </span>
  );
}

export default UserMenu;
