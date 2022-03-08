// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// components
import Messages from "./Messages";
import UserMenuList from "./UserMenuList";

// images
import noneProfileImg from "../../images/none_profile_image.png";

// style
import styled from "styled-components";
import { Dropdown } from "antd";

const AuthorImg = styled.div`
  cursor: pointer;
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

const Caution = styled.div`
  cursor: pointer;
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
  @media (max-width: 768px) {
    display: none;
  }
`;

function UserMenu({
  auth,
  profile,
  messages,
  onLogout,
  onEmailAuth,
  onClickMessage,
}) {
  return (
    <>
      {auth && (
        <span>
          {auth.isAuth ? (
            <span role="afterLogin" className="flex">
              {!(profile?.emailVerified || profile?.oauthId) && (
                <Caution className="element" onClick={onEmailAuth}>
                  ⚠ 이메일 인증을 진행해주세요
                </Caution>
              )}
              <div>
                <Dropdown
                  overlay={
                    <Messages
                      messages={messages}
                      onClickMessage={onClickMessage}
                    />
                  }
                  placement="bottomCenter"
                >
                  <div>🔔</div>
                </Dropdown>
              </div>
              <div className="element hdProfileIcon">
                <Dropdown
                  overlay={
                    <UserMenuList
                      pathId={profile?.pathId}
                      roles={profile?.roles}
                      onLogout={onLogout}
                    />
                  }
                  placement="bottomCenter"
                >
                  <AuthorImg>
                    {profile?.profileImage ? (
                      <img src={profile?.profileImage} alt="profileImg" />
                    ) : (
                      <img src={noneProfileImg} alt="profileImg" />
                    )}
                  </AuthorImg>
                </Dropdown>
              </div>

              <div className="element">
                <Link to="/" className="linkBtn" onClick={onLogout}>
                  로그아웃
                </Link>
              </div>
              {auth.roles === "ROLE_ADMIN" && (
                <div className="element">
                  <Link to="/admin" className="linkBtn">
                    관리자 페이지
                  </Link>
                </div>
              )}
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
