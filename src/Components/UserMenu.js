// react
import React, { useEffect } from "react";

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

const Caution = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  text-decoration: underline;
  &:hover {
    color: red;
    text-decoration: underline;
  }
  @media (max-width: 768px){
    display: none;
  }
`;

import noneProfileImg from "../images/none_profile_image.png";
import { getProfile } from "../reducers/slices/userSlice";

function UserMenu() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = useSelector(state => state.user.profile);
  const logoutBtn = () => {
    dispatch(logout());
  };
  useEffect(() => {
    dispatch(getProfile(auth.userId));
    // if (userId !== "") {
    //   dispatch(getProfile(userId));
    // }
  }, []);
  return (
    <>
      {auth && (
        <span>
          {auth.isAuth ? (
            <span role="afterLogin">
              {!profile?.emailVerified && (
                <Caution className="element" to="/">
                  ⚠ 이메일 인증을 진행해주세요
                </Caution>
              )}
              <div className="element hdProfileIcon">
                <Link to="/mypage" data-testid="profileLink">
                  <AuthorImg>
                    {profile?.profileImage ? (
                      <img src={profile?.profileImage} alt="profileImg" />
                    ) : (
                      <img src={noneProfileImg} />
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
      )}
    </>
  );
}

export default UserMenu;
